import { Box, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { useNPCsContext } from "../../controllers/NPCs";
import { AssignedActivity, useActivitiesContext } from "../../controllers/activities";
import { useState } from "react";
import DayDisplay from "./DayDisplay";
import { useDayContext } from "../../controllers/day";
import { css, styled } from "styled-components";

interface RadioBoxProps {
  selected?: boolean;
}

const RadioBox = styled(Box) <RadioBoxProps>`
  width: 40px;
  height: 40px;
  border: 2px solid var(--gray-a7);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  ${props => props.selected && css`
    border-color: var(--blue-a7);
    background-color: var(--blue-a3);
  `}

  &:hover {
    border-color: var(--blue-a7);
  }
`;

function ActivitiesList() {
  const { NPCs } = useNPCsContext();
  const { activities, doActivities } = useActivitiesContext();
  const { dayProgression, dayDuration, nextDay } = useDayContext();

  const [assignedActivities, setAssignedActivities] = useState<AssignedActivity[]>([]);

  const isDayComplete = dayProgression > dayDuration;

  const handleActivityAssignment = (npcId: string, activityId: string) => {
    setAssignedActivities(prev => {
      const filtered = prev.filter(aa => aa.npcId !== npcId);
      return [...filtered, { npcId, activityId }];
    });
  }

  return <>
    <Flex height='100%' direction='column' align='center' justify='center' gap='5'>
      <Text weight='bold' size='7'>Activities List</Text>
      <Flex height='100%' direction='row' align='center' justify='center' gap='4'>
        {activities.map((activity, index) => (
          <>
            {index > 0 && <Separator orientation="vertical" size='4' />}

            <Flex key={activity.id} direction='column' align='center' justify='center' gap='2'>
              <Text weight='bold' size='5'>{activity.name}</Text>
              <Text>{activity.description}</Text>
              <Text>Type: {activity.type}</Text>
              <Flex direction='column' align='center' justify='center' gap='2'>
                <Text>Assigned</Text>
                <Flex direction='row' align='center' justify='center' gap='5'>
                  {NPCs.map(npc => (
                    <RadioBox
                      key={npc.id}
                      onClick={() => handleActivityAssignment(npc.id, activity.id)}
                      selected={assignedActivities.some(aa => aa.npcId === npc.id && aa.activityId === activity.id)}
                    >
                      <Text>{npc.name.slice(0, 3)}</Text>
                    </RadioBox>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </>
        ))}
      </Flex>
    </Flex>
    <Flex height={'100%'} direction='row' align='center' justify='center' gap='4' mt='6'>
      <DayDisplay />
      <Separator orientation="vertical" size='4' />
      <Button onClick={() => isDayComplete ? nextDay() : doActivities(assignedActivities)}>{isDayComplete ? "End day" : "Log Assigned Activities"}</Button>
    </Flex>
  </>
}

export default ActivitiesList;