import { actionTypes, Activity } from "../types/activities";

export const startingActivities: Activity[] = [
  {
    id: 'activity-research',
    name: 'Researching',
    description: 'Conduct scientific research on alien flora and fauna.',
    type: 'job',
    actions: [
      {
        type: actionTypes.NPCNeedChange,
        needId: 'cleanliness',
        amount: -10,
      },
    ],
  },
  {
    id: 'activity-fix-engine',
    name: 'Fixing Engine',
    description: 'Repair the spaceship\'s engine.',
    type: 'job',
    actions: [
      {
        type: actionTypes.NPCNeedChange,
        needId: 'cleanliness',
        amount: -10,
      },
      {
        type: actionTypes.ShipNeedChange,
        needId: 'power',
        amount: 10,
      },
    ],
  },
  {
    id: 'activity-shower',
    name: 'Showering',
    description: 'Take a refreshing shower to clean up.',
    type: 'need',
    actions: [
      {
        type: actionTypes.NPCNeedChange,
        needId: 'cleanliness',
        amount: 20,
      },
    ],
  },
  {
    id: 'activity-relax',
    name: 'Relaxing',
    description: 'Take some time to unwind and relax.',
    type: 'relationship',
    actions: [
      {
        type: actionTypes.NPCNeedChange,
        needId: 'cleanliness',
        amount: -5,
      },
    ],
  },
];
