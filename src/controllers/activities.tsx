import { createContext, useContext, useState } from "react";
import { actionTypes, Activity } from "../types/activities";
import { startingActivities } from "../DemoDataDeleteMe/StartingActivities";
import { useNPCsContext } from "./XNPCs";
import { useShipContext } from "./ship";
import { useDayContext } from "./day";
import { useEventLogs } from "./eventLogs";
import { Strong, Text } from "@radix-ui/themes";
import { useGameStateContext } from "../storage/gameState";

interface ActivitiesContextType {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  doActivities: (assignedActivities: AssignedActivity[]) => void;
}

export interface AssignedActivity {
  activityId: string;
  npcId: string;
  companyingNPCIds?: string[];
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivitiesContext must be used within an ActivitiesProvider");
  }
  return context;
};

export function ActivitiesProvider({ children }: { children: React.ReactNode }) {
  const { NPCs } = useGameStateContext().data;
  const { updateNPCNeed, updateNPCRelationship } = useNPCsContext();
  const { updateShipNeed } = useShipContext();
  const { progressDay } = useDayContext();
  const { addLog } = useEventLogs();

  const [activities, setActivities] = useState<Activity[]>(startingActivities);

  function doActivity(assignedActivity: AssignedActivity) {
    const activity = activities.find(a => a.id === assignedActivity.activityId);
    const npc = NPCs.find(n => n.id === assignedActivity.npcId);
    if (!activity || !npc) throw new Error("Activity or NPC not found");
    if (activity.actions.length === 0) return;
    assignedActivity.companyingNPCIds?.forEach(companyingNpcId => {
      updateNPCRelationship(npc.id, companyingNpcId, 1);
    });
    const message = []
    message.push(<Text align='left'><Strong>{npc.name}</Strong> is starting activity <Strong>{activity.name}:</Strong></Text>);
    activity.actions.forEach(action => {
      switch (action.type) {
        case actionTypes.NPCNeedChange:
          updateNPCNeed(npc.id, action.needId, action.amount);
          break;
        case actionTypes.ShipNeedChange:
          updateShipNeed(action.needId, action.amount);
          break;
        default:
          throw new Error("Unknown action type");
      }
      const changeEmoji = action.amount > 0 ? '🟩' : '🟥';
      message.push(<Text align='left'>{`${changeEmoji} Changing ${action.needId} by ${action.amount}`}</Text>);
    });
    addLog({ message, type: 'info' });
    console.log("Completed activity", NPCs);
  }

  function doActivities(assignedActivities: AssignedActivity[]) {
    const uniqueSocialPairs = new Set<string>();
    for (const activity of assignedActivities) {
      activity.companyingNPCIds = assignedActivities.reduce((acc, aa) => {
        if (aa.activityId === activity.activityId && aa.npcId !== activity.npcId && !uniqueSocialPairs.has([activity.npcId, aa.npcId].sort().join('-'))) {
          acc.push(aa.npcId);
          uniqueSocialPairs.add([activity.npcId, aa.npcId].sort().join('-'));
        }
        return acc;
      }, [] as string[]);
      doActivity(activity);
    }
    progressDay();
  }

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities, doActivities }} >
      {children}
    </ActivitiesContext.Provider>
  );
}