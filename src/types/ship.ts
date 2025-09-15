

export type ShipNeedIds = 'hull' | 'fuel' | 'oxygen' | 'power' | 'water';

export interface ShipNeedsBase {
  id: string;
  name: string;
  minValue: number;
  maxValue: number;
}

export interface ShipNeed extends ShipNeedsBase {
  value: number;
}