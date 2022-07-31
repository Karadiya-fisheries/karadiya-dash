import { Route, Routes, useNavigate } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Blog from "./pages/Blog";
import User from "./pages/User";
import Login from "./pages/Login";
//import NotFound from "./pages/Page404";
import Register from "./pages/Register";
import Products from "./pages/Products";
//import Profile from "./pages/Profile";
import Profile1 from "./pages/Profile1";
import ProfieIndex from "./sections/profile1/index";
import EditProfile from "./sections/profile1/EditProfile/Editprofile";
import DashboardApp from "./pages/DashboardApp";
import AddOfficer from "./pages/AddOfficer";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import { useContext, useEffect, useState } from "react";
import AuthService from "./services/auth.service";
import AuthContext from "./services/auth-context";
import OwnerProfile from "./pages/OwnerProfile";
import { BlogCreate, BlogPost } from "./sections/@dashboard/blog";
import ELogBook from "./pages/ElogBook";
import DepartureApproval from "./pages/DepartureApproval";
// ----------------------------------------------------------------------

export default function App() {
  const [current, setCurrent] = useState(null);
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  useEffect(() => {
    setCurrent(user);
    if (current === null) {
      navigate("/login", { replace: true });
    } else {
      navigate("/dashboard/app", { replace: true });
    }
  }, [user]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="app" element={<DashboardApp />} />
          <Route path="user" element={<User />} />
          <Route path="notices" element={<Blog />} />
          <Route path="notices/view/:id" element={<BlogPost />} />
          <Route path="notices/create" element={<BlogCreate />} />
          <Route path="sales" element={<Products />} />
          <Route path="profile" element={<ProfieIndex />} />
          <Route path="owner/profile" element={<OwnerProfile />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="departure" element={<DepartureApproval />} />
          <Route path="elogbook" element={<ELogBook />} />
          <Route path="add_officer" element={<AddOfficer />} />
        </Route>
        <Route path="/" element={<LogoOnlyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="owner/profile" element={<OwnerProfile />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
