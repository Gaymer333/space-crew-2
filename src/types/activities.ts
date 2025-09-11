import NPC from "./NPCs";

type action = {
  type: 'needChange';
  needId: NPC['needs'][number]['id'];
  amount: number;
}

export type Activity = {
  id: string;
  name: string;
  description: string;
  type: 'job' | 'need' | 'recreation' | 'relationship';
  actions: action[];
};
