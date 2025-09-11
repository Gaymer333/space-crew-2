import { ActivitiesProvider } from "../controllers/activities";
import { NPCsProvider } from "../controllers/NPCs";
import { ShipProvider } from "../controllers/ship";

interface ContextProvidersProps {
  children: React.ReactNode;
}

export function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <ShipProvider>
      <NPCsProvider>
        <ActivitiesProvider>
          {children}
        </ActivitiesProvider>
      </NPCsProvider>
    </ShipProvider>
  );
}
