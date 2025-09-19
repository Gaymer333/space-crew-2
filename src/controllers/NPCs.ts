import { GameStateSetter } from "../storage/gameState";
import NPC from "../types/NPCs";

export interface NPCsController {
  updateNPCNeed: (npcId: string, needId: string, amount: number) => void;
  updateAllNPCsNeed: (needId: string, amount: number) => void;
  updateNPCRelationship: (npcId: string, otherNpcId: string, amount: number) => void;
}

function updateAllNPCsNeed(setData: GameStateSetter) {
  return function (needId: string, amount: number) {
    setData(data => {
      const newNPCs = data.NPCs.map(n => {
        const newNPC = { ...n };
        const need = newNPC.needs.find(s => s.id === needId);
        if (need) {
          const newNeed = { ...need };
          newNeed.value = Math.min(newNeed.maxValue, Math.max(newNeed.minValue, newNeed.value + amount));
          newNPC.needs = newNPC.needs.map(s => s.id === needId ? newNeed : s);
        }
        return newNPC
      });
      return { ...data, NPCs: newNPCs };
    });
  }
}

function updateNPCNeed(setData: GameStateSetter) {
  return function (npcId: string, stateId: string, amount: number) {
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
    setData(data => {
      const newNPCs = data.NPCs.map(n => n.id === npcId ? doUpdate(data.NPCs, npcId, stateId, amount) : n);
      return { ...data, NPCs: newNPCs };
    });
  }
}

function updateNPCRelationship(setData: GameStateSetter) {
  return function (npcId: string, otherNpcId: string, amount: number) {
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
    setData(data => {
      const newNPCs = data.NPCs.map(n => n.id === npcId ? doUpdate(data.NPCs, npcId, otherNpcId) : n);
      return { ...data, NPCs: newNPCs };
    });
    setData(data => {
      const newNPCs = data.NPCs.map(n => n.id === otherNpcId ? doUpdate(data.NPCs, otherNpcId, npcId) : n);
      return { ...data, NPCs: newNPCs };
    });
  }
}

function setSetterForFunctions(setData: GameStateSetter): NPCsController {
  return {
    updateNPCNeed: updateNPCNeed(setData),
    updateAllNPCsNeed: updateAllNPCsNeed(setData),
    updateNPCRelationship: updateNPCRelationship(setData),
  }
}

export default setSetterForFunctions;