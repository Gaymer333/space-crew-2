import { Flex, Text, Separator } from "@radix-ui/themes";
import { useNPCsContext } from "../../controllers/NPCs";


function NPCList() {
  const { NPCs } = useNPCsContext();

  return <Flex height='100%' direction='column' align='center' justify='start' gap='4'>
    <Text weight='bold' size='7'>NPC List</Text>
    <Flex direction='row' align='center' justify='center' gap='4'>
      {NPCs.map((npc, index) => (
        <>
          {index > 0 && <Separator orientation="vertical" size='4' />}
          <Flex key={npc.id} direction='column' align='center' justify='center' gap='2'>
            <Text size='4' weight='bold'>{npc.name}</Text>
            <Text>{npc.title}</Text>
            <Text weight='bold'>Needs:</Text>
            <Flex direction='row' align='center' justify='center' gap='4'>
              {npc.needs.map(need => (
                <Flex key={need.id} direction='column' align='center' justify='center' gap='1'>
                  <Text>{need.name}</Text>
                  <progress value={need.value} max={need.maxValue} />
                  <Text>{need.value}/{need.maxValue}</Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </>
      ))}
    </Flex>
  </Flex>;
}

export default NPCList;