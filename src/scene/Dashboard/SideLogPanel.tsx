import * as React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { useEventLogs } from "../../controllers/eventLogs";


const SideLogPanelBox = styled(Box)`
  background-color: var(--white-a11);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  padding: 16px;
  transform: translateY(-50%);
`;

export const SideLogPanel = () => {
  const { logs } = useEventLogs();

  return (
    <SideLogPanelBox width='300px' height='80%' position='fixed' left='0' top='50%' >
      <Flex direction='column' mb='4' align='center' justify='between'>
        <Text>Event Logs</Text>
        {logs.map(log => (
          <Text key={log.id}>{log.message}</Text>
        ))}
      </Flex>
    </SideLogPanelBox>
  );
};