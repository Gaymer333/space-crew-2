
export type need = {
  id: 'cleanliness' | 'hunger' | 'fatigue';
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
}

type NPC = {
  id: string;
  name: string;
  title: string;
  needs: need[];
};

export default NPC;