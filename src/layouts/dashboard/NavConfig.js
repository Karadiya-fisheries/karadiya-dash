// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "User",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Sale",
    path: "/dashboard/sales",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Notices",
    path: "/dashboard/notices",
    icon: getIcon("eva:file-text-fill"),
  },
  // {
  //   title: "Profile",
  //   path: "/dashboard/profile",
  //   icon: getIcon("gg:profile"),
  // },
  {
    title: "Profile",
    path: "/dashboard/owner/profile",
    icon: getIcon("gg:profile"),
  },
  {
    title: "Departure",
    path: "/dashboard/departure",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "ElogBook",
    path: "/dashboard/elogBook",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Add Officer",
    path: "/dashboard/add_officer",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "login",
    path: "/login",
    icon: getIcon("eva:lock-fill"),
  },
  {
    title: "register",
    path: "/register",
    icon: getIcon("eva:person-add-fill"),
  },
];

export default navConfig;
