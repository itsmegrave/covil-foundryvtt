export interface OldDragon2Item {
  name: string;
  type: string;
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
    type?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects?: any[];
}
