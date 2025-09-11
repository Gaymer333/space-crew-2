import { ActivitiesProvider } from "../controllers/activities";
import { NPCsProvider } from "../controllers/NPCs";

interface ContextProvidersProps {
  children: React.ReactNode;
}

export function ContextProviders({ children }: ContextProvidersProps ) {
  return (
    <NPCsProvider>
      <ActivitiesProvider>
        {children}
      </ActivitiesProvider>
    </NPCsProvider>
  );
}
