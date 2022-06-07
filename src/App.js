// routes
import { Route, Routes, useNavigate } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Blog from "./pages/Blog";
import User from "./pages/User";
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import Register from "./pages/Register";
import Products from "./pages/Products";
import DashboardApp from "./pages/DashboardApp";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import { useContext, useEffect, useState } from "react";
import AuthService from "./services/auth.service";
import AuthContext from "./services/auth-context";
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
          <Route path="sales" element={<Products />} />
        </Route>
        <Route path="/" element={<LogoOnlyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
