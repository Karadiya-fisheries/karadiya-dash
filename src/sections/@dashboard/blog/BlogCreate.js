import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
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
import Iconify from "../../../components/Iconify";
import NoticeService from "../../../services/notice.service";
import authService from "../../../services/auth.service";
import activityService from "../../../services/activity.service";

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

const RegisterStyle = MuiStyle(Paper)(({ theme }) => ({
  maxWidth: 640,
  padding: theme.spacing(2, 2),
  alignItems: "center",
  justifyContent: "space-between",
  mb: 5,
}));

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

export default function BlogCreate() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const [copen, setCopen] = useState(false);
  const [cover, setCover] = useState(null);

  const formik = useFormik({
    initialValues: {
      NoticeTitle: "",
      NoticeCat: "",
      NoticeText: "",
    },
    onSubmit: (data, actions) => {
      if (!cover) {
        setCopen(!copen);
        actions.setSubmitting(false);
        return null;
      }

      setTimeout(() => {
        actions.setSubmitting(false);
      }, 10000);
      const uid = authService.getCurrentUser().uid;
      NoticeService.createNotice({
        uid: uid,
        NoticeTitle: data.NoticeTitle,
        NoticeCat: data.NoticeCat,
        NoticeText: data.NoticeText,
        NoticeView: 0,
      })
        .then(
          (notice) => {
            setMessage("Notice created successfull!");
            StorageService.noticeCoverUploadHandler(
              notice.data.NoticeId,
              cover
            );
            activityService
              .createActivity({
                uid: uid,
                ActivityTitle:
                  "Created a Notice(#" + notice.data.NoticeId + ")",
              })
              .catch((err) => setMessage(err.message));
            navigate("/dashboard/notices", {
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
    <Page title="Dashboard: Notices">
      <Container>
        <Typography variant="h4" gutterBottom>
          Create A Notice
        </Typography>
        <RegisterStyle>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth="true"
                  required="true"
                  autoComplete="username"
                  type="email"
                  label="Title"
                  variant="standard"
                  {...getFieldProps("NoticeTitle")}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Catagory
                  </InputLabel>
                  <Select
                    required="true"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    {...getFieldProps("NoticeCat")}
                    label="Catagory"
                  >
                    <MenuItem value={"Notice"}>Notice</MenuItem>
                    <MenuItem value={"Article"}>Article</MenuItem>
                  </Select>
                </FormControl>
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

                <TextField
                  fullwidth="true"
                  required="true"
                  id="standard-textarea"
                  label="Text Content"
                  placeholder="Write here..."
                  {...getFieldProps("NoticeText")}
                  multiline
                  rows={10}
                  variant="standard"
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
                If you don't add cover image to your post, System will show
                standard image accordingly.
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
        </RegisterStyle>
      </Container>
    </Page>
  );
}
