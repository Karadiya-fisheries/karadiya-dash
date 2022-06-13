import { Stack, Box } from "@chakra-ui/react";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import OwnerService from "../../../services/owner.service";
import {
  TextField,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Checkbox,
  FormLabel,
  Typography,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
function ProfileForm() {
  // const [owner, setOwner] = useState(null);
  // const [inital, setInital] = useState(null);
  // const user = AuthService.getCurrentUser();
  // useEffect(() => {
  //   setOwner(OwnerService.getOwnerById(user.uid));
  //   if (owner === null) {
  //     setInital({
  //       FIDivision: "",
  //       GNDivision: "",
  //       DSDivision: "",
  //       FDistrict: "",
  //       Surname: "",
  //       OtherNames: "",
  //       NicNo: "",
  //       FZone: "",
  //       BoatCat: "",
  //       NumOfBoats: "",
  //       OccuType: "",
  //       FOpType: "",
  //       AssocAct: "",
  //     });
  //   } else {
  //     setInital({
  //       FIDivision: owner.FIDivision,
  //       GNDivision: owner.GNDivision,
  //       DSDivision: owner.DSDivision,
  //       FDistrict: owner.FDistrict,
  //       Surname: owner.Surname,
  //       OtherNames: owner.OtherNames,
  //       NicNo: owner.NicNo,
  //       FZone: owner.FZone,
  //       BoatCat: owner.BoatCat,
  //       NumOfBoats: owner.NumOfBoats,
  //       OccuType: owner.OccuType,
  //       FOpType: owner.FOpType,
  //       AssocAct: owner.AssocAct,
  //     });
  //   }
  // }, []);

  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    FIDivision: Yup.string().required("Fishery Division required"),
    GNDivision: Yup.string().required("GN Division required"),
    FDistrict: Yup.string().required("Fishery District required"),
    DSDivision: Yup.string().required("Divisional Secretariat required"),
    Surname: Yup.string().required("Surname required"),
    NicNo: Yup.string().min(10, "Not Complete").required("NicNo required"),
    FZone: Yup.string().required("Fishery Zone required"),
    BoatCat: Yup.array().min(1, "Select atleast One type"),
    NumOfBoats: Yup.number().required("Number of boats required"),
    OccuType: Yup.string().required("Occupation Type required"),
    FOpType: Yup.string().required("Fishery Operation required"),
    AssocAct: Yup.string().required("Associate Occupation required"),
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
      FZone: "",
      BoatCat: "",
      NumOfBoats: "",
      OccuType: "",
      FOpType: "",
      AssocAct: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      console.log("hello sub");
      console.log(data);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    handleChange,
    handleBlur,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box p={2} borderRadius="md" borderWidth="1px">
            <Typography mb={2} variant="subtitle1">
              Fishery Zone Details
            </Typography>
            <Stack direction={"column"} spacing={4}>
              <TextField
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                label="Fishery Inspector Division"
                {...getFieldProps("FIDivision")}
                error={Boolean(touched.FIDivision && errors.FIDivision)}
                helperText={touched.FIDivision && errors.FIDivision}
              />

              <TextField
                fullWidth
                label="GN Division"
                onChange={handleChange}
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
            </Stack>
          </Box>
          <Box p={2} borderRadius="md" borderWidth="1px">
            <Typography mb={2} variant="subtitle1">
              Personal Details
            </Typography>
            <Stack direction={"column"} spacing={4}>
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
          </Box>
          <Box p={2} borderRadius="md" borderWidth="1px">
            <Typography mb={2} variant="subtitle1">
              Fishing Details
            </Typography>
            <Stack direction={"column"} spacing={4}>
              <TextField
                fullWidth
                label="Number of Boats"
                {...getFieldProps("NumOfBoats")}
                error={Boolean(touched.NumOfBoats && errors.NumOfBoats)}
                helperText={touched.NumOfBoats && errors.NumOfBoats}
              />
            </Stack>
          </Box>
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          onSubmit={handleSubmit}
          variant="contained"
          loading={isSubmitting}
        >
          Save
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default ProfileForm;
