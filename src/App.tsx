import { useState } from 'react';
import './App.css';
import { useNPCsContext } from './controllers/NPCs';
import { AssignedActivity, useActivitiesContext } from './controllers/activities';
import { Button, Flex, Separator } from '@radix-ui/themes';

function App() {
  const { NPCs } = useNPCsContext();
  const { activities, doActivities } = useActivitiesContext();

  const [assignedActivities, setAssignedActivities] = useState<AssignedActivity[]>([]);

  const handleActivityAssignment = (npcId: string, activityId: string) => {
    setAssignedActivities(prev => {
      const filtered = prev.filter(aa => aa.npcId !== npcId);
      return [...filtered, { npcId, activityId }];
    });
  }

  return (
    <div className="App">
      <h1>NPC List</h1>
      <Flex height='200px' direction='row' align='center' justify='center' gap='4'>
        {NPCs.map((npc, index) => (
          <>
            {index > 0 && <Flex height='100%'><Separator orientation="vertical" size='4' /></Flex>}
            <div key={npc.id}>
              <h2>{npc.name}</h2>
              <p>{npc.title}</p>
              <strong>Needs:</strong> 
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
                {npc.needs.map(need => (
                  <div key={need.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>{need.name}</p>
                    <progress value={need.value} max={need.maxValue} />
                    <p>{need.value}/{need.maxValue}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ))}
      </Flex>
      <p>---------------------------</p>
      <h1>Activities List</h1>
      <Flex height='400px' direction='row' align='center' justify='center' gap='4'>
        {activities.map((activity, index) => (
          <>
            {index > 0 && <Flex height='100%'><Separator orientation="vertical" size='4' /></Flex>}
          
            <div key={activity.id}>
              <h2>{activity.name}</h2>
              <p>{activity.description}</p>
              <p>Type: {activity.type}</p>
              <div>
                <p>Assigned</p>
                <div>
                  {NPCs.map(npc => (
                    <div key={npc.id} style={{ display: 'flex', flexDirection: 'row', gap: '5px', justifyContent: 'center' }}>
                      <input type="radio" name={`npc-${npc.id}`} value={activity.id} onChange={() => handleActivityAssignment(npc.id, activity.id)} />
                      <p>{npc.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ))}
      </Flex>
      <Button onClick={() => doActivities(assignedActivities)}>Log Assigned Activities</Button>
    </div>
  );
}

export default App;
