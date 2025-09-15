import { ActivitiesProvider } from "../controllers/activities";
import { DayProvider } from "../controllers/day";
import { EventLogsProvider } from "../controllers/eventLogs";
import { NPCsProvider } from "../controllers/NPCs";
import { ShipProvider } from "../controllers/ship";
import { StageProvider } from "../controllers/stage";

interface ContextProvidersProps {
  children: React.ReactNode;
}

export function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <EventLogsProvider>
      <StageProvider>
        <DayProvider>
          <ShipProvider>
            <NPCsProvider>
              <ActivitiesProvider>
                {children}
              </ActivitiesProvider>
            </NPCsProvider>
          </ShipProvider>
        </DayProvider>
      </StageProvider>
    </EventLogsProvider>
  );
}
