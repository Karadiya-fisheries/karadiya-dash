import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Typography,
  Fab,
  Divider,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../components/Iconify";
import TripLogService from "../../services/triplog.service";

// ----------------------------------------------------------------------

export default function DepartureForm({ id }) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [log, setLog] = useState(null);
  const RegisterSchema = Yup.object().shape({
    Harbor: Yup.string().required("Boat Name required"),
    BoatRg: Yup.string().required("Boat Registraion No required"),
    BoatCat: Yup.string().required("Boat Catagory required"),
    InsuaranceNo: Yup.string().required("Insuarance No required"),
    FOpType: Yup.array().required("Fishery Operation required"),
  });

  useEffect(() => {
    console.log(id);
    setLog({
      Harbor: id.Harbor,
      SkipperID: id.SkipperID,
      WesselID: id.WesselID,
      DepartureDate: id.DepartureDate,
      DepartureTime: id.DepartureTime,
      GearType: id.GearType,
      MainLine: id.MainLine,
      BranchLine: id.Branch,
      HookNo: id.HookNo,
      HookType: id.HookType,
      Depth: id.Depth,
      Bait: id.Bait,
      CatchRecords: id.CatchRecords,
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack direction="column" justifyContent="space-between" spacing={3}>
            <Typography variant="h4" gutterBottom>
              ELogBook Record No.{id.tripId}
            </Typography>
            <Divider />
            <Box>
              <Fab
                sx={{ m: 3, alignSelf: "right" }}
                onClick={() => {
                  setEdit(!edit);
                }}
                color={edit ? "default" : "primary"}
                aria-label="edit"
              >
                <EditIcon />
              </Fab>
            </Box>
            <Box p={2} border="1px solid #E2E8F0" borderRadius={1}>
              <Typography mb={2} variant="subtitle1">
                Departure Details
              </Typography>
              <Stack direction={"column"} spacing={4}>
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Wessel ID"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("WesselID")}
                    error={Boolean(touched.WesselID && errors.WesselID)}
                    helperText={touched.WesselID && errors.WesselID}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Skipper ID"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("SkipperID")}
                    error={Boolean(touched.SkipperID && errors.SkipperID)}
                    helperText={touched.SkipperID && errors.SkipperID}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="Harbor"
                  InputLabelProps={{ shrink: true }}
                  disabled={edit}
                  {...getFieldProps("Harbor")}
                  error={Boolean(touched.Harbor && errors.Harbor)}
                  helperText={touched.Harbor && errors.Harbor}
                />
                <DesktopDatePicker
                  label="Departure Date"
                  inputFormat="yyyy-MM-dd"
                  {...getFieldProps("DepartureDate")}
                  renderInput={(params) => <TextField {...params} />}
                />

                {/* <TimePicker
                  label="Departure Time"
                  inputFormat="h:m:s"
                  {...getFieldProps("DepartureTime")}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
              </Stack>
            </Box>

            <Box p={2} border="1px solid #E2E8F0" borderRadius={1}>
              <Typography mb={2} variant="subtitle1">
                Gear Details
              </Typography>
              <Stack direction={"column"} spacing={4}>
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Main Line"
                    {...getFieldProps("MainLine")}
                    error={Boolean(touched.MainLine && errors.MainLine)}
                    helperText={touched.MainLine && errors.MainLine}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Branch Line"
                    {...getFieldProps("BranchLine")}
                    error={Boolean(touched.BranchLine && errors.BranchLine)}
                    helperText={touched.BranchLine && errors.BranchLine}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="No of Hooks"
                  InputLabelProps={{ shrink: true }}
                  disabled={edit}
                  {...getFieldProps("HookNo")}
                  error={Boolean(touched.HookNo && errors.HookNo)}
                  helperText={touched.HookNo && errors.HookNo}
                />

                <TextField
                  fullWidth
                  label="Depth(m)"
                  InputLabelProps={{ shrink: true }}
                  {...getFieldProps("Depth")}
                  error={Boolean(touched.Depth && errors.Depth)}
                  helperText={touched.Depth && errors.Depth}
                />
              </Stack>
            </Box>

            <Box p={2} border="1px solid #E2E8F0" borderRadius={1}>
              <Typography mb={2} variant="subtitle1">
                Fishing Details
              </Typography>
              <Stack direction={"column"} spacing={4}>
                <Box p={2} border="1px solid #E2E8F0" borderRadius={1}>
                  <Typography mb={2} variant="subtitle1">
                    Catch Details
                  </Typography>
                  {id.CatchRecords.map((record, index) => {
                    return (
                      <Stack direction={"column"} mb={1} spacing={2}>
                        <Typography variant="subtitle1">
                          Catch ID No.{record.CatchId} Created At{" "}
                          {record.createdAt.substring(0, 10)}
                        </Typography>
                        <Divider />

                        <DesktopDatePicker
                          label="Fishing Date"
                          inputFormat="yyyy-MM-dd"
                          {...getFieldProps(
                            `CatchRecords[${index}.FishingDate]`
                          )}
                          renderInput={(params) => <TextField {...params} />}
                        />

                        <Stack direction={"row"} spacing={3}>
                          <Stack direction={"column"} spacing={4}>
                            <Typography variant="subtitle2">
                              GPS Start
                            </Typography>

                            <TextField
                              fullWidth
                              disabled={edit}
                              InputLabelProps={{ shrink: true }}
                              label="Start Latitude"
                              {...getFieldProps(
                                `CatchRecords[${index}.GPSPoint.start.lat]`
                              )}
                              error={Boolean(
                                touched.Latitude && errors.Latitude
                              )}
                              helperText={touched.Latitude && errors.Latitude}
                            />
                            <TextField
                              fullWidth
                              disabled={edit}
                              InputLabelProps={{ shrink: true }}
                              label="Start Longitude"
                              {...getFieldProps(
                                `CatchRecords[${index}.GPSPoint.start.long]`
                              )}
                              error={Boolean(
                                touched.BranchLine && errors.BranchLine
                              )}
                              helperText={
                                touched.BranchLine && errors.BranchLine
                              }
                            />
                          </Stack>
                          <Stack direction={"column"} spacing={4}>
                            <Typography variant="subtitle2">GPS End</Typography>
                            <TextField
                              fullWidth
                              disabled={edit}
                              InputLabelProps={{ shrink: true }}
                              label="End Latitude"
                              {...getFieldProps(
                                `CatchRecords[${index}.GPSPoint.end.lat]`
                              )}
                              error={Boolean(
                                touched.MainLine && errors.MainLine
                              )}
                              helperText={touched.MainLine && errors.MainLine}
                            />
                            <TextField
                              fullWidth
                              disabled={edit}
                              InputLabelProps={{ shrink: true }}
                              label="End Longitude"
                              {...getFieldProps(
                                `CatchRecords[${index}.GPSPoint.start.long]`
                              )}
                              error={Boolean(
                                touched.BranchLine && errors.BranchLine
                              )}
                              helperText={
                                touched.BranchLine && errors.BranchLine
                              }
                            />
                          </Stack>
                        </Stack>

                        {record.Catch.map((recatch, index1) => {
                          return (
                            <Stack direction={"column"} spacing={3}>
                              <Divider />
                              <Typography variant="subtitle2">
                                Fish Load No.{index1 + 1}
                              </Typography>
                              <TextField
                                disabled={edit}
                                InputLabelProps={{ shrink: true }}
                                label="Quantity"
                                {...getFieldProps(
                                  `CatchRecords[${index}.Catch[${index1}.Qty]]`
                                )}
                                error={Boolean(
                                  touched.BranchLine && errors.BranchLine
                                )}
                                helperText={
                                  touched.BranchLine && errors.BranchLine
                                }
                              />

                              <TextField
                                disabled={edit}
                                InputLabelProps={{ shrink: true }}
                                label="Weight"
                                {...getFieldProps(
                                  `CatchRecords[${index}.Catch[${index1}.Weight]]`
                                )}
                                error={Boolean(
                                  touched.BranchLine && errors.BranchLine
                                )}
                                helperText={
                                  touched.BranchLine && errors.BranchLine
                                }
                              />
                              <TextField
                                disabled={edit}
                                InputLabelProps={{ shrink: true }}
                                label="Fish Type"
                                {...getFieldProps(
                                  `CatchRecords[${index}.Catch[${index1}.FishType]]`
                                )}
                                error={Boolean(
                                  touched.BranchLine && errors.BranchLine
                                )}
                                helperText={
                                  touched.BranchLine && errors.BranchLine
                                }
                              />
                              <TextField
                                disabled={edit}
                                InputLabelProps={{ shrink: true }}
                                label="Fish SubType"
                                {...getFieldProps(
                                  `CatchRecords[${index}.Catch[${index1}.FishSubType]]`
                                )}
                                error={Boolean(
                                  touched.BranchLine && errors.BranchLine
                                )}
                                helperText={
                                  touched.BranchLine && errors.BranchLine
                                }
                              />
                            </Stack>
                          );
                        })}
                      </Stack>
                    );
                  })}
                </Box>
              </Stack>
            </Box>
            <Stack direction="row" justifyContent="space-between" spacing={3}>
              <LoadingButton
                fullWidth
                disabled={edit}
                color={"info"}
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Modify
              </LoadingButton>
              <LoadingButton
                fullWidth
                disabled={edit}
                color={"warning"}
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Reject
              </LoadingButton>
              <LoadingButton
                fullWidth
                disabled={edit}
                color={"primary"}
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Accept
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
}
