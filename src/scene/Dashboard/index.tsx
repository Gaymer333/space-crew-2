import { Flex, Separator } from "@radix-ui/themes";
import NPCList from "./NPCList";
import ActivitiesList from "./ActivitiesList";


function Dashboard() {
  return <Flex direction='column' align='center' justify='center' gap='6' p='6'>
    <NPCList />
    <Separator />
    <ActivitiesList />
  </Flex>
}

export default Dashboard;