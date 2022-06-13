import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, Box } from "@chakra-ui/react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    FIDivision: Yup.string().required("Fishery Division required"),
    GNDivision: Yup.string().required("GN Division required"),
    FDistrict: Yup.string().required("Fishery District required"),
    DSDivision: Yup.string().required("Divisional Secretariat required"),
    Surname: Yup.string().required("Surname required"),
    NicNo: Yup.string().min(10, "Not Complete").required("NicNo required"),
  });

  const formik = useFormik({
    initialValues: {
      FIDivision: "",
      GNDivision: "",
      DSDivision: "",
      FDistrict: "",
      Surname: "",
      OtherNames: "",
      NicNo: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Fishery Inspector Division"
            {...getFieldProps("FIDivision")}
            error={Boolean(touched.FIDivision && errors.FIDivision)}
            helperText={touched.FIDivision && errors.FIDivision}
          />

          <TextField
            fullWidth
            label="GN Division"
            {...getFieldProps("GNDivision")}
            error={Boolean(touched.GNDivision && errors.GNDivision)}
            helperText={touched.GNDivision && errors.GNDivision}
          />

          <TextField
            fullWidth
            label="Divisional Secretariat Division"
            {...getFieldProps("DSDivision")}
            error={Boolean(touched.DSDivision && errors.DSDivision)}
            helperText={touched.DSDivision && errors.DSDivision}
          />
          <TextField
            fullWidth
            label="Fishery District"
            {...getFieldProps("FDistrict")}
            error={Boolean(touched.FDistrict && errors.FDistrict)}
            helperText={touched.FDistrict && errors.FDistrict}
          />
          <TextField
            fullWidth
            label="Surname"
            {...getFieldProps("Surname")}
            error={Boolean(touched.Surname && errors.Surname)}
            helperText={touched.Surname && errors.Surname}
          />
          <TextField
            fullWidth
            label="Other Names"
            {...getFieldProps("OtherNames")}
            error={Boolean(touched.OtherNames && errors.OtherNames)}
            helperText={touched.OtherNames && errors.OtherNames}
          />
          <TextField
            fullWidth
            label="NIC Number"
            {...getFieldProps("NicNo")}
            error={Boolean(touched.NicNo && errors.NicNo)}
            helperText={touched.NicNo && errors.NicNo}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
