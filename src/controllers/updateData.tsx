import { createContext, useContext } from "react";
import NPCs, { NPCsController } from "./NPCs";
import { useGameStateContext } from "../storage/gameState";

export interface UpdateDataController {
  NPCs: NPCsController;
}

const updateDataContext = createContext<UpdateDataController | undefined>(undefined);

export const useUpdateDataContext = () => {
  const context = useContext(updateDataContext);
  if (!context) {
    throw new Error("useUpdateDataContext must be used within an UpdateDataProvider");
  }
  return context;
}

export function UpdateDataProvider({ children }: { children: React.ReactNode }) {
  const { setData } = useGameStateContext();

  const controllers: UpdateDataController = {
    NPCs: NPCs(setData),
  };

  return (
    <updateDataContext.Provider value={controllers}>
      {children}
    </updateDataContext.Provider>
  );
}