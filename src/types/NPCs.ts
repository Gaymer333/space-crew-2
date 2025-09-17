
export type need = {
  id: 'cleanliness' | 'hunger' | 'fatigue';
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
}

export type relationship = {
  npcId: string;
  value: number;
}

type NPC = {
  id: string;
  name: string;
  title: string;
  needs: need[];
  relationships: relationship[];
};

export default NPC;