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

interface AnimatedIconProps {
  open: boolean;
}

const AnimatedDoubleArrowLeftIcon = styled(DoubleArrowLeftIcon) <AnimatedIconProps>`
  transition: transform 0.5s;
  ${({ open }) => (open ? css`transform: rotate(0deg);` : css`transform: rotate(-180deg);`)};
`;

export const SideLogPanel = () => {
  const { logs } = useEventLogs();

  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <SideLogPanelBox width='300px' height='80%' position='fixed' left='0' top='50%' open={isOpen}>
      <ToggleButton align='center' justify='center' m='2' onClick={() => setIsOpen(!isOpen)}>
        <AnimatedDoubleArrowLeftIcon open={isOpen} />
      </ToggleButton>
      <Flex direction='column' mb='w4' align='start' justify='between'>
        <Text>Event Logs</Text>
        <Separator orientation='horizontal' size='4' my='2' />
        {logs.map(log => {
          if (typeof log.message === 'string') {
            return <Text key={log.id} align='left'>{log.message}</Text>;
          } else {
            return log.message;
          }
        })}
      </Flex>
    </SideLogPanelBox>
  );
};