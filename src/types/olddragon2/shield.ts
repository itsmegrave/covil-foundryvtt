import { OldDragon2Item } from './item';

export interface OldDragon2Shield extends OldDragon2Item {
  system?: OldDragon2Item['system'] & {
    bonus_ca: number;
    type: 'shield';
  };
}
