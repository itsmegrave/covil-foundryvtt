export type Weapon = {
  name: string;
  type: 'weapon';
  _id?: string;
  img?: string;
  system?: {
    odo_id?: string;
    description?: string;
    quantity?: number;
    cost?: string;
    weight_in_load?: number;
    weight_in_grams?: number;
    magic_item?: boolean;
    bonus_ca?: number;
    type?: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects?: any[];
};
