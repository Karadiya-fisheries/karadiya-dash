import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  Stack,
  Container,
  Typography,
  Divider,
  CardHeader,
} from "@mui/material";
// components
import Page from "../components/Page";
import { useState } from "react";
import activityService from "../services/activity.service";
import authService from "../services/auth.service";
import { act } from "react-dom/test-utils";
import { KeyboardReturn } from "@mui/icons-material";
import { fDateTime, fDate } from "../utils/formatTime";
import { parseISO } from "date-fns";
import AppOrderTimeline from "../sections/@dashboard/app/AppOrderTimeline";
const GroupStyle = styled(Card)(({ theme }) => ({
  maxWidth: 640,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: theme.palette.grey.A700,
}));
export default function Activity() {
  const [activity, setActivity] = useState([]);
  const uid = authService.getCurrentUser().uid;
  React.useEffect(() => {
    activityService.getActivityById(uid).then((result) => {
      const data = result.data;
      const groups = data.reduce((groups, activity) => {
        const date = fDate(parseISO(activity.createdAt));
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
      }, {});
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          activity: groups[date],
        };
      });
      setActivity(groupArrays);
    });
  }, []);

  return (
    <Page>
      <Container>
        <Typography variant="h4" gutterBottom>
          My Activity
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={4} direction="column-reverse">
          {activity.map((act, index) => {
            return (
              <GroupStyle>
                <AppOrderTimeline
                  title={"Activity of " + act.date}
                  list={act.activity.map((ele, index) => ({
                    id: index,
                    title: ele.ActivityTitle,
                    time: parseISO(ele.createdAt),
                  }))}
                />
              </GroupStyle>
            );
          })}
        </Stack>
      </Container>
    </Page>
  );
}
