import { Button, Dialog, Text } from "@radix-ui/themes";
import { useStageContext } from "../../controllers/stage";

function EndOfDayDialog() {
  const { showEndOfDaySummary, setShowEndOfDaySummary } = useStageContext();

  return (
    <Dialog.Root open={showEndOfDaySummary} onOpenChange={setShowEndOfDaySummary}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>End of day</Dialog.Title>

        <Text>Day has ended. Ship needs have been updated.</Text>
        <Dialog.Close>
          <Button variant="soft">
            Close
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EndOfDayDialog;