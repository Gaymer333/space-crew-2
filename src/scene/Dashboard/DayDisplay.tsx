import { Text } from "@radix-ui/themes";
import { useDayContext } from "../../controllers/day";

function DayDisplay() {
  const { day, dayProgressionTitle } = useDayContext();

  return <Text>Day {day} - {dayProgressionTitle}</Text>;
}

export default DayDisplay;