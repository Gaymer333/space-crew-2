import { createContext, useContext, useState } from "react";
import { Activity } from "../types/activities";
import { startingActivities } from "../DemoDataDeleteMe/StartingActivities";
import { useNPCsContext } from "./NPCs";

interface ActivitiesContextType {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  doActivities: (assignedActivities: AssignedActivity[]) => void;
}

export interface AssignedActivity {
  activityId: string;
  npcId: string;
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
  const { NPCs, updateNPCNeed } = useNPCsContext();

  function doActivity(assignedActivity: AssignedActivity) {
    const activity = activities.find(a => a.id === assignedActivity.activityId);
    const npc = NPCs.find(n => n.id === assignedActivity.npcId);
    if (!activity || !npc) throw new Error("Activity or NPC not found");
    activity.actions.forEach(action => {
      if (action.type === 'needChange') {
        updateNPCNeed(npc, action.needId, action.amount);
      }
    });
  }

  function doActivities(assignedActivities: AssignedActivity[]) {
    assignedActivities.forEach(aa => doActivity(aa));
  }

  const [activities, setActivities] = useState<Activity[]>(startingActivities);
  
  return (
    <ActivitiesContext.Provider value={{ activities, setActivities, doActivities }} >
      {children}
    </ActivitiesContext.Provider>
  );
}