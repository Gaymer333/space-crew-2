import { Flex, Text, Separator, Grid, Box, Progress } from "@radix-ui/themes";
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
            <Text><Text weight='bold'>{npc.name}:</Text> {npc.title}</Text>

            <Text weight='bold'>Needs:</Text>
            <Grid columns='2' gap='2' align='center' justify='center'>
              {npc.needs.map(need => (
                <>
                  <Text key={need.id} align='left' size='4'>{need.name}:</Text>
                  <Box>
                    <Text key={need.id + '-value'} align='left' size='4'>{need.value} / {need.maxValue}</Text>
                    <Progress value={need.value} max={need.maxValue} />
                  </Box>
                </>
              ))}
            </Grid>
          </Flex>
        </>
      ))}
    </Flex>
  </Flex>;
}

export default NPCList;