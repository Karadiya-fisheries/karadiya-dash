import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider, Field } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, Box } from "@chakra-ui/react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Alert,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import BoatCard from "./BoatCard";
import Iconify from "../../../components/Iconify";
import boatService from "../../../services/boat.service";
import activityService from "../../../services/activity.service";
import authService from "../../../services/auth.service";

// ----------------------------------------------------------------------

export default function BoatForm({ id, data }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [sopen, setSopen] = useState(false);
  const BoatType = ["IMUL", "NTRB", "MTRB", "IDAY", "NBSB", "OFRP"];

  const FOpType = [
    { label: "One Day", value: "one day" },
    { label: "Multi Day", value: "multi day" },
  ];

  const RegisterSchema = Yup.object().shape({
    BoatName: Yup.string().required("Boat Name required"),
    BoatRg: Yup.string().required("Boat Registraion No required"),
    BoatType: Yup.string().required("Boat Catagory required"),
    InsuaranceNO: Yup.string().required("Insuarance No required"),
    FOpType: Yup.array().required("Fishery Operation required"),
  });

  const formik = useFormik({
    initialValues: {
      BoatName: "",
      BoatRg: "",
      InsuaranceNO: "",
      BoatType: "",
      FOpType: "",
    },
    onSubmit: (data, actions) => {
      const owner_id = id;
      const boat = { ...data, owner_id };
      const uid = authService.getCurrentUser().uid;
      boatService
        .createBoat(boat)
        .then((res) => {
          activityService
            .createActivity({
              uid: uid,
              ActivityTitle:
                "Submitted A Boat's Details ID(#" + res.data.boatId + ")",
            })
            .catch((err) => setMessage(err.message));
          setSopen(true);
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
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box p={2} borderRadius="md" borderWidth="1px">
              <Stack direction={"column"} spacing={4}>
                <TextField
                  fullWidth
                  label="Boat Name"
                  {...getFieldProps("BoatName")}
                  error={Boolean(touched.BoatName && errors.BoatName)}
                  helperText={touched.BoatName && errors.BoatName}
                />

                <TextField
                  fullWidth
                  label="Boat Registration No"
                  {...getFieldProps("BoatRg")}
                  error={Boolean(touched.BoatRg && errors.BoatRg)}
                  helperText={touched.BoatRg && errors.BoatRg}
                />

                <TextField
                  fullWidth
                  label="Insuarance NO"
                  {...getFieldProps("InsuaranceNO")}
                  error={Boolean(touched.InsuaranceNO && errors.InsuaranceNO)}
                  helperText={touched.InsuaranceNO && errors.InsuaranceNO}
                />
              </Stack>
            </Box>
            <Box p={2} borderRadius="md" borderWidth="1px">
              <Stack direction={"column"} spacing={4}>
                <FormGroup>
                  <FormLabel id="BoatType">Boat Catagory</FormLabel>
                  <RadioGroup
                    aria-labelledby="BoatType"
                    defaultValue="Supply"
                    name="radio-buttons-group"
                  >
                    {BoatType?.map((boat, index) => (
                      <Field
                        type="radio"
                        name="BoatType"
                        value={boat}
                        key={index}
                        as={FormControlLabel}
                        control={
                          <Radio checked={values.BoatType.includes(boat)} />
                        }
                        label={boat}
                      />
                    ))}
                  </RadioGroup>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Nature of Fishing Operation</FormLabel>
                  {FOpType?.map((optype, index) => (
                    <Field
                      type="radio"
                      name="FOpType"
                      value={optype.value}
                      key={index}
                      as={FormControlLabel}
                      control={
                        <Radio
                          checked={values.FOpType.includes(optype.value)}
                        />
                      }
                      label={optype.label}
                    />
                  ))}
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
          {message && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {message}
            </Alert>
          )}

          {sopen && (
            <Alert severity="success" sx={{ width: "100%" }}>
              Boat Successfully Created!
            </Alert>
          )}
        </Form>
      </FormikProvider>
    </>
  );
}
