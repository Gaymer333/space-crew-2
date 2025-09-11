import { createContext, useContext, useState } from "react";
import StartingShip from "../DemoDataDeleteMe/StartingShip";
import { ShipNeed } from "../types/ship";

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

export function ShipProvider({ children }: { children: React.ReactNode }) {
  const [needs, setNeeds] = useState<ShipNeed[]>(StartingShip.needs);

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