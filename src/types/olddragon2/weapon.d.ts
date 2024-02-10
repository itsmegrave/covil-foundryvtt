export interface OldDragon2Weapon extends Omit<OldDragon2Item, 'type'> {
  type: 'weapon';
  system?: OldDragon2Item['system'] & {
    bonus_ca?: number;
    damage_type?: string;
    damage?: string;
    bonus_damage?: number;
    bonus_ba?: number;
    shoot_range?: number;
    throw_range?: number;
    arrow?: boolean;
    bolt?: boolean;
    bolt_small?: boolean;
    polearm?: boolean;
    two_handed?: boolean;
    versatile?: boolean;
  };
}
