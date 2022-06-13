import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import EditProfile from "../EditProfile/Editprofile";
import { Link } from "react-router-dom";

function Actions() {
  const [compIsShown, setCompIsShown] = useState(false);

  return (
    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
      <Link to="/dashboard/editprofile">
        <Button onClick={() => setCompIsShown(true)}>Update</Button>
        {compIsShown && <EditProfile />}
      </Link>
    </Box>
  );
}

export default Actions;
