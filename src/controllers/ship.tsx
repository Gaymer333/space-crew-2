import { createContext, useContext, useEffect, useState } from "react";
import StartingShip from "../DemoDataDeleteMe/StartingShip";
import { ShipNeed } from "../types/ship";
import { actionTypes, ActivityAction } from "../types/activities";
import { useDayContext } from "./day";
import { useStageContext } from "./stage";

interface ShipContextType {
  needs: ShipNeed[];
  setNeeds: (needs: ShipNeed[]) => void;
  updateShipNeed: (needId: string, amount: number) => void;
}

const ShipContext = createContext<ShipContextType | undefined>(undefined);

export const useShipContext = () => {
  const context = useContext(ShipContext);
  if (!context) {
    throw new Error("useShipContext must be used within a ShipProvider");
  }
  return context;
};

export const END_OF_DAY_ACTIVITIES: ActivityAction[] = [
  { type: actionTypes.ShipNeedChange, needId: 'power', amount: -10 },
  { type: actionTypes.ShipNeedChange, needId: 'hull', amount: -5 },
  { type: actionTypes.ShipNeedChange, needId: 'oxygen', amount: -5 },
  { type: actionTypes.ShipNeedChange, needId: 'water', amount: -5 },
  { type: actionTypes.ShipNeedChange, needId: 'fuel', amount: -5 },
]

export function ShipProvider({ children }: { children: React.ReactNode }) {
  const { day } = useDayContext();

  const [needs, setNeeds] = useState<ShipNeed[]>(StartingShip.needs);

  useEffect(() => {
    if (day > 1) {
      END_OF_DAY_ACTIVITIES.forEach(action => {
        if (action.type === actionTypes.ShipNeedChange) {
          updateShipNeed(action.needId, action.amount);
        }
      });
    }
  }, [day]);

  function updateShipNeed(needId: string, amount: number) {
    const need = needs.find(s => s.id === needId);
    if (!need) throw new Error("Need not found");
    const newNeed = { ...need };
    newNeed.value = Math.min(newNeed.maxValue, Math.max(newNeed.minValue, newNeed.value + amount));
    setNeeds(prevNeeds => prevNeeds.map(n => n.id === needId ? newNeed : n));
  }

  return (
    <ShipContext.Provider value={{ needs, setNeeds, updateShipNeed }} >
      {children}
    </ShipContext.Provider>
  );
}