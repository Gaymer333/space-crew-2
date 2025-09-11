import { createContext, useContext, useRef, useState } from "react";

interface DayContextType {
  day: number;
  dayProgression: number;
  dayDuration: number;
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

export function DayProvider({ children }: { children: React.ReactNode }) {
  const [day, setDay] = useState(1);
  const [dayProgression, setDayProgression] = useState(1);
  const didIncrementRef = useRef(false);

  function progressDay() {
    setDayProgression(prev => {
      if (prev >= DAY_DURATION) {
        if (!didIncrementRef.current) {
          setDay(d => d + 1);
          didIncrementRef.current = true;
        }
        return 1;
      }
      didIncrementRef.current = false;
      return prev + 1;
    });
  }

  function nextDay() {
    setDay(prevDay => prevDay + 1);
    setDayProgression(1);
  }

  return (
    <DayContext.Provider value={{
      day,
      dayProgression,
      dayDuration: DAY_DURATION,
      setDay,
      nextDay,
      progressDay
    }} >
      {children}
    </DayContext.Provider>
  );
}