import { createContext, useContext, useState } from "react";

interface StageContextType {
  currentStage: string;
  setCurrentStage: (stage: string) => void;
  showEndOfDaySummary: boolean;
  setShowEndOfDaySummary: (show: boolean) => void;
}

const StageContext = createContext<StageContextType | undefined>(undefined);

export const useStageContext = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error("useStageContext must be used within a StageProvider");
  }
  return context;
};

export function StageProvider({ children }: { children: React.ReactNode }) {
  const [currentStage, setCurrentStage] = useState<string>("Ship");
  const [showEndOfDaySummary, setShowEndOfDaySummary] = useState<boolean>(false);

  return (
    <StageContext.Provider value={{ currentStage, setCurrentStage, showEndOfDaySummary, setShowEndOfDaySummary }} >
      {children}
    </StageContext.Provider>
  );
}