import { Covil } from '../module/config';
import { CovilService } from '../services/covil-service';
import { ForgedWeapon } from '../types/covil/forged-weapon';
import { Weapon } from '../types/olddragon2/weapon';

export class ForgeItem {
  service: CovilService;
  constructor() {
    this.service = new CovilService();
  }

  async call() {
    const response = await this.service.forgeItem();
    console.debug(Covil.logPrefix, response);

    this.createItem(response);
  }

  async createItem(json: ForgedWeapon) {
    const itemData: Weapon = {
      name: `${json.qeNome} - ${json.sufixo?.join(', ')}`,
      img: json.qeImg,
      type: 'weapon',
      system: {
        description: json.propriedades,
        cost: json.qeCustoPo,
        damage_type: json.fkDano,
        weight_in_load: Number(json.qePeso),
        weight_in_grams: Number(json.qePeso) * 1000,
        magic_item: this._isMagicItem(json.bnBa, json.bnCa, json.bnDano),
        bonus_ca: json.bnCa,
        damage: json.qeDano,
        bonus_damage: json.bnDano,
        bonus_ba: json.bnBa,
        shoot_range: Number(json.qeAlcDips),
        throw_range: Number(json.qeAlcArr),
      },
    };
    const item = await Item.create(itemData);
    console.debug(Covil.logPrefix, item);
    item?.sheet?.render(true);
  }

  _isMagicItem(ba: number = 0, ca: number = 0, damage: number = 0) {
    return Boolean(ba > 0 || ca > 0 || damage > 0);
  }
}
