import { useDayContext } from "../../controllers/day";

function DayDisplay() {
  const { day, dayProgression, dayDuration } = useDayContext();

  return <div>Day {day} - Progression {dayProgression} / {dayDuration}</div>;
}

export default DayDisplay;