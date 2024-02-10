import { ForgedItem, WeaponIntelligence } from '../types/covil/forged-item';
import { OldDragon2Weapon } from '../types/olddragon2';

const itemTypes = {
  weapon: 'Arma',
};
export class ForgeAdapter {
  transformToOldDragon2Item(forgedItem: ForgedItem): OldDragon2Weapon {
    switch (forgedItem.tipoItem) {
      case itemTypes.weapon:
        return this.transformToOldDragon2Weapon(forgedItem);

      default:
        console.debug(forgedItem.tipoItem);
        throw new Error('Tipo de Item desconhecido!');
        break;
    }
  }

  transformToOldDragon2Weapon(forgedWeapon: ForgedItem): OldDragon2Weapon {
    return {
      name: `${forgedWeapon.qeNome} - ${Object.keys(forgedWeapon.sufixo).join(', ')}`,
      img: forgedWeapon.qeImg,
      type: 'weapon',
      system: {
        description: this._parseDescription(forgedWeapon.propriedades, forgedWeapon.sufixo, forgedWeapon.inteligencia),
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

  private _isMagicItem(ba: number = 0, ca: number = 0, damage: number = 0) {
    return Boolean(ba > 0 || ca > 0 || damage > 0);
  }

  private _parseWeaponType(forgedWeapon: ForgedItem): 'melee' | 'ranged' | 'ammunition' | 'throwing' {
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

  private _parseDescription(properties: string, suffix: Map<string, string>, intelligent: WeaponIntelligence) {
    const description = [properties, Object.keys(suffix).join(', ')];

    return `${description.join(', ')}\n\n${this._parseMap(suffix)}${this._parseIntelligentWeapon(intelligent)}`;
  }

  private _isIntelligentWeapon(intelligent: WeaponIntelligence): boolean {
    return !!intelligent;
  }

  private _parseIntelligentWeapon(intelligent: WeaponIntelligence) {
    if (!this._isIntelligentWeapon(intelligent)) return '';

    const intelligentWeaponBlock = ['\n'];
    intelligentWeaponBlock.push('=====================================\n');
    intelligentWeaponBlock.push('Propriedades Arma Inteligente:');
    intelligentWeaponBlock.push(`* INT: ${intelligent.INT}`);
    intelligentWeaponBlock.push(`* Comunicação: ${intelligent.Comunic}`);
    intelligentWeaponBlock.push(`* Idiomas: ${intelligent.Idiomas || 0}`);
    intelligentWeaponBlock.push(`* Poderes de Detecção: \n${this._parseIntelligentPowers(intelligent.PodDetec)}`);
    if (intelligent.PodMai) {
      intelligentWeaponBlock.push(`* Poderes Maiores: \n${this._parseIntelligentPowers(intelligent.PodMai)}`);
    }

    return intelligentWeaponBlock.join('\n');
  }

  private _parseIntelligentPowers(powers?: Map<string, string>) {
    if (!powers) return '';

    return Object.entries(powers)
      .map(([key, value]) => `  ** ${key}: ${value}`)
      .join('\n');
  }

  private _parseMap(suffix: Map<string, string>) {
    if (!suffix) return '';

    return Object.entries(suffix)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n\n');
  }
}
