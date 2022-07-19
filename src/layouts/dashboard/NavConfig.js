// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Overview",
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
    path: "/blog",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Profile",
    path: "/profile",
    icon: getIcon("gg:profile"),
  },
  {
    title: "Departure",
    path: "/Departure",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "ElogBook",
    path: "/ElogBook",
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
