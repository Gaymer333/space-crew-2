

export type ShipNeedIds = 'hull' | 'fuel' | 'oxygen' | 'power' | 'water';

export type ShipNeed = {
  id: ShipNeedIds;
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
}