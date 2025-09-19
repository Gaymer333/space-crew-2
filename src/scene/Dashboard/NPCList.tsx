import { Flex, Text, Separator, Grid, Box, Progress, HoverCard } from "@radix-ui/themes";
import { useNPCsContext } from "../../controllers/XNPCs";
import { useGameStateContext } from "../../storage/gameState";


function NPCList() {
  const { NPCs } = useGameStateContext().data;

  return <Flex height='100%' direction='column' align='center' justify='start' gap='4'>
    <Text weight='bold' size='7'>NPC List</Text>
    <Flex direction='row' align='center' justify='center' gap='4'>
      {NPCs.map((npc, index) => (
        <>
          {index > 0 && <Separator orientation="vertical" size='4' />}
          <Flex key={npc.id} direction='column' align='center' justify='center' gap='2'>
            <Text><Text weight='bold'>{npc.name}:</Text> {npc.title}</Text>

            <HoverCard.Root>
              <HoverCard.Trigger>
                <Text size='2'>Relationships</Text>
              </HoverCard.Trigger>
              <HoverCard.Content>
                <Flex direction='column' align='start' justify='start' gap='1'>
                  {npc.relationships.map(rel => {
                    const relatedNPC = NPCs.find(n => n.id === rel.npcId);
                    if (!relatedNPC) return null;
                    return <Text key={rel.npcId} align='left' size='4'>{relatedNPC.name}: {rel.value}</Text>;
                  })}
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
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