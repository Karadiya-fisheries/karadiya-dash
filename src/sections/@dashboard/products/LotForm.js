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
  Box,
  Grid,
  Slider,
  Input,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/Iconify";
import LotService from "../../../services/lot.service";
import authService from "../../../services/auth.service";
import activityService from "../../../services/activity.service";
import triplogService from "../../../services/triplog.service";
import moment from "moment";

const SliderInput = styled(Input)`
  width: 42px;
`;

// ----------------------------------------------------------------------

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#d7e0e0";
};

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: ${(props) => getColor(props)};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export default function LotForm({ load, catchId }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const [copen, setCopen] = useState(false);
  const [cover, setCover] = useState(null);

  const uid = authService.getCurrentUser().uid;
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const [value, setValue] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const formik = useFormik({
    initialValues: {
      LotTitle: load.FishType + " - " + load.FishSubType,
      LotCover: "",
      LotUnitPrice: "",
      LotSize: "",
      CurrentBid: "",
      LotStartDate: "",
      LotEndDate: "",
    },
    enableReinitialize: true,
    onSubmit: (data, actions) => {
      if (!cover) {
        setCopen(!copen);
        actions.setSubmitting(false);
        return null;
      }

      setTimeout(() => {
        actions.setSubmitting(false);
      }, 10000);
      LotService.createNotice({
        LotTitle: data.LotTitle,
        LotCover: data.LotCover,
        LotUnitPrice: data.LotUnitPrice,
        LotSize: data.LotSize,
        CurrentBid: data.CurrentBid,
        LotStartDate: data.LotStartDate,
        LotEndDate: data.LotEndDate,
        CatchId: catchId,
      })
        .then(
          (lot) => {
            setMessage("Auction Lot created successfull!");
            StorageService.lotCoverUploadHandler(lot.data.LotId, cover);
            activityService
              .createActivity({
                uid: uid,
                ActivityTitle: "Placed a Auction Lot(#" + lot.data.LotId + ")",
              })
              .catch((err) => setMessage(err.message));
            navigate("/dashboard/auction", {
              replace: true,
            });
          },
          (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(message);
          }
        )
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setCover(acceptedFiles[0]);
    },
    maxFiles: 1,
    noClick: true,
  });

  return (
    <Container>
      <Typography variant="subtitle1" gutterBottom>
        {load.FishType} - {load.FishSubType}
      </Typography>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth="true"
                required="true"
                label="Unit Price"
                variant="standard"
                {...getFieldProps("LotUnitPrice")}
              />

              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography id="input-slider" gutterBottom>
                    Lot Size
                  </Typography>
                  <Slider
                    value={typeof value === "number" ? value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <SliderInput
                    required={true}
                    value={value}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: load.Weight,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>

              <ImageContainer
                {...getRootProps({ isDragAccept, isFocused, isDragReject })}
              >
                <input {...getInputProps()} />
                <Typography paragraph>
                  Drag and drop to upload Cover Image here, or click to select
                  Image
                </Typography>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="upload picture"
                  component="label"
                  onClick={open}
                >
                  <PhotoCamera fontSize="inherit" />
                </IconButton>
              </ImageContainer>

              <DateTimePicker
                label="Auction Start Date and Time"
                value={startDate}
                onChange={(value) => {
                  setStartDate(value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <DateTimePicker
                label="Auction End Date and Time"
                value={endDate}
                onChange={(value) => {
                  setEndDate(value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Create
              </LoadingButton>
            </Stack>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {message && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      )}
      <Dialog
        open={copen}
        onClose={() => {
          setCopen(!copen);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you don't add cover image to your post, System will show standard
            image accordingly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCover("auto");
              setCopen(!copen);
            }}
          >
            Skip
          </Button>
          <Button
            onClick={() => {
              setCopen(!copen);
            }}
            autoFocus
          >
            Add cover
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
