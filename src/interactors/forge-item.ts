import { ForgeAdapter } from '../adapters/forge-adapter';
import { Covil } from '../module/config';
import { CovilService } from '../services/covil-service';
import { ForgedItem } from '../types/covil/forged-item';
import { OldDragon2Item } from '../types/olddragon2';

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

  async createItem(json: ForgedItem) {
    const itemData: OldDragon2Item = this.adapter.transformToOldDragon2Item(json);

    const item = await Item.create(itemData);
    console.debug(Covil.logPrefix, item);
    item?.sheet?.render(true);
  }
}
