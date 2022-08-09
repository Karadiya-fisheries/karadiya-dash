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
} from "@mui/material";
// utils
import { fDate, fToNow } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import { isToday } from "date-fns";
//
import SvgIconStyle from "../../../components/SvgIconStyle";
import Iconify from "../../../components/Iconify";
import { useState } from "react";

// ----------------------------------------------------------------------

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

// ----------------------------------------------------------------------

BoatCard.propTypes = {
  boat: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BoatCard({ boat, index }) {
  const { boatId, BoatName, BoatCat, BoatRg, createdAt } = boat;

  return (
    <Grid item xs={12}>
      <Card sx={{ position: "relative" }}>
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
            <Typography color="inherit" paragraph="true" underline="hover">
              BoatCatagory: {BoatCat}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
