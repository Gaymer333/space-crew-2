import { createContext, useContext, useRef, useState } from "react";
import { useStageContext } from "./stage";

interface DayContextType {
  day: number;
  dayProgression: number;
  dayDuration: number;
  dayProgressionTitle: string;
  setDay: (day: number) => void;
  nextDay: () => void;
  progressDay: () => void;
}

const DayContext = createContext<DayContextType | undefined>(undefined);

export const useDayContext = () => {
  const context = useContext(DayContext);
  if (!context) {
    throw new Error("useDayContext must be used within a DayProvider");
  }
  return context;
};

const DAY_DURATION = 3
const DAY_PROGRESSION_TITLES = ["Morning", "Afternoon", "Evening", "Night"];

export function DayProvider({ children }: { children: React.ReactNode }) {
  const { setShowEndOfDaySummary } = useStageContext();

  const [day, setDay] = useState(1);
  const [dayProgression, setDayProgression] = useState(1);
  console.log("DayProvider rendered", dayProgression);
  const currentDayProgressionTitle = useRef(DAY_PROGRESSION_TITLES[0]);

  function progressDay() {
    setDayProgression(prev => {
      const newProgression = prev + 1;
      currentDayProgressionTitle.current = DAY_PROGRESSION_TITLES[newProgression - 1];
      return newProgression;
    });
  }

  function nextDay() {
    setDay(prevDay => prevDay + 1);
    setDayProgression(1);
    currentDayProgressionTitle.current = DAY_PROGRESSION_TITLES[0];
    setShowEndOfDaySummary(true);
  }

  return (
    <DayContext.Provider value={{
      day,
      dayProgression,
      dayDuration: DAY_DURATION,
      dayProgressionTitle: currentDayProgressionTitle.current,
      setDay,
      nextDay,
      progressDay
    }} >
      {children}
    </DayContext.Provider>
  );
}