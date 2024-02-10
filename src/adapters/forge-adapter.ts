import { ForgedItem, WeaponIntelligence } from '../types/covil/forged-item';
import { OldDragon2Weapon, OldDragon2Item, OldDragon2Shield, OldDragon2Armor } from '../types/olddragon2';

const itemTypes = {
  weapon: 'Arma',
  misc: 'Itens Gerais',
  shield: 'Escudo',
  potion: 'Poções',
  armor: 'Armaduras',
};
export class ForgeAdapter {
  transformToOldDragon2Item(forgedItem: ForgedItem): OldDragon2Item {
    switch (forgedItem.tipoItem) {
      case itemTypes.weapon:
        return this.transformToOldDragon2Weapon(forgedItem);
      case itemTypes.misc:
      case itemTypes.potion:
        return this.transformToOldDragon2MiscItem(forgedItem);
      case itemTypes.shield:
        return this.transformToOldDragon2Shield(forgedItem);
      case itemTypes.armor:
        return this.transformToOldDragon2Armor(forgedItem);
      default:
        console.error(forgedItem);
        throw new Error(`Tipo de Item desconhecido: ${forgedItem.tipoItem}`);
    }
  }

  transformToOldDragon2Shield(forgedShield: ForgedItem): OldDragon2Shield {
    return {
      ...this._basicItemInfo(forgedShield, 'shield'),
      system: {
        ...this._generateSystemInformation(forgedShield),
        bonus_ca: forgedShield.bnCa || 0,
        type: 'shield',
      },
    };
  }

  transformToOldDragon2Armor(forgedShield: ForgedItem): OldDragon2Armor {
    return {
      ...this._basicItemInfo(forgedShield, 'armor'),
      system: {
        ...this._generateSystemInformation(forgedShield),
        bonus_ca: forgedShield.bnCa || 0,
        type: 'armor',
      },
    };
  }

  transformToOldDragon2MiscItem(forgedItem: ForgedItem): OldDragon2Item {
    return {
      ...this._basicItemInfo(forgedItem, 'weapon'),
      system: {
        ...this._generateSystemInformation(forgedItem),
      },
    };
  }

  transformToOldDragon2Weapon(forgedWeapon: ForgedItem): OldDragon2Weapon {
    return {
      ...this._basicItemInfo(forgedWeapon, 'weapon'),
      system: {
        ...this._generateSystemInformation(forgedWeapon),
        damage_type: forgedWeapon.fkDano,
        bonus_ca: forgedWeapon.bnCa,
        damage: forgedWeapon.qeDano,
        bonus_damage: forgedWeapon.bnDano,
        bonus_ba: forgedWeapon.bnBa,
        shoot_range: Number(forgedWeapon.qeAlcDips),
        throw_range: Number(forgedWeapon.qeAlcArr),
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

  private _basicItemInfo(
    forgedItem: ForgedItem,
    type: 'shield' | 'weapon' | 'armor' | 'misc',
  ): { name: string; img?: string; type: string } {
    return {
      name: this._generateName(forgedItem.qeNome, forgedItem.sufixo),
      img: forgedItem.qeImg,
      type,
    };
  }

  private _generateSystemInformation(forgedItem: ForgedItem) {
    return {
      description: this._parseDescription(forgedItem.propriedades, forgedItem.sufixo, forgedItem.inteligencia),
      cost: forgedItem.custo,
      weight_in_load: Number(forgedItem.qePeso),
      weight_in_grams: Number(forgedItem.qePeso) * 1000,
      magic_item: true,
      quantity: forgedItem.qtde,
    };
  }

  private _generateName(name: string, suffix: Map<string, string>) {
    return `${name} - ${Object.keys(suffix).join(', ')}`;
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
