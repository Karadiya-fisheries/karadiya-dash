import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
//
import navConfig from "./NavConfig";
import AuthService from "../../services/auth.service";
import ProfileService from "../../services/profile.service";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_24],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState(null);
  const isDesktop = useResponsive("up", "lg");
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    ProfileService.getProfileById(user.uid).then((profile) => {
      setProfile(profile.data);
    });
    console.log(profile);
  }, [profile, user.uid]);
  const account = {
    displayName: user.fullname,
    email: user.email,
    photoURL: profile,
    role: user.roles[1] === "ROLE_OWNER" ? "Boat Owner" : "Fishery Officer",
  };

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ mt: 1, ml: 1, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/myactivity"
        >
          <AccountStyle>
            <Avatar alt={user.fullname} src={account.photoURL}>
              {user.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundImage: (theme) =>
                `linear-gradient(90deg, ${alpha(
                  theme.palette.info.lighter,
                  0.5
                )} 25%, ${alpha(theme.palette.info.main, 0.5)} 100%)`,
              borderRightWidth: 2,
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundImage: (theme) =>
                `linear-gradient(90deg, ${alpha(
                  theme.palette.info.lighter,
                  0.5
                )} 25%, ${alpha(theme.palette.info.main, 0.5)} 100%)`,
              borderRightWidth: 2,
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
