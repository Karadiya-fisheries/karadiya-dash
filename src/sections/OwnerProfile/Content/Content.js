import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
} from "@chakra-ui/react";

import ProfileForm from "./ProfileForm";
import BoatForm from "./BoatForm";
import BoatCard from "./BoatCard";
import { useEffect, useState } from "react";
import boatService from "../../../services/boat.service";
import ownerService from "../../../services/owner.service";
import authService from "../../../services/auth.service";
import BoatList from "./BoatCard";
import Profile from "./Profile";
import { IconButton } from "@mui/material";

const Content = () => {
  const tabs = ["Profile", "Register A Boat", "Registered Boats"];
  const [owner, setOwner] = useState({
    OwnerId: "",
  });
  const [open, setOpen] = useState(true);

  const uid = authService.getCurrentUser().uid;

  useEffect(() => {
    ownerService.getOwnerById(uid).then((res) => {
      if (res.data.OwnerId) {
        setOwner(res.data);
      }
    });
  }, []);

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
            {!owner.OwnerId || open ? (
              <ProfileForm setOpen={setOpen} data={owner} />
            ) : (
              <Profile setOpen={setOpen} />
            )}
          </TabPanel>
          <TabPanel>
            {/* {boat[0] && (
              <Grid container spacing={3}>
                {boat.map((boat, index) => (
                  <BoatCard key={index} boat={boat} index={index} />
                ))}
              </Grid>
            )} */}
            <BoatForm id={owner.OwnerId} data={owner.boats} />
          </TabPanel>
          <TabPanel>
            <BoatList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Content;
