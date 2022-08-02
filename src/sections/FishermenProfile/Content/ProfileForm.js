import * as Yup from "yup";
import { useState, useEffect } from "react";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
// ----------------------------------------------------------------------

export default function ProfileForm({ id }) {
  const [USERLIST, setUserList] = useState([]);
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
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
    { label: "Full Time", value: "Full Time" },
    { label: "Part Time", value: "Part Time" },
  ];
  const AssocAct = [
    { label: "Supply", value: "Supply" },
    { label: "Catch", value: "Catch" },
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
    NumOfBoats: Yup.number().required("Number of boats required"),
    OccuType: Yup.string().required("Occupation Type required"),
    FOpType: Yup.array().required("Fishery Operation required"),
    AssocAct: Yup.string().required("Associate Occupation required"),
  });

  useEffect(() => {
    // console.log(id);
    setLog({
      FIDivision: id.FIDivision,
      GNDivision: id.GNDivision,
      DSDivision: id.DSDivision,
      FDistrict: id.FDistrict,
      Surname: id.Surname,
      OtherNames: id.OtherNames,
      NicNo: id.NicNo,
      NumOfBoats: id.NumOfBoats,
      FZone: id.FZone,
      BoatCat: id.BoatCat,
      OccuType: id.OccuType,
      FOpType: id.FOpType,
      AssocAct: id.AssocAct,
    });
    console.log(log);
  }, []);

  const formik = useFormik({
    initialValues: log,
    enableReinitialize: true,
    validationSchema: RegisterSchema,
    onSubmit: (id, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
      console.log(id);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
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
                {...getFieldProps("NumOfBoats")}
                error={Boolean(touched.NumOfBoats && errors.NumOfBoats)}
                helperText={touched.NumOfBoats && errors.NumOfBoats}
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
                      control={<Checkbox {...getFieldProps("BoatCat")} />}
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
                    control={<Checkbox {...getFieldProps("FZone")} />}
                    label={name.label}
                  />
                ))}
              </FormGroup>
              <FormGroup>
                <FormLabel>Nature of Fishing Operation</FormLabel>
                {FOpType?.map((name, index) => (
                  <Field
                    type="checkbox"
                    name="FOpType"
                    value={name.value}
                    key={index}
                    as={FormControlLabel}
                    control={<Checkbox {...getFieldProps("FOpType")} />}
                    label={name.label}
                  />
                ))}
              </FormGroup>
              <FormGroup>
                <FormLabel id="OccuType">Nature of Occupation</FormLabel>
                <RadioGroup
                  aria-labelledby="OccuType"
                  defaultValue="Part Time"
                  name="radio-buttons-group"
                  onChange={(event) => {
                    setFieldValue("OccuType", event.currentTarget.value);
                  }}
                >
                  {OccuType?.map((name, index) => (
                    <Field
                      type="radio"
                      name="OccuType"
                      value={name.value}
                      key={index}
                      as={FormControlLabel}
                      control={<Radio />}
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
                  value={id.AssocAct}
                  name="radio-buttons-group"
                  onChange={(event) => {
                    setFieldValue("AssocAct", event.currentTarget.value);
                  }}
                >
                  {AssocAct?.map((name, index) => (
                    <Field
                      type="radio"
                      name="AssocAct"
                      value={name.value}
                      key={index}
                      as={FormControlLabel}
                      control={<Radio />}
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
    </FormikProvider>
  );
}
