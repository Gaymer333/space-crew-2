import { ActivitiesProvider } from "../controllers/activities";
import { DayProvider } from "../controllers/day";
import { NPCsProvider } from "../controllers/NPCs";
import { ShipProvider } from "../controllers/ship";

interface ContextProvidersProps {
  children: React.ReactNode;
}

export function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <DayProvider>
      <ShipProvider>
        <NPCsProvider>
          <ActivitiesProvider>
            {children}
          </ActivitiesProvider>
        </NPCsProvider>
      </ShipProvider>
    </DayProvider>
  );
}
