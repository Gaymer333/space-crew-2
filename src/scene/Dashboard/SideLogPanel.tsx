import * as React from "react";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import styled, { css } from "styled-components";
import { useEventLogs } from "../../controllers/eventLogs";
import { log } from "util";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

interface SideLogPanelProps {
  open: boolean;
}

const SideLogPanelBox = styled(Box) <SideLogPanelProps>`
  background-color: var(--white-a11);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  padding: 16px;

  transition: transform 0.5s;
  ${({ open }) => open ? css`transform: translateY(-50%) translateX(0);` : css`transform: translateY(-50%) translateX(-250px);`};
`;

const ToggleButton = styled(Flex)`
  height: 32px;
  width: 32px;
  position: absolute;
  right: 0px;
  top: 0;
  border: 1px solid var(--gray-a7);
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--white-a11);

  &:hover {
    background-color: var(--gray-a3);
  }
`;

const LogElementBox = styled(Box)`
  display: flex;
  padding: 8px;
  border: 1px solid var(--gray-a7);
  border-radius: 5px;
  width: 100%;
  align-items: flex-start;
`;

interface AnimatedIconProps {
  open: boolean;
}

const AnimatedDoubleArrowLeftIcon = styled(DoubleArrowLeftIcon) <AnimatedIconProps>`
  transition: transform 0.5s;
  ${({ open }) => (open ? css`transform: rotate(0deg);` : css`transform: rotate(-180deg);`)};
`;

export const SideLogPanel = () => {
  const { logs } = useEventLogs();
  const formatedLogs = logs.slice(-100); // Limit to last 100 logs

  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <SideLogPanelBox width='300px' height='80%' position='fixed' left='0' top='50%' open={isOpen}>
      <ToggleButton align='center' justify='center' m='2' onClick={() => setIsOpen(!isOpen)}>
        <AnimatedDoubleArrowLeftIcon open={isOpen} />
      </ToggleButton>
      <Flex direction='column' height='100%' gap='2'>
        <Text>Event Logs</Text>
        <Separator orientation='horizontal' size='4' my='2' />
        <Flex direction='column-reverse' mb='4' pr='1' gap='2' align='start' justify='between' overflowY='scroll'>
          {formatedLogs.map(log => {
            const logElement = typeof log.message === 'string'
              ? <Text key={log.id} align='left'>{log.message}</Text>
              : log.message;
            return <LogElementBox key={log.id}>
              <Flex direction='column' gap='1'>
                {logElement}
              </Flex>
            </LogElementBox>;
          })}
        </Flex>
      </Flex>
    </SideLogPanelBox>
  );
};