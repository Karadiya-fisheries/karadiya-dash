import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  useFormik,
  Form,
  FormikProvider,
  useFormikContext,
  Field,
} from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, Box } from "@chakra-ui/react";
import {
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import OwnerService from "../../../services/owner.service";
import activityService from "../../../services/activity.service";
import authService from "../../../services/auth.service";

// ----------------------------------------------------------------------

export default function ProfileForm({ owner }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const BoatCat = ["IMUL", "NTRB", "MTRB", "IDAY", "NBSB", "OFRP"];
  const FZone = [
    { label: "Internal waters", value: "internal waters" },
    { label: "Territorial Sea", value: "territorial sea" },
    { label: "Contiguous Zone", value: "contiguous zone" },
    { label: "Economic Zone", value: "conomic zone" },
    { label: "Continental Shelf", value: "continental shelf" },
    { label: "High Seas and Deep Ocean", value: "high and deep" },
  ];
  const FOpType = [
    { label: "One Day", value: "one day" },
    { label: "Multi Day", value: "multi day" },
  ];

  const OccuType = [
    { label: "Full Time", value: "full time" },
    { label: "Part Time", value: "part time" },
  ];
  const AssocAct = [
    { label: "Supply", value: "supply" },
    { label: "Catch", value: "catch" },
  ];

  const RegisterSchema = Yup.object().shape({
    FIDivision: Yup.string().required("Fishery Division required"),
    GNDivision: Yup.string().required("GN Division required"),
    FDistrict: Yup.string().required("Fishery District required"),
    DSDivision: Yup.string().required("Divisional Secretariat required"),
    Surname: Yup.string().required("Surname required"),
    NicNo: Yup.string().min(10, "Not Complete").required("NicNo required"),
    FZone: Yup.array().required("Fishery Zone required"),
    BoatCat: Yup.array().min(1, "Select atleast One type"),
    NumofBoats: Yup.number().required("Number of boats required"),
    OccuType: Yup.string().required("Occupation Type required"),
    FOpType: Yup.array().required("Fishery Operation required"),
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
      FZone: [],
      BoatCat: [],
      NumofBoats: "",
      OccuType: "",
      FOpType: [],
      AssocAct: "",
    },
    onSubmit: (data, actions) => {
      const uid = authService.getCurrentUser().uid;
      const owner = { ...data, uid };
      OwnerService.createOwner(owner)
        .then((res) => {
          activityService
            .createActivity({
              uid: res.data.userUid,
              ActivityTitle: "Profile Submission ID(#" + res.data.userUid + ")",
            })
            .catch((err) => {
              setMessage(err.message);
            });
        })
        .catch((err) => {
          setMessage(err.message);
        });
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 5000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formik;

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
                {...getFieldProps("NumofBoats")}
                error={Boolean(touched.NumofBoats && errors.NumofBoats)}
                helperText={touched.NumofBoats && errors.NumofBoats}
              />
              <FormGroup>
                <FormLabel>Catagories of Boats</FormLabel>
                <Stack direction={"row"} spacing={2}>
                  {BoatCat?.map((name, index) => (
                    <Field
                      type="checkbox"
                      name="BoatCat"
                      value={name}
                      key={index}
                      as={FormControlLabel}
                      control={
                        <Checkbox checked={values.BoatCat.includes(name)} />
                      }
                      label={name}
                    />
                  ))}
                </Stack>
              </FormGroup>
              <FormGroup>
                <FormLabel>Fishing Zone</FormLabel>
                {FZone?.map((name, index) => (
                  <Field
                    type="checkbox"
                    name="FZone"
                    value={name.value}
                    key={index}
                    as={FormControlLabel}
                    control={
                      <Checkbox checked={values.FZone.includes(name.value)} />
                    }
                    label={name.label}
                  />
                ))}
              </FormGroup>

              <FormGroup>
                <FormLabel id="FOpType">Nature of Fishing Operation</FormLabel>
                <RadioGroup
                  aria-labelledby="FOpType"
                  defaultValue="Multi Day"
                  name="radio-buttons-group"
                >
                  {FOpType?.map((name, index) => (
                    <Field
                      type="radio"
                      name="FOpType"
                      value={name.value}
                      key={index}
                      as={FormControlLabel}
                      control={
                        <Radio checked={values.FOpType.includes(name.value)} />
                      }
                      label={name.label}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>
              <FormGroup>
                <FormLabel id="OccuType">Nature of Occupation</FormLabel>
                <RadioGroup
                  aria-labelledby="OccuType"
                  defaultValue="Part Time"
                  name="radio-buttons-group"
                >
                  {OccuType?.map((name, index) => (
                    <Field
                      type="radio"
                      name="OccuType"
                      value={name.value}
                      key={index}
                      as={FormControlLabel}
                      control={
                        <Radio checked={values.OccuType.includes(name.value)} />
                      }
                      label={name.label}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>
              <FormGroup>
                <FormLabel id="AssocAct">
                  Associate Occupational Activites
                </FormLabel>
                <RadioGroup
                  aria-labelledby="AssocAct"
                  defaultValue="Supply"
                  name="radio-buttons-group"
                >
                  {AssocAct?.map((name, index) => (
                    <Field
                      type="radio"
                      name="AssocAct"
                      value={name.value}
                      key={index}
                      as={FormControlLabel}
                      control={
                        <Radio checked={values.AssocAct.includes(name.value)} />
                      }
                      label={name.label}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>
            </Stack>
          </Box>
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
      {message && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      )}
    </FormikProvider>
  );
}
