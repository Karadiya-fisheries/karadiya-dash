// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Sale",
    path: "/products",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Notices",
    path: "/dashboard/blog",
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