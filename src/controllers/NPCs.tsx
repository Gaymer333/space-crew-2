import { createContext, useContext, useEffect, useState } from "react";
import NPC from "../types/NPCs";
import startingNPCs from "../DemoDataDeleteMe/StartingNPCs";

interface NPCsContextType {
  NPCs: NPC[];
  setNPCs: (npcs: NPC[]) => void;
  updateNPCNeed: (npcId: string, needId: string, amount: number) => void;
  updateNPCRelationship: (npcId: string, otherNpcId: string, amount: number) => void;
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

  useEffect(() => {
    console.log("NPCs after relationship update:", NPCs);
  }, [NPCs]);

  function updateNPCNeed(npcId: string, stateId: string, amount: number) {
    function doUpdate(currentNPCs: NPC[], npcId: string, stateId: string, amount: number) {
      const NPC = currentNPCs.find(n => n.id === npcId);
      if (!NPC) throw new Error("NPC not found");
      const newNPC = { ...NPC };
      const need = newNPC.needs.find(s => s.id === stateId);
      if (!need) throw new Error("State not found");
      const newNeed = { ...need };
      newNeed.value = Math.min(newNeed.maxValue, Math.max(newNeed.minValue, newNeed.value + amount));
      newNPC.needs = newNPC.needs.map(s => s.id === stateId ? newNeed : s);
      return newNPC;
    }
    setNPCs(prevNPCs => prevNPCs.map(n => n.id === npcId ? doUpdate(prevNPCs, npcId, stateId, amount) : n));
  }

  function updateNPCRelationship(npcId: string, otherNpcId: string, amount: number) {
    function doUpdate(currentNPCs: NPC[], npcId: string, otherNpcId: string) {
      const NPC = currentNPCs.find(n => n.id === npcId);
      if (!NPC) throw new Error("NPC not found");
      const newNPC = { ...NPC };
      const relationship = newNPC.relationships.find(r => r.npcId === otherNpcId);
      if (!relationship) throw new Error("Relationship not found");
      const newRelationship = { ...relationship };
      newRelationship.value += amount;
      newNPC.relationships = newNPC.relationships.map(r => r.npcId === otherNpcId ? newRelationship : r);
      return newNPC;
    }
    setNPCs(prevNPCs => prevNPCs.map(n => n.id === npcId ? doUpdate(prevNPCs, npcId, otherNpcId) : n));
    setNPCs(prevNPCs => prevNPCs.map(n => n.id === otherNpcId ? doUpdate(prevNPCs, otherNpcId, npcId) : n));
  }

  return (
    <NPCsContext.Provider value={{ NPCs, setNPCs, updateNPCNeed, updateNPCRelationship }} >
      {children}
    </NPCsContext.Provider>
  );
};