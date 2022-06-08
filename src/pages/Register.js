import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Page from "../components/Page";
import Logo from "../components/Logo";
// sections
import { RegisterForm } from "../sections/auth/register";
import Box from '@mui/material/Box';
//import AuthSocial from "../sections/auth/AuthSocial";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  // minHeight: '100vh',
  // flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  padding:'40px'
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  minHeight: '110vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <>
    <Box
       sx={{
        width: '100%',
        height: '100%',
        maxWidth:900,
       
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:'column',
        margin:'auto',
        boxShadow: 5,
        
      }}
    >
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          {/* <Logo /> */}
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 },ml:'100px'}}>
              Already have an account? {""}
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              For Digital Future, Manage your work with Karadiya
            </Typography> */}
            <img
              alt="register"
              src="/static/mock-images/login3.jpg"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Quick registration, Here
            </Typography>

            <RegisterForm />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary", mt: 3 }}
            >
              By registering, I agree to Karadiya&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              {""}and{""}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account?{" "}
                <Link variant="subtitle2" to="/login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
    </Box>
    </>
  );
}
