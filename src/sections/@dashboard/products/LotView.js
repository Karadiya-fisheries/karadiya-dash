import { useState, useEffect, useRef, useCallback } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
} from "@mui/material";

import ChatBubble from "@mui/icons-material/ChatBubble";
// components
// components
import Label from "../../../components/Label";
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import LotService from "../../../services/lot.service";
import authService from "../../../services/auth.service";
// utils
import { fToNow, fDateTime } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import { isAfter, isBefore, parseISO } from "date-fns";
import moment from "moment";
import { Container, useTheme } from "@mui/system";
import AppWidgetSummary from "../app/AppWidgetSummary";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------
const RegisterStyle = styled(Card)(({ theme }) => ({
  maxWidth: 720,
  padding: theme.spacing(2, 2),
  color: theme.palette.info,
  alignItems: "center",
  mb: 5,
}));
const ClockStyle = styled(Box)(({ theme, clockColor }) => ({
  p: 4,
  textShadow: "0 0 25px " + clockColor.darker,
}));

const getStatus = (startDate, endDate, theme) => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  if (moment().isBetween(start, end))
    return {
      status: "live",
      date: end,
      color: theme.palette.success,
      label: "success",
    };
  else if (moment().isAfter(end))
    return {
      status: "auctioned",
      date: end,
      color: theme.palette.error,
      label: "error",
    };
  else if (moment().isBefore(start))
    return {
      status: "pending",
      date: start,
      color: theme.palette.info,
      label: "info",
    };
  else return { status: "", date: moment(), color: "" };
};

export default function LotView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const [post, setPost] = useState({
    id: "",
    name: "",
    cover: "",
    price: "",
    start: "",
    end: "",
    size: "",
    owner: {
      user: {
        uid: "",
        fullname: "",
        profileUrl: "",
        email: "",
      },
    },
  });
  const color = getStatus(post.LotStartDate, post.LotEndDate, theme).color;
  const label = getStatus(post.LotStartDate, post.LotEndDate, theme).label;
  const date = getStatus(post.LotStartDate, post.LotEndDate, theme).date;
  const status = getStatus(post.LotStartDate, post.LotEndDate, theme).status;
  const latestPostLarge = false;
  const latestPost = false;

  const [cover, setCover] = useState("");

  useEffect(() => {
    LotService.getLotById(id).then((Lot) => {
      setPost(Lot.data);
      if (!Lot.data.LotCover) {
        setCover("");
        return;
      } else if (Lot.data.LotCover === "auto") {
        setCover("/static/mock-images/covers/Article.jpg");
      } else {
        setCover(Lot.data.LotCover);
      }
    });

    console.log(cover);
  }, []);

  return (
    <Page>
      <Container>
        <RegisterStyle>
          <CardHeader
            sx={{ mb: 1 }}
            avatar={
              <Avatar
                alt={post.owner.user.fullname}
                src={post.owner.user.profileUrl}
              />
            }
            title={post.LotTitle}
            subheader={fDateTime(post.createdAt)}
          ></CardHeader>
          <Box sx={{ position: "relative", overflow: "hidden", mb: 1 }}>
            <CardMedia
              sx={{
                objectFit: "cover",
                borderRadius: 2,
              }}
              component="img"
              alt={post.LotTitle}
              src={cover}
            />
          </Box>

          <Grid container component={Paper}>
            <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
              <List sx={{ color: (theme) => theme.palette.grey[800] }}>
                <ListItem button key={post.owner.user.fullname}>
                  <ListItemIcon>
                    <Avatar
                      alt={post.owner.user.fullname}
                      src={post.owner.user.profileUrl}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={post.owner.user.fullname}
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={post.owner.user.phone}
                    secondary={"Tel/Phone"}
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={post.owner.user.email}
                    secondary={"E-mail"}
                  ></ListItemText>
                </ListItem>
                <ListItem>
                  <IconButton
                    color="primary"
                    sx={{ border: "1px solid", borderRadius: 2 }}
                    component={RouterLink}
                    to={"/dashboard/chat/" + post.owner.user.uid}
                  >
                    <ChatBubble />
                    Chat
                  </IconButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={9} sx={{ borderRight: "1px solid #e0e0e0", p: 1 }}>
              <ClockStyle clockColor={color}>
                {(status === "pending" || status === "live") && (
                  <Countdown color={color} eventTime={date} interval={1000} />
                )}
              </ClockStyle>
              {status === "live" && (
                <Typography
                  variant="subtitle1"
                  sx={{ display: "overlay", color: "primary" }}
                >
                  Bidding Ending in - {fToNow(date)}
                </Typography>
              )}
              {status === "pending" && (
                <Typography
                  variant="subtitle1"
                  sx={{ display: "overlay", color: "primary" }}
                >
                  Bidding Starting in - {fToNow(date)}
                </Typography>
              )}
              {status === "auctioned" && (
                <Typography
                  variant="subtitle1"
                  sx={{ display: "overlay", color: "primary" }}
                >
                  Bidding Ended - {fToNow(date)}
                </Typography>
              )}

              <Stack direction={"row"} justifyContent="space-between">
                <AppWidgetSummary
                  sx={{ width: "100px" }}
                  icon="eos-icons:container"
                  color={"primary"}
                  title={"Lot Size"}
                  total={post.LotSize}
                />

                <AppWidgetSummary
                  sx={{ width: "100px" }}
                  title={"Lot Unit Price"}
                  icon={"entypo:price-tag"}
                  color={"primary"}
                  total={post.LotUnitPrice}
                />

                <AppWidgetSummary
                  sx={{ width: "100px" }}
                  title={"Lot Current Bid"}
                  icon={"simple-icons:leaderprice"}
                  total={post.CurrentBid}
                />
              </Stack>
              <CardContent>
                {status && (
                  <Label
                    color={label}
                    variant="filled"
                    sx={{
                      zIndex: 9,
                      top: 16,
                      right: 16,
                      position: "absolute",
                      textTransform: "uppercase",
                    }}
                  >
                    {status}
                  </Label>
                )}
              </CardContent>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="h5">Bids</Typography>
        </RegisterStyle>
      </Container>
    </Page>
  );
}

const calculateDuration = (eventTime) =>
  moment.duration(
    Math.max(eventTime - Math.floor(Date.now() / 1000), 0),
    "seconds"
  );

const Countdown = ({ eventTime, interval, color }) => {
  console.log(color);
  const [duration, setDuration] = useState(calculateDuration(eventTime));
  const timerRef = useRef(0);
  const timerCallback = useCallback(() => {
    setDuration(calculateDuration(eventTime));
  }, [eventTime]);

  useEffect(() => {
    timerRef.current = setInterval(timerCallback, interval);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [eventTime]);

  return (
    <>
      <Typography variant="h3" color={color.dark}>
        {duration.days()} Day : {duration.hours()} Hour : {duration.minutes()}{" "}
        Minute : {duration.seconds()} Second
      </Typography>
    </>
  );
};
