import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material

import { Stack, TextField, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import NoticeService from "../../../services/auth.service";
import authService from "../../../services/auth.service";

// ----------------------------------------------------------------------

export default function BlogCreate() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      NoticeTitle: "",
      NoticeCover: "",
      NoticeCat: "",
      NoticeText: "",
    },
    onSubmit: (data) => {
      NoticeService.createNotice(
        authService.getCurrentUser().user.uid,
        data.NoticeTitle,
        data.NoticeCover,
        data.NoticeCat,
        data.NoticeText,
        0
      )
        .then(
          () => {
            navigate("/dashboard/notice", { replace: true });
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Notice Title"
            {...getFieldProps("NoticeTitle")}
          />

          <TextField
            id="standard-textarea"
            label="Text Content"
            placeholder="Write here..."
            {...getFieldProps("NoticeText")}
            multiline
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
  );
}
