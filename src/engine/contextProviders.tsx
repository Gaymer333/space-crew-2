import { ActivitiesProvider } from "../controllers/activities";
import { DayProvider } from "../controllers/day";
import { EventLogsProvider } from "../controllers/eventLogs";
import { NPCsProvider } from "../controllers/XNPCs";
import { ShipProvider } from "../controllers/ship";
import { StageProvider } from "../controllers/stage";
import { GameStateProvider } from "../storage/gameState";
import { UpdateDataProvider } from "../controllers/updateData";

interface ContextProvidersProps {
  children: React.ReactNode;
}

export function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <GameStateProvider>
      <UpdateDataProvider>
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
      </UpdateDataProvider>
    </GameStateProvider>
  );
}
