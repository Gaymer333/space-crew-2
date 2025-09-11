import { Box, Flex, Grid, Progress, Text } from "@radix-ui/themes";
import { useShipContext } from "../../controllers/ship";

function Ship() {
  const { needs } = useShipContext();

  return <Box height='100%'>
    <Flex direction='column' align='center' justify='start' gap='4'>
      <Text weight='bold' size='7'>Ship Info</Text>
      <Grid columns='2' gap='2' align='center' justify='center'>
        {needs.map(need => (
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
  </Box>
}

export default Ship;