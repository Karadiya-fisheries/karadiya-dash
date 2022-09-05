import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Stack,
  Typography,
  CardContent,
  ownerDocument,
} from "@mui/material";
// utils
import { fDate, fToNow } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import { isToday } from "date-fns";
//
import SvgIconStyle from "../../../components/SvgIconStyle";
import Iconify from "../../../components/Iconify";
import { useEffect, useState } from "react";
import ownerService from "../../../services/owner.service";
import authService from "../../../services/auth.service";

// ----------------------------------------------------------------------

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

// ----------------------------------------------------------------------

const BoatCard = ({ boat, index }) => {
  const { boatId, BoatName, InsuaranceNO, FOpType, BoatRg, createdAt } = boat;

  return (
    <Card
      sx={{ position: "relative", backgroundColor: "#D1E9FC", boxShadow: 4 }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: "text.disabled", display: "block" }}
        >
          {fDate(createdAt)}
        </Typography>

        <Typography color="inherit" variant="subtitle2" underline="hover">
          BoatName: {BoatName} #{boatId}
        </Typography>
        <Stack>
          <Typography
            color="inherit"
            paragraph="true"
            variant="subtitle2"
            underline="hover"
          >
            Registration NO: {BoatRg}
          </Typography>
          <Typography
            color="inherit"
            paragraph="true"
            variant="subtitle2"
            underline="hover"
          >
            Insuarance No: {InsuaranceNO}
          </Typography>
          <Typography
            color="inherit"
            paragraph="true"
            variant="subtitle2"
            underline="hover"
          >
            Fishing Operation Type: {FOpType}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function BoatList() {
  const [boatlist, setBoatlist] = useState([]);
  const uid = authService.getCurrentUser().uid;
  useEffect(() => {
    ownerService.getOwnerById(uid).then((value) => {
      console.log(value);
      setBoatlist(value.data.boats);
    });
  }, []);

  return (
    <Box>
      {boatlist.map((boat, index) => (
        <BoatCard key={index} boat={boat} />
      ))}
    </Box>
  );
}
