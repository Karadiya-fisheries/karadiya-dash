import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Typography,
  Divider,
  Alert,
  Button,
  AlertTitle,
} from "@mui/material";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import StatService from "../services/stat.service";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import noticeService from "../services/notice.service";
import activityService from "../services/activity.service";
import { fDateTime } from "../utils/formatTime";
import { parseISO } from "date-fns";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [userCount, setUserCount] = useState(undefined);
  const [triplogCount, setTriplogCount] = useState(undefined);
  const [catchCount, setCatchCount] = useState(undefined);
  const [fishermenCount, setFishermenCount] = useState(undefined);
  const [pendingDepartureCount, setPendingDepartureCount] = useState(undefined);
  const [pendingTriplogCount, setPendingTriplogCount] = useState(undefined);
  const [boatCount, setBoatCount] = useState(undefined);
  const [IsOwner, setIsOwner] = useState(false);
  const [notice, setNotice] = useState([{ createdAt: "2000-01-01" }]);
  const [activity, setActivity] = useState([{ createdAt: "2000-01-01" }]);

  const uid = authService.getCurrentUser().uid;
  useEffect(() => {
    activityService
      .getActivityById(uid)
      .then((res) => setActivity(res.data.slice(-5)));
    noticeService.getNoticeWeekly().then((res) => setNotice(res.data));
    StatService.getAllUserCount().then((res) => setUserCount(res.data));
    StatService.getAllFishermenCount().then((res) =>
      setFishermenCount(res.data)
    );
    StatService.getIfOwner(uid).then((res) => {
      setIsOwner(res.data);
    });
    StatService.getAllBoatCount().then((res) => setBoatCount(res.data));
    StatService.getTriplogCount().then((res) => setTriplogCount(res.data));
    StatService.getCatchCount().then((res) => setCatchCount(res.data));
    StatService.getPendingTriplogCount().then((res) =>
      setPendingTriplogCount(res.data)
    );
    StatService.getPendingDepartureCount().then((res) =>
      setPendingDepartureCount(res.data)
    );
  }, []);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back to Karadiya
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {!IsOwner && (
          <Alert
            variant="outlined"
            severity="info"
            action={
              <Button
                onClick={() => {
                  navigate("/dashboard/owner/profile", { replace: true });
                }}
                color="inherit"
                size="large"
                variant="outlined"
              >
                Complete Profile
              </Button>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Required *</AlertTitle>
            You haven't completed your profile.
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="All Users"
              total={userCount}
              icon={"carbon:user-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Registered Fishermen"
              total={fishermenCount}
              color="info"
              icon={"healthicons:domestic-worker"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Registered Boats"
              total={boatCount}
              color="info"
              icon={"ic:baseline-directions-boat"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Trip Logs"
              total={triplogCount}
              color="info"
              icon={"ant-design:file-text-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Catch"
              total={catchCount}
              color="info"
              icon={"ion:fish"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Catch Reports"
              total={pendingTriplogCount}
              color="warning"
              icon={"map:ice-fishing"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Departure Approvels"
              total={pendingDepartureCount}
              color="warning"
              icon={"icon-park-outline:fishing"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="My Activity"
              list={activity.map((act, index) => ({
                id: act.ActivityId,
                title: act.ActivityTitle,
                time: fDateTime(parseISO(act.createdAt)),
              }))}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Weekly Notices"
              list={notice.map((post, index) => ({
                id: post.NoticeId,
                title: post.NoticeTitle,
                image: post.NoticeCover,
                postedAt: parseISO(post.createdAt),
                cat: post.NoticeCat,
                description: post.NoticeText,
              }))}
            />
          </Grid>
          <Divider />
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Fishing Trips"
              subheader="(-5%) than last year"
              chartLabels={[
                "01/01/2022",
                "02/01/2022",
                "03/01/2022",
                "04/01/2022",
                "05/01/2022",
                "06/01/2022",
                "07/01/2022",
                "08/01/2022",
                "09/01/2022",
                "10/01/2022",
                "11/01/2022",
              ]}
              chartData={[
                {
                  name: "Western Province",
                  type: "area",
                  fill: "gradient",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Southern Province",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "Northern Province",
                  type: "area",
                  fill: "gradient",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Fishing Harvest "
              chartData={[
                { label: "Western Province", value: 4344 },
                { label: "Southern Province", value: 5435 },
                { label: "Northern Province", value: 1443 },
                { label: "Eastern Province", value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: "Italy", value: 400 },
                { label: "Japan", value: 430 },
                { label: "China", value: 448 },
                { label: "Canada", value: 470 },
                { label: "France", value: 540 },
                { label: "Germany", value: 580 },
                { label: "South Korea", value: 690 },
                { label: "Netherlands", value: 1100 },
                { label: "United States", value: 1200 },
                { label: "United Kingdom", value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={[
                "English",
                "History",
                "Physics",
                "Geography",
                "Chinese",
                "Math",
              ]}
              chartData={[
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
