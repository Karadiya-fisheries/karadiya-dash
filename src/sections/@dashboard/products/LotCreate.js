import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// material
import {
  Typography,
  Container,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
// components
import Page from "../../../components/Page";
import CatchList from "./CatchList";
import Iconify from "../../../components/Iconify";
import authService from "../../../services/auth.service";
import triplogService from "../../../services/triplog.service";
import { Link as RouterLink } from "react-router-dom";
// ----------------------------------------------------------------------

export default function LotCreate() {
  const navigate = useNavigate();
  const { tid } = useParams();
  const [tripLog, setTripLog] = useState({ CatchRecords: [] });

  const uid = authService.getCurrentUser().uid;

  useEffect(() => {
    triplogService.getTripLogById(tid).then((trip) => {
      setTripLog(trip.data);
    });
  }, []);

  return (
    <Page title="Dashboard: Auction Lot Generate">
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Generate Auction Lots from The Fishing Trip
          </Typography>
          <IconButton
            color="primary"
            sx={{ border: "1px solid", m: 1, borderRadius: 2 }}
            component={RouterLink}
            to={"/dashboard/auction"}
          >
            <LocalMallIcon />
            <Typography varient="subtitle2">Go To Auction</Typography>
          </IconButton>
        </Stack>
        <Divider />
        <CatchList catchRecords={tripLog.CatchRecords} />
      </Container>
    </Page>
  );
}
