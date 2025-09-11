import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import { useNPCsContext } from "../../controllers/NPCs";
import { AssignedActivity, useActivitiesContext } from "../../controllers/activities";
import { useState } from "react";
import DayDisplay from "./DayDisplay";

function ActivitiesList() {
  const { NPCs } = useNPCsContext();
  const { activities, doActivities } = useActivitiesContext();

  const [assignedActivities, setAssignedActivities] = useState<AssignedActivity[]>([]);

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
                <Flex direction='column' align='center' justify='center' gap='5'>
                  {NPCs.map(npc => (
                    <Flex key={npc.id} direction='row' align='center' justify='center' gap='5'>
                      <input type="radio" name={`npc-${npc.id}`} value={activity.id} onChange={() => handleActivityAssignment(npc.id, activity.id)} />
                      <Text>{npc.name}</Text>
                    </Flex>
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
      <Button onClick={() => doActivities(assignedActivities)}>Log Assigned Activities</Button>
    </Flex>
  </>
}

export default ActivitiesList;