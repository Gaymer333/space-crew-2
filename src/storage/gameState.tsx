import { createContext, useContext, useState } from "react";
import NPC from "../types/NPCs";
import startingNPCs from "../DemoDataDeleteMe/StartingNPCs";

interface GameStateData {
  NPCs: NPC[];
}

export type GameStateSetter = React.Dispatch<React.SetStateAction<GameStateData>>;

interface GameStateContext {
  data: GameStateData;
  setData: GameStateSetter;
}

const GameStateContext = createContext<GameStateContext | undefined>(undefined);

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameStateContext must be used within a GameStateProvider");
  }
  return context;
}

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

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<{ NPCs: NPC[] }>({ NPCs: setupNPCs() });


  return (
    <GameStateContext.Provider value={{ data, setData }}>
      {children}
    </GameStateContext.Provider>
  );
}