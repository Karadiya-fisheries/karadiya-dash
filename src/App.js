// routes
import { Navigate, Route, Routes } from "react-router-dom";
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
import { useEffect, useState } from "react";
import AuthService from "./services/auth.service";
// ----------------------------------------------------------------------

export default function App() {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setCurrent(currentUser);
  }, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Routes>
        {current && (
          <Route path="/" element={<DashboardLayout />}>
            <Route path="" element={<DashboardApp />} />
            <Route path="app" element={<DashboardApp />} />
            <Route path="user" element={<User />} />
            <Route path="blog" element={<Blog />} />
            <Route path="products" element={<Products />} />
          </Route>
        )}
        <Route path="/" element={<LogoOnlyLayout />}>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
