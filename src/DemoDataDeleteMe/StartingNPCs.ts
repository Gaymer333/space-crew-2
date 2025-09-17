import NPC, { need } from "../types/NPCs";

const startingStats: need[] = [
  {
    id: 'cleanliness',
    name: 'Cleanliness',
    value: 50,
    minValue: 0,
    maxValue: 100,
  },
  {
    id: 'hunger',
    name: 'Hunger',
    value: 50,
    minValue: 0,
    maxValue: 100,
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    value: 50,
    minValue: 0,
    maxValue: 100,
  },
];

const startingNPCs: NPC[] = [
  {
    id: 'npc-1',
    name: 'Jin',
    title: 'Engineer',
    needs: [...startingStats],
    relationships: [],
  },
  {
    id: 'npc-2',
    name: 'James',
    title: 'Pilot',
    needs: [...startingStats],
    relationships: [],
  },
  {
    id: 'npc-3',
    name: 'Max',
    title: 'Scientist',
    needs: [...startingStats],
    relationships: [],
  },
];

export default startingNPCs;