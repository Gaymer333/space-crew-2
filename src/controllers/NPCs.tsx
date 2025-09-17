import { createContext, useContext, useState } from "react";
import NPC from "../types/NPCs";
import startingNPCs from "../DemoDataDeleteMe/StartingNPCs";

interface NPCsContextType {
  NPCs: NPC[];
  setNPCs: (npcs: NPC[]) => void;
  updateNPCNeed: (npc: NPC, needId: string, amount: number) => void;
}

const NPCsContext = createContext<NPCsContextType | undefined>(undefined);

export const useNPCsContext = () => {
  const context = useContext(NPCsContext);
  if (!context) {
    throw new Error("useNPCsContext must be used within an NPCsProvider");
  }
  return context;
};

function setupNPCs() {
  return startingNPCs.map(npc => {
    const startingRelationships = startingNPCs.reduce((acc, otherNPC) => {
      if (otherNPC.id !== npc.id) {
        acc.push({ npcId: otherNPC.id, value: 0 });
      }
      return acc;
    }, [] as { npcId: string; value: number }[]);
    return { ...npc, relationships: startingRelationships };
  });
}

export function NPCsProvider({ children }: { children: React.ReactNode }) {
  const [NPCs, setNPCs] = useState<NPC[]>(setupNPCs());

  function updateNPCState(npc: NPC, stateId: string, amount: number) {
    const newNPC = { ...npc };
    const need = newNPC.needs.find(s => s.id === stateId);
    if (!need) throw new Error("State not found");
    const newNeed = { ...need };
    newNeed.value = Math.min(newNeed.maxValue, Math.max(newNeed.minValue, newNeed.value + amount));
    newNPC.needs = newNPC.needs.map(s => s.id === stateId ? newNeed : s);
    setNPCs(prevNPCs => prevNPCs.map(n => n.id === npc.id ? newNPC : n));
  }

  return (
    <NPCsContext.Provider value={{ NPCs, setNPCs, updateNPCNeed: updateNPCState }} >
      {children}
    </NPCsContext.Provider>
  );
};