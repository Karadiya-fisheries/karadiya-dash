import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import authService from "../../../services/auth.service";
import activityService from "../../../services/activity.service";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (data, actions) => {
      authService
        .login(data.email, data.password)
        .then(
          (user) => {
            activityService
              .createActivity({
                uid: user.uid,
                ActivityTitle: "Logged In ID(#" + user.uid + ")",
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            setTimeout(() => {
              navigate("/dashboard/app", { replace: true });
            }, 3000);
            setOpen(true);
          },
          (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            actions.setSubmitting(false);
            setMessage(message);
          }
        )
        .catch((error) => {
          return <TextField severity="warning">{error}</TextField>;
        });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps("remember")}
                  checked={values.remember}
                />
              }
              label="Remember me"
            />

            <Link
              component={RouterLink}
              variant="subtitle2"
              to="#"
              underline="hover"
            >
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
      {message && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      )}
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Login attempt is Successful!
        </Alert>
      </Snackbar>
    </>
  );
}
