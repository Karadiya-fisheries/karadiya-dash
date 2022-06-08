import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import AccountSettings from './AccountSettings'
import Actions from './Actions'
import CompanySettings from './CompanySettings'
import Notifications from './Nortifications'
import Signout from './Signout'

const Content = () => {
  const tabs = ['Account Settings', 'Area Settings']

  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: 'translateY(-100px)' }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map(tab => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: 'transparent' }}
              _selected={{ color: 'brand.dark', borderColor: 'brand.blue' }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings />
          </TabPanel>
          <TabPanel>
            <CompanySettings />
          </TabPanel>
          <TabPanel>
            <Notifications />
            
          </TabPanel>
          <TabPanel>
            <Signout />
            
          </TabPanel>
          
        </TabPanels>
      </Tabs>

      <Actions />
    </Box>
  )
}

export default Content
