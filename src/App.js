import { Route, Routes, useNavigate, useParams } from "react-router-dom";

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
import Fishermen from "./pages/Fishermen";
import DepartureView from "./sections/Departure/DepartureView";
import Activity from "./pages/Activity";
import Chat from "./pages/Chat";
import LotCreate from "./sections/@dashboard/products/LotCreate";
import PrintViewLayout from "./layouts/PrintViewLayut";
import LotView from "./sections/@dashboard/products/LotView";
import ElogBookRec from "./sections/ElogBook/ElogBookDoc";
import ElogBookForm from "./sections/ElogBook/ElogBookForm";
import ElogBookOneRecord from "./sections/ElogBook/ElogbookOnerecord";
// ----------------------------------------------------------------------

export default function App() {
  const [current, setCurrent] = useState(null);
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const { id } = useParams();
  console.log(id);

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
          <Route path="lot/view/:id" element={<LotView />} />
          <Route path="notices/create" element={<BlogCreate />} />
          <Route path="lot/generate/:tid" element={<LotCreate />} />
          <Route path="auction" element={<Products />} />
          <Route path="profile" element={<ProfieIndex />} />
          <Route path="owner/profile" element={<OwnerProfile />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="departure" element={<DepartureApproval />} />
          <Route path="elogbook" element={<ELogBook />} />
          <Route path="fishermen" element={<Fishermen />} />
          <Route path="add_officer" element={<AddOfficer />} />
          <Route path="departure/view/:id" element={<DepartureView />} />
          <Route path="triplog/view/:id" element={<ElogBookOneRecord />} />
          <Route path="myactivity" element={<Activity />} />
          <Route path="chat/:id" element={<Chat />} />
        </Route>
        <Route path="/view" element={<PrintViewLayout />}>
          <Route path="departure/:id" element={<DepartureView />} />
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
