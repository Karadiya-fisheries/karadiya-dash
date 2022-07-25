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

export default function ElogBookForm({ id }) {
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
      DepartureId:id.DepartureId,
        IMULNumber:id.Imul,
        OwnerName:id.OwnerName,
        TelNo:id.TelNo,
        Email:id.Email,
        SkipperName:id.SkipperName,
        SkipperNo:id.SkipperNo,
        SkipperNic:id.SkipperNic,
        DepartingPort:id.DepartingPort,
        FishingZone:id.FishingZone,
        MLength:id.MLength,
        NoThrons:id.NoThrons,
        CNetLength:id.CNetLength,
        // CatchRecords: id.CatchRecords,
        CEyeSize:id.CEyeSize,
        NettingLength:id.NettingLength,
        NetEyeSize:id.NetEyeSize,
        LocalOpLicense:id.LocalOpLicense,
        InterOpLicense:id.InterOpLicense,
        RadioStation:id.RadioStation,
        Frequency:id.Frequency,
        Vms:id.Vms



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
              ELogBook Record No.{id.DepartureId}
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
                Owner Details
              </Typography>
              <Stack direction={"column"} spacing={4}>
              <TextField
                    fullWidth
                    disabled={edit}
                    label="Name of the Owner"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("OwnerName")}
                    error={Boolean(touched.IMULNumber && errors.IMULNumber)}
                    helperText={touched.IMULNumber && errors.IMULNumber}
                  />
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Phone Number"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("TelNo")}
                    error={Boolean(touched.TelNo && errors.TelNo)}
                    helperText={touched.TelNo && errors.TelNo}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Email Address"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("Email")}
                    error={Boolean(touched.Email && errors.Email)}
                    helperText={touched.Email && errors.Email}
                  />
                </Stack>
                {/* <TextField
                  fullWidth
                  label="No of Hooks"
                  InputLabelProps={{ shrink: true }}
                  disabled={edit}
                  //{...getFieldProps("HookNo")}
                  error={Boolean(touched.HookNo && errors.HookNo)}
                  helperText={touched.HookNo && errors.HookNo}
                /> */}

                {/* <TextField
                  fullWidth
                  label="Depth(m)"
                  InputLabelProps={{ shrink: true }}
                  //{...getFieldProps("Depth")}
                  error={Boolean(touched.Depth && errors.Depth)}
                  helperText={touched.Depth && errors.Depth}
                /> */}
              </Stack>
            </Box>
            <Box p={2} border="1px solid #E2E8F0" borderRadius={1}>
              <Typography mb={2} variant="subtitle1">
                Skipper Details
              </Typography>
              <Stack direction={"column"} spacing={4}>
              <TextField
                  fullWidth
                  label="Skipper Name"
                  InputLabelProps={{ shrink: true }}
                  disabled={edit}
                  {...getFieldProps("SkipperName")}
                  error={Boolean(touched.SkipperName && errors.SkipperName)}
                  helperText={touched.SkipperName && errors.SkipperName}
                />
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Skipper NIC"
                    {...getFieldProps("SkipperNic")}
                    error={Boolean(touched.SkipperNic && errors.SkipperNic)}
                    helperText={touched.SkipperNic && errors.SkipperNic}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Skipper Number"
                    {...getFieldProps("SkipperNo")}
                    error={Boolean(touched.SkipperNo && errors.SkipperNo)}
                    helperText={touched.SkipperNo && errors.SkipperNo}
                  />
                </Stack>
                {/* <TextField
                  fullWidth
                  label="No of Hooks"
                  InputLabelProps={{ shrink: true }}
                  disabled={edit}
                  //{...getFieldProps("HookNo")}
                  error={Boolean(touched.HookNo && errors.HookNo)}
                  helperText={touched.HookNo && errors.HookNo}
                /> */}

                {/* <TextField
                  fullWidth
                  label="Depth(m)"
                  InputLabelProps={{ shrink: true }}
                  //{...getFieldProps("Depth")}
                  error={Boolean(touched.Depth && errors.Depth)}
                  helperText={touched.Depth && errors.Depth}
                /> */}
              </Stack>
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
                    label="Departure ID"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("DepartureId")}
                    error={Boolean(touched.DepartureId && errors.DepartureId)}
                    helperText={touched.DepartureId && errors.DepartureId}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="IMUL Number"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("IMULNumber")}
                    error={Boolean(touched.IMULNumber && errors.IMULNumber)}
                    helperText={touched.IMULNumber && errors.IMULNumber}
                  />
                </Stack>
                
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Departure Port"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("DepartingPort")}
                    error={Boolean(touched.DepartingPort && errors.DepartingPort)}
                    helperText={touched.DepartingPort && errors.DepartingPort}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Fishing Zone"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("FishingZone")}
                    error={Boolean(touched.Email && errors.Email)}
                    helperText={touched.Email && errors.Email}
                  />
                </Stack>
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Local Operating License Number of vessel"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("LocalOpLicense")}
                    error={Boolean(touched.LocalOpLicense && errors.LocalOpLicense)}
                    helperText={touched.LocalOpLicense && errors.LocalOpLicense}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Local Operating License Number of vessel"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("InterOpLicense")}
                    error={Boolean(touched.InterOpLicense && errors.InterOpLicense)}
                    helperText={touched.InterOpLicense && errors.InterOpLicense}
                  />
                </Stack>
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Radio Station of vessel"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("RadioStation")}
                    error={Boolean(touched.RadioStation && errors.RadioStation)}
                    helperText={touched.RadioStation && errors.RadioStation}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    label="Radio Station of vessel"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("Frequency")}
                    error={Boolean(touched.Frequency && errors.Frequency)}
                    helperText={touched.Frequency && errors.Frequency}
                  />
                </Stack>
                <TextField
                    fullWidth
                    disabled={edit}
                    label="VMS Device on board(Is it working)"
                    InputLabelProps={{ shrink: true }}
                    {...getFieldProps("Vms")}
                    error={Boolean(touched.Vms && errors.Vms)}
                    helperText={touched.Vms && errors.Vms}
                  />
                
                {/* <DesktopDatePicker
                  label="Departure Date"
                  inputFormat="yyyy-MM-dd"
                  //{...getFieldProps("DepartureDate")}
                  renderInput={(params) => <TextField {...params} />}
                /> */}

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
                Description of carrying devices
              </Typography>
              <Stack direction={"column"} spacing={4}>
              <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Length of Maruwela(Meter)"
                    {...getFieldProps("MLength")}
                    error={Boolean(touched.MLength && errors.MLength)}
                    helperText={touched.MLength && errors.MLength}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Number of thorns"
                    {...getFieldProps("NoThrons")}
                    error={Boolean(touched.NoThrons && errors.NoThrons)}
                    helperText={touched.NoThrons && errors.NoThrons}
                  />
                </Stack>
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Length of Caramel Net(Km)"
                    {...getFieldProps("CNetLength")}
                    error={Boolean(touched.CNetLength && errors.CNetLength)}
                    helperText={touched.CNetLength && errors.CNetLength}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Eye Size(inches)"
                    {...getFieldProps("CEyeSize")}
                    error={Boolean(touched.CEyeSize && errors.CEyeSize)}
                    helperText={touched.CEyeSize && errors.CEyeSize}
                  />
                </Stack>
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Length of Netting(meter)"
                    {...getFieldProps("NettingLength")}
                    error={Boolean(touched.NettingLength && errors.NettingLength)}
                    helperText={touched.NettingLength && errors.NettingLength}
                  />
                  <TextField
                    fullWidth
                    disabled={edit}
                    InputLabelProps={{ shrink: true }}
                    label="Eye Size(inches)"
                    {...getFieldProps("NetEyeSize")}
                    error={Boolean(touched.NetEyeSize && errors.NetEyeSize)}
                    helperText={touched.NetEyeSize && errors.NetEyeSize}
                  />
                </Stack>
                
              </Stack>
            </Box>

            {/* <Box p={2} border="1px solid #E2E8F0" borderRadius={1}>
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
            </Box> */}
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
