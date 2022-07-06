import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Stack, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Page from "../components/Page";
// sections
import { RegisterForm } from "../sections/auth/register";
import Register from "./Register";
//import AuthSocial from "../sections/auth/AuthSocial";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const RegisterStyle = styled("div")(({ theme }) => ({
  maxWidth: 640,
  padding: theme.spacing(1, 1),
}));

// ----------------------------------------------------------------------

export default function AddOfficer() {
  return (
    <Page title="Add Officer">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Add Officer
          </Typography>
        </Stack>
        <RegisterStyle>
          <RegisterForm officer={true} />
        </RegisterStyle>
      </Container>
    </Page>
  );
}
