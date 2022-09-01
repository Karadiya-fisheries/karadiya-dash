import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { styled as MuiStyle } from "@mui/material/styles";
import StorageService from "../../../firebase/upload";
// material
import {
  Stack,
  TextField,
  Typography,
  Paper,
  Container,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Alert,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { LoadingButton } from "@mui/lab";
// components
import Page from "../../../components/Page";
import CatchList from "./CatchList";
import Iconify from "../../../components/Iconify";
import authService from "../../../services/auth.service";
import triplogService from "../../../services/triplog.service";
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
        <Typography variant="h4" gutterBottom>
          Generate An Auction Lot
        </Typography>
        <CatchList catchRecords={tripLog.CatchRecords} />
      </Container>
    </Page>
  );
}
