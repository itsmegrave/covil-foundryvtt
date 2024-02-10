import { OldDragon2Item } from './item';

export interface OldDragon2Shield extends Omit<OldDragon2Item, 'type'> {
  type: 'shield';
  system?: OldDragon2Item['system'] & {
    bonus_ca: number;
    type: 'shield';
  };
}
