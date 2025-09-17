import { Flex, Separator } from "@radix-ui/themes";
import NPCList from "./NPCList";
import ActivitiesList from "./ActivitiesList";
import Ship from "./Ship";
import EndOfDayDialog from "./EndOfDayDialog";
import { SideLogPanel } from "./SideLogPanel";

function Dashboard() {
  return <>
    <EndOfDayDialog />
    <SideLogPanel />
    <Flex width='100%' direction='column' align='center' justify='center' gap='6' p='6'>
      <Flex height='100%' gap='9' align='start' >
        <NPCList />
        <Separator orientation="vertical" size='4' />
        <Ship />
      </Flex>
      <Separator size='4' />
      <ActivitiesList />
    </Flex>
  </>
}

export default Dashboard;