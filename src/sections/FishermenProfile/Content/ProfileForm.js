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
import FishermenService from "../../../services/fishermen.service";
// ----------------------------------------------------------------------

export default function ProfileForm({id}) {
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
    NumOfBoats: Yup.number().required("Number of boats required"),
    OccuType: Yup.string().required("Occupation Type required"),
    FOpType: Yup.array().required("Fishery Operation required"),
    AssocAct: Yup.string().required("Associate Occupation required"),
  });

  useEffect(() => {
    console.log(id);
    setLog({
      FIDivision: id.FIDivision,
      GNDivision: id.GNDivision,
      DSDivision: id.DSDivision,
      FDistrict: id.FDistrict,
      Surname: id.Surname,
      OtherNames: id.OtherNames,
      NicNo: id.NicNo,
      NumOfBoats: id.NumOfBoats,
      // HookNo: id.HookNo,
      // HookType: id.HookType,
      // Depth: id.Depth,
      // Bait: id.Bait,
      // CatchRecords: id.CatchRecords,
    });
    console.log(log);
  }, []);

  // useEffect(() => {
  //   FishermenService.getFishermens().then((fishermens) => {
  //     console.log(fishermens);
  //     const userlist = fishermens.data.map((fishermen, index) => ({
  //       FIDivision: fishermen.FIDivision,
  //       GNDivision: fishermen.GNDivision,
  //       DSDivision: fishermen.DSDivision,
  //       FDistrict: fishermen.FDistrict,
  //       Surname: fishermen.Surname,
  //       OtherNames: fishermen.OtherNames,
  //       NicNo: fishermen.NicNo,
  //       NumOfBoats: fishermen.NumOfBoats,
  //       //status: sample(["viewed", "modified", "submitted"]),
  //       record: fishermen,
  //     }));
  //     setUserList(userlist);
  //   });
  // }, []);

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

  


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } = formik;

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
