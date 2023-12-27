import { ForgedWeapon } from '../types/covil/forged-weapon';
import { Weapon } from '../types/olddragon2/weapon';

export class ForgeAdapter {
  transformToOldDragon2Weapon(forgedWeapon: ForgedWeapon): Weapon {
    return {
      name: `${forgedWeapon.qeNome} - ${Object.keys(forgedWeapon.sufixo).join(', ')}`,
      img: forgedWeapon.qeImg,
      type: 'weapon',
      system: {
        description: this._parseDescription(forgedWeapon.propriedades, forgedWeapon.sufixo),
        cost: forgedWeapon.custo,
        damage_type: forgedWeapon.fkDano,
        weight_in_load: Number(forgedWeapon.qePeso),
        weight_in_grams: Number(forgedWeapon.qePeso) * 1000,
        magic_item: this._isMagicItem(forgedWeapon.bnBa, forgedWeapon.bnCa, forgedWeapon.bnDano),
        bonus_ca: forgedWeapon.bnCa,
        damage: forgedWeapon.qeDano,
        bonus_damage: forgedWeapon.bnDano,
        bonus_ba: forgedWeapon.bnBa,
        shoot_range: Number(forgedWeapon.qeAlcDips),
        throw_range: Number(forgedWeapon.qeAlcArr),
        quantity: forgedWeapon.qtde,
        bolt: forgedWeapon.bolt,
        bolt_small: forgedWeapon.bolt_small,
        arrow: forgedWeapon.arrow,
        polearm: forgedWeapon.polearm,
        two_handed: forgedWeapon.two_handed,
        versatile: forgedWeapon.versatile,
        type: this._parseWeaponType(forgedWeapon),
      },
    };
  }

  _isMagicItem(ba: number = 0, ca: number = 0, damage: number = 0) {
    return Boolean(ba > 0 || ca > 0 || damage > 0);
  }

  _parseWeaponType(forgedWeapon: ForgedWeapon): 'melee' | 'ranged' | 'ammunition' | 'throwing' {
    if (forgedWeapon.arrow || forgedWeapon.bolt || forgedWeapon.bolt_small) {
      return 'ammunition';
    }

    if (Number(forgedWeapon.qeAlcDips) > 0) {
      return 'ranged';
    }

    if (Number(forgedWeapon.qeAlcArr) > 0) {
      return 'throwing';
    }

    return 'melee';
  }

  _parseDescription(properties: string, suffix: Map<string, string>) {
    const description = [properties, Object.keys(suffix).join(', ')];

    return `${description.join(', ')} \n\n ${this._parseSuffix(suffix)}`;
  }

  _parseSuffix(suffix: Map<string, string>) {
    if (!suffix) return null;

    return Object.entries(suffix)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
}
