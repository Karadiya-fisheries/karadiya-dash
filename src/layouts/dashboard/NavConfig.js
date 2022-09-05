// component
import Iconify from "../../components/Iconify";
import authService from "../../services/auth.service";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const officerConfig = [
  {
    title: "Overview",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Users",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Auction",
    path: "/dashboard/auction",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Notices",
    path: "/dashboard/notices",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Departure Approvals",
    path: "/dashboard/departure",
    icon: getIcon("ic:baseline-directions-boat"),
  },
  {
    title: "E-logBook",
    path: "/dashboard/elogBook",
    icon: getIcon("map:ice-fishing"),
  },
  {
    title: "Fishermen",
    path: "/dashboard/fishermen",
    icon: getIcon("map:fishing-pier"),
  },
  {
    title: "Add Officer",
    path: "/dashboard/add_officer",
    icon: getIcon("wpf:add-user"),
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

const ownerConfig = [
  {
    title: "Overview",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Users",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Auction",
    path: "/dashboard/auction",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Notices",
    path: "/dashboard/notices",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Profile",
    path: "/dashboard/owner/profile",
    icon: getIcon("gg:profile"),
  },
  {
    title: "Departure Approvals",
    path: "/dashboard/departure",
    icon: getIcon("ic:baseline-directions-boat"),
  },
  {
    title: "E-logBook",
    path: "/dashboard/elogBook",
    icon: getIcon("map:ice-fishing"),
  },
  {
    title: "Fishermen",
    path: "/dashboard/fishermen",
    icon: getIcon("map:fishing-pier"),
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

const bidderConfig = [
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
const role = authService.getCurrentUser().roles[1];

var navconfig = [];
if (role === "ROLE_OWNER") {
  navconfig = ownerConfig;
} else if (role === "ROLE_OFFICER") {
  navconfig = officerConfig;
} else {
  navconfig = bidderConfig;
}

export default navconfig;
