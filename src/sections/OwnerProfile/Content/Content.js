import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import ProfileForm from "./ProfileForm";
import BoatForm from "./BoatForm";
import { useEffect, useState } from "react";
import boatService from "../../../services/boat.service";
import ownerService from "../../../services/owner.service";
import authService from "../../../services/auth.service";

const Content = () => {
  const tabs = ["Profile", "Registered Boats"];
  const [boats, setBoats] = useState([]);
  const uid = authService.getCurrentUser().uid;

  useEffect(() => {
    ownerService.getOwnerById(uid).then((res) => {
      setBoats(res.data);
    });
  }, []);

  console.log(boats);

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
      shadow={"md"}
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: "translateY(-100px)" }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{ color: "brand.dark", borderColor: "brand.blue" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <ProfileForm owner={boats} />
          </TabPanel>
          <TabPanel>
            <BoatForm id={boats.OwnerId} boat={boats.boats} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Content;
