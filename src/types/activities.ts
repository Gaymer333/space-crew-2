import NPC from "./NPCs";
import { ShipNeedIds } from "./ship";

export enum actionTypes {
  NPCNeedChange = 'NPCNeedChange',
  ShipNeedChange = 'ShipNeedChange',
}

type action = {
  type: actionTypes.NPCNeedChange;
  needId: NPC['needs'][number]['id'];
  amount: number;
} | {
  type: actionTypes.ShipNeedChange;
  needId: ShipNeedIds;
  amount: number;
}

export type Activity = {
  id: string;
  name: string;
  description: string;
  type: 'job' | 'need' | 'recreation' | 'relationship';
  actions: action[];
};
