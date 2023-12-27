import { ForgeAdapter } from '../adapters/forge-adapter';
import { Covil } from '../module/config';
import { CovilService } from '../services/covil-service';
import { ForgedWeapon } from '../types/covil/forged-weapon';
import { Weapon } from '../types/olddragon2/weapon';

export class ForgeItem {
  service: CovilService;
  adapter: ForgeAdapter;

  constructor() {
    this.service = new CovilService();
    this.adapter = new ForgeAdapter();
  }

  async call() {
    const response = await this.service.forgeItem();
    console.debug(Covil.logPrefix, response);

    this.createItem(response);
  }

  async createItem(json: ForgedWeapon) {
    const itemData: Weapon = this.adapter.transformToOldDragon2Weapon(json);

    const item = await Item.create(itemData);
    console.debug(Covil.logPrefix, item);
    item?.sheet?.render(true);
  }
}
