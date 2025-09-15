import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useStageContext } from "../../controllers/stage";
import { END_OF_DAY_ACTIVITIES, NEEDS } from "../../controllers/ship";

function EndOfDayDialog() {
  const { showEndOfDaySummary, setShowEndOfDaySummary } = useStageContext();

  return (
    <Dialog.Root open={showEndOfDaySummary} onOpenChange={setShowEndOfDaySummary}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>End of day</Dialog.Title>

        <Flex direction="column" gap="10px" mb="20px">
          {END_OF_DAY_ACTIVITIES.map(activity => {
            const needDetails = NEEDS.find(need => need.id === activity.needId);
            if (!needDetails) return null;
            const title = `${needDetails.name} ${activity.amount > 0 ? 'increased' : 'decreased'} by ${Math.abs(activity.amount)}`;
            return <Text key={needDetails.id}>{title}</Text>;
          })}
        </Flex>

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