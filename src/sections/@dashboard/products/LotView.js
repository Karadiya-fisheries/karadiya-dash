import * as Yup from "yup";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
// material
import SendRounded from "@mui/icons-material/SendRounded";
// hooks
// components
import { Form, FormikProvider, useFormik } from "formik";
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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Card,
  Fab,
  TextField,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChatSharp from "@mui/icons-material/ChatSharp";
// components
// components
import Label from "../../../components/Label";
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import LotService from "../../../services/lot.service";
import AuthService from "../../../services/auth.service";
import BidService from "../../../services/bid.service";
import { SocketContext } from "../../../services/socket.context";
// utils
import { fToNow, fDateTime, fDate } from "../../../utils/formatTime";
import { fCurrency, fShortenNumber } from "../../../utils/formatNumber";
import { isAfter, isBefore, parseISO } from "date-fns";
import moment from "moment";
import { Container, useTheme } from "@mui/system";
import AppWidgetSummary from "../app/AppWidgetSummary";
import {
  AddCardOutlined,
  CallEndOutlined,
  ChatRounded,
  PhoneBluetoothSpeakerSharp,
  PlusOneOutlined,
  StartRounded,
} from "@mui/icons-material";
import { theme } from "@chakra-ui/react";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------
const RegisterStyle = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  padding: theme.spacing(2, 2),
  color: theme.palette.info,
  alignItems: "center",
  mb: 5,
  boxShadow: 5,
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
  const user = AuthService.getCurrentUser();
  const socket = useContext(SocketContext);
  const [isBidder, setIsBidder] = useState(user.roles[1] === "ROLE_BIDDER");
  const [isOwner, setIsOwner] = useState(false);
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
  const [currentPrice, setCurrentPrice] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const color = getStatus(startDate, endDate, theme).color;
  const date = getStatus(startDate, endDate, theme).date;
  const status = getStatus(startDate, endDate, theme).status;
  const label = getStatus(startDate, endDate, theme).label;
  const latestPostLarge = false;
  const latestPost = false;

  const [cover, setCover] = useState("");

  useEffect(() => {
    LotService.getLotById(id).then((Lot) => {
      setPost(Lot.data);
      setCurrentPrice(Lot.data.CurrentBid);
      setStartDate(Lot.data.LotStartDate);
      setEndDate(Lot.data.LotEndDate);
      setIsOwner(user.uid === Lot.data.owner.user.uid);
      if (!Lot.data.LotCover) {
        setCover("");
        return;
      } else if (Lot.data.LotCover === "auto") {
        setCover("/static/mock-images/covers/Article.jpg");
      } else {
        setCover(Lot.data.LotCover);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("StartedBid", (arg) => {
      console.log(arg);
      setStartDate(arg.date);
    });

    socket.on("EndedBid", (arg) => {
      console.log(arg);
      setEndDate(arg.date);
    });
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
                    <ChatSharp />
                    Chat
                  </IconButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={9} sx={{ borderRight: "1px solid #e0e0e0", p: 1 }}>
              <Stack
                sx={{ my: 1 }}
                direction="row"
                justifyContent={"space-around"}
              >
                <Typography variant="overline" textAlign={"left"}>
                  Bidding Starting at {fDateTime(startDate)}
                </Typography>
                <Typography variant="overline" textAlign={"right"}>
                  Bidding Ending at {fDateTime(endDate)}
                </Typography>
              </Stack>
              <Typography variant="subtitle1">Bidding Clock</Typography>
              {status === "live" && (
                <Typography
                  variant="subtitle1"
                  color={color.main}
                  sx={{ display: "overlay" }}
                >
                  Time To End Bidding - {fToNow(date)}
                </Typography>
              )}
              {status === "pending" && (
                <Typography
                  variant="subtitle1"
                  color={color.main}
                  sx={{ display: "overlay" }}
                >
                  Time To Start Bidding - {fToNow(date)}
                </Typography>
              )}
              <ClockStyle clockColor={color}>
                {(status === "pending" || status === "live") && (
                  <Countdown color={color} eventTime={date} interval={1000} />
                )}
              </ClockStyle>
              <Typography variant="subtitle1">
                Auction Lot Information
              </Typography>
              {status === "auctioned" && (
                <Typography
                  variant="subtitle1"
                  color={color.main}
                  sx={{ display: "overlay" }}
                >
                  Bidding Ended - {fToNow(date)}
                </Typography>
              )}

              <Grid container columnGap={6}>
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary
                    icon="eos-icons:container"
                    color={"primary"}
                    title={"Lot Size in kg"}
                    total={post.LotSize}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary
                    title={"Lot Unit Price:per kg"}
                    icon={"entypo:price-tag"}
                    color={"primary"}
                    total={post.LotUnitPrice}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary
                    title={"Lot Current Bid"}
                    icon={"simple-icons:leaderprice"}
                    total={currentPrice}
                    type="currentBid"
                    color={"success"}
                  />
                </Grid>
              </Grid>
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
          <Typography variant="h5" gutterBottom sx={{ mx: 1 }}>
            Bids
          </Typography>
          <BidList
            price={currentPrice}
            setPrice={setCurrentPrice}
            oid={post.owner.user.uid}
            isOwner={isOwner}
            status={status}
            disabledStatus={status === "pending" || status === "auctioned"}
            color={color}
            label={label}
          />
        </RegisterStyle>
      </Container>
    </Page>
  );
}

const calculateDuration = (eventTime) => moment.duration(eventTime - moment());

const Countdown = ({ eventTime, interval, color }) => {
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
    <Box
      color={color.dark}
      sx={{
        border: "2px solid",
        m: 3,
        boxShadow: 5,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10,
      }}
      justifyContent="center"
    >
      <Typography variant="h4" color={color.dark} textAlign="center">
        {duration.days()} Days {duration.hours()} Hours {duration.minutes()}{" "}
        Minutes {duration.seconds()} Seconds
      </Typography>
    </Box>
  );
};

const BidList = ({
  oid,
  setPrice,
  price,
  isOwner,
  disabledStatus,
  color,
  status,
  label,
}) => {
  const [bid, setBid] = useState([]);
  const [BidMap, setBidMap] = useState(new Map());
  const { id } = useParams();
  const uid = AuthService.getCurrentUser().uid;
  const socket = useContext(SocketContext);

  const sendMessage = (socket, packet) => {
    socket.emit("MakeABid", packet);
  };

  const startTheBid = (socket, packet) => {
    socket.emit("StartABid", packet);
  };

  const endTheBid = (socket, packet) => {
    socket.emit("EndABid", packet);
  };

  useEffect(() => {
    LotService.getBidsById(id).then((bids) => {
      const list = bids.data.map((bid) => ({
        bidPrice: bid.bid.BidPrice,
        phone: bid.user.phone,
        email: bid.user.email,
        uid: bid.user.uid,
        fullname: bid.user.fullname,
        bussiness: bid.BusinessName,
        district: bid.District,
        createdAt: bid.bid.createdAt,
      }));
      const bmap = new Map(list.map((i) => [parseInt(i.bidPrice), i]));
      setBidMap(bmap);
    });
  }, []);

  useEffect(() => {
    socket.on("RecieveABid", (arg) => {
      const bid = arg.bid;
      const price = arg.CurrentPrice;
      setPrice(price);
      setBidMap(
        BidMap.set(parseInt(price), {
          bidPrice: price,
          phone: bid.user.phone,
          email: bid.user.email,
          uid: bid.user.uid,
          fullname: bid.user.fullname,
          avatar: bid.user.profileUrl,
          bussiness: bid.BusinessName,
          district: bid.District,
          createdAt: bid.bid.createdAt,
        })
      );
    });
  }, []);

  return (
    <Grid container>
      {!isOwner && (
        <Grid item xs={12} sm={6} md={6}>
          <JoinBid
            sendMessage={sendMessage}
            setBidMap={setBidMap}
            socket={socket}
            uid={uid}
            id={id}
            oid={oid}
            CurrentPrice={price}
            color={color}
            status={disabledStatus}
          />
        </Grid>
      )}
      {isOwner && (
        <Grid item xs={12} sm={6} md={6}>
          <StartOrEndBid
            setStart={startTheBid}
            socket={socket}
            setEnd={endTheBid}
            id={id}
            status={status}
            label={label}
            color={color}
          />
        </Grid>
      )}
      <Grid container>
        {[...BidMap.values()].reverse().map((bid, index) => (
          <Grid item xs={12} sm={6} md={12}>
            <BidItem key={index} id={index} item={bid} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const StartOrEndBid = ({
  id,
  socket,
  setStart,
  setEnd,
  status,
  label,
  color,
}) => {
  console.log(status);
  return (
    <Box>
      {status === "pending" && (
        <IconButton
          size="large"
          color={"success"}
          onClick={(e) => {
            setStart(socket, {
              lotId: id,
              startdate: moment(),
            });
          }}
          sx={{
            border: "1px solid",
            borderRadius: 2,
            bgcolor: alpha(color.main, 0.4),
          }}
        >
          Start The Bidding
          <StartRounded fontSize="large" sx={{ ml: 1 }} />
        </IconButton>
      )}
      {status === "live" && (
        <IconButton
          size="large"
          color={"error"}
          onClick={(e) => {
            setEnd(socket, {
              lotId: id,
              enddate: moment(),
            });
          }}
          sx={{
            border: "1px solid",
            borderRadius: 2,
            bgcolor: alpha(color.main, 0.4),
          }}
        >
          End The Bidding
          <StartRounded fontSize="large" sx={{ ml: 1 }} />
        </IconButton>
      )}
    </Box>
  );
};

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
}));

const CurrentBidder = ({ userid, item, color, icon, price }) => {
  const {
    phone,
    email,
    fullname,
    bussiness,
    district,
    createdAt,
    avatar,
    uid,
  } = item;
  console.log(" hello current " + item);
  console.log(" hello current " + price);
  return (
    <Card
      sx={{
        mx: 1,
        mb: 1,
        boxShadow: 3,
        bgcolor: (theme) => alpha(theme.palette["info"].lighter, 0.5),
        textAlign: "center",
      }}
    >
      <CardHeader
        avatar={<Avatar alt={fullname} src={avatar} />}
        title={fullname}
        subheader={fDateTime(createdAt)}
      ></CardHeader>
      <CardContent>
        <IconWrapperStyle
          sx={{
            color: (theme) => theme.palette["info"].darker,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette["info"].dark,
                0
              )} 0%, ${alpha(theme.palette["info"].dark, 0.5)} 100%)`,
          }}
        >
          <Iconify icon={icon} width={33} height={33} />
        </IconWrapperStyle>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
          {price}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
          Current Bid Winner
        </Typography>
        {uid !== userid && (
          <IconButton
            size="small"
            color="primary"
            sx={{
              border: "1px solid",
              borderRadius: 2,
            }}
            component={RouterLink}
            to={"/dashboard/chat/" + uid}
          >
            <ChatRounded />
            Send A Message
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

const BidderAccordianStyle = styled(Accordion)(({ theme, bidcolor }) => ({
  padding: theme.spacing(2, 2),
  backgroundColor: alpha(bidcolor, 0.5),
  borderColor: bidcolor,
  alignItems: "center",
  mb: 5,
}));

const BidItem = ({ item, id }) => {
  console.log(id);
  const {
    bidPrice,
    phone,
    email,
    fullname,
    bussiness,
    district,
    createdAt,
    avatar,
  } = item;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <BidderAccordianStyle
      bidcolor={id !== 0 ? "#fff" : "#74CAFF"}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Avatar sx={{ mr: 1 }} src={avatar} alt={fullname} />
        {id === 0 && (
          <Typography variant="subtitle1" sx={{ width: "33%", flexShrink: 0 }}>
            Current Bid Winner
          </Typography>
        )}
        <Typography variant="subtitle1" sx={{ width: "33%", flexShrink: 0 }}>
          {fullname}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Bidding Price : Rs.{bidPrice}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ListItem>
            <ListItemText>
              Bidding time: {fDateTime(parseISO(createdAt))}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Phone : {phone}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>E-mail: {email}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>District: {district}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Business Name: {bussiness}</ListItemText>
          </ListItem>
        </List>
      </AccordionDetails>
    </BidderAccordianStyle>
  );
};

const JoinBidStyle = styled(Card)(({ theme, bidcolor }) => ({
  padding: theme.spacing(2, 2),
  backgroundColor: bidcolor.lighter,
  alignItems: "center",
  mb: 5,
}));

const JoinAccordianStyle = styled(Accordion)(({ theme, bidcolor }) => ({
  padding: theme.spacing(2, 2),
  backgroundColor: bidcolor.light,
  alignItems: "center",
  mb: 5,
}));

const JoinBid = ({
  sendMessage,
  setBidList,
  setBidMap,
  socket,
  uid,
  id,
  oid,
  CurrentPrice,
  color,
  status,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const BidSchema = Yup.object().shape({
    bid: Yup.number()
      .min(CurrentPrice, "Bidding price must be more than The current bid")
      .required("Lot Size is Required"),
  });

  const formik = useFormik({
    initialValues: {
      bid: 0,
    },
    validationSchema: BidSchema,
    onSubmit: (data, actions) => {
      console.log(data);
      sendMessage(socket, {
        lotId: id,
        bidderUid: uid,
        bidPrice: data.bid,
        ownerId: oid,
      });
      setTimeout(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <JoinBidStyle bidcolor={color}>
      <JoinAccordianStyle
        bidcolor={color}
        disabled={status}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<AddCardOutlined />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="subtitle1" sx={{ width: "33%", flexShrink: 0 }}>
            Join Bidding
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Enter the price that you wished to bid</Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container style={{ padding: "20px" }}>
                <Grid item xs={10}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Bidding Price"
                    fullWidth
                    type="bid"
                    {...getFieldProps("bid")}
                    error={Boolean(touched.bid && errors.bid)}
                    helperText={touched.bid && errors.bid}
                  />
                </Grid>
                <Grid xs={1} align="right" ml={2}>
                  <Fab color="primary" aria-label="add" type="submit">
                    <SendRounded />
                  </Fab>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </AccordionDetails>
      </JoinAccordianStyle>
    </JoinBidStyle>
  );
};
