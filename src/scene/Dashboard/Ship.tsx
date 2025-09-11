import { Box, Flex, Text } from "@radix-ui/themes";

function Ship() {
  return <Box height='100%'>
    <Flex direction='column' align='center' justify='start' gap='4'>
      <Text weight='bold' size='7'>Ship Info</Text>
    </Flex>
  </Box>
}

export default Ship;