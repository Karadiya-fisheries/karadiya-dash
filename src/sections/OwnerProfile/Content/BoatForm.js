import * as Yup from "yup";
import { useState } from "react";
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

export default function BoatForm() {
  const navigate = useNavigate();
  const BoatCat = ["IMUL", "NTRB", "MTRB", "IDAY", "NBSB", "OFRP"];

  const FOpType = [
    { label: "One Day", value: "one day" },
    { label: "Multi Day", value: "multi day" },
  ];

  const RegisterSchema = Yup.object().shape({
    BoatName: Yup.string().required("Boat Name required"),
    BoatRg: Yup.string().required("Boat Registraion No required"),
    BoatCat: Yup.string().required("Boat Catagory required"),
    InsuaranceNo: Yup.string().required("Insuarance No required"),
    FOpType: Yup.array().required("Fishery Operation required"),
  });

  const formik = useFormik({
    initialValues: {
      BoatName: "",
      BoatRg: "",
      InsuaranceNo: "",
      BoatCat: "",
      FOpType: [],
    },
    validationSchema: RegisterSchema,
    onSubmit: (data, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
      console.log(data);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formik;

  return (
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
                {...getFieldProps("InsuaranceNo")}
                error={Boolean(touched.InsuaranceNo && errors.InsuaranceNo)}
                helperText={touched.InsuaranceNo && errors.InsuaranceNo}
              />
            </Stack>
          </Box>
          <Box p={2} borderRadius="md" borderWidth="1px">
            <Stack direction={"column"} spacing={4}>
              <FormGroup>
                <FormLabel id="BoatCat">Boat Catagory</FormLabel>
                <RadioGroup
                  aria-labelledby="BoatCat"
                  defaultValue="Supply"
                  name="radio-buttons-group"
                >
                  {BoatCat?.map((boat, index) => (
                    <Field
                      type="radio"
                      name="BoatCat"
                      value={boat}
                      key={index}
                      as={FormControlLabel}
                      control={
                        <Radio checked={values.BoatCat.includes(boat)} />
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
                    type="checkbox"
                    name="FOpType"
                    value={optype.value}
                    key={index}
                    as={FormControlLabel}
                    control={
                      <Checkbox
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
      </Form>
    </FormikProvider>
  );
}
