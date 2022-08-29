import { useParams } from "react-router-dom";
// @mui
import {
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  Fab,
  Grid,
  ListItemText,
  Divider,
  Avatar,
  ListItem,
  List,
  ListItemIcon,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import SendRounded from "@mui/icons-material/SendRounded";
// hooks
// components
import { Form, FormikProvider, useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import Page from "../components/Page";
//import AuthSocial from "../sections/auth/AuthSocial";
import { SendOutlined, SettingsSuggestRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import AuthService from "../services/auth.service";
import ChatService from "../services/chat.service";
import { SocketContext } from "../services/socket.context";
import statService from "../services/stat.service";
import { fDateTime } from "../utils/formatTime";
import { parseISO } from "date-fns";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const RegisterStyle = styled("div")(({ theme }) => ({
  maxWidth: 640,
  padding: theme.spacing(1, 1),
}));

// ----------------------------------------------------------------------

export default function Chat() {
  const [message, setMessage] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const uid = AuthService.getCurrentUser().uid;
  const socket = useContext(SocketContext);

  const sendMessage = (socket, packet) => {
    socket.emit("sendMessage", packet);
  };

  useEffect(() => {
    statService.getUserById(id).then((user) => {
      setUser(user.data);
    });
    ChatService.getChatById({
      sid: uid,
      rid: id,
    }).then((chats) => {
      const list = chats.data.map((chat) => ({
        message: chat.ChatMes,
        date: chat.createdAt,
        align: chat.ChatReci === id ? "right" : "left",
      }));
      setMessageList(list);
    });
  }, []);

  useEffect(() => {
    socket.on("recieveMessage", (arg) => {
      setMessageList((messageList) => [
        ...messageList,
        {
          message: arg.ChatMes,
          date: arg.createdAt,
          align: "left",
        },
      ]);
    });
    console.log(message);
  }, []);

  const formik = useFormik({
    initialValues: {
      chat: "",
    },
    onSubmit: (data, actions) => {
      sendMessage(socket, {
        sid: uid,
        rid: id,
        message: data.chat,
      });
      setMessageList((messageList) => [
        ...messageList,
        {
          message: data.chat,
          date: new Date(),
          align: "right",
        },
      ]);
      setTimeout(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      }, 2000);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;
  return (
    <Page title="Chat">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Chat
          </Typography>
        </Stack>
        <RegisterStyle>
          <Stack direction={"column"} spacing={4}>
            <Grid
              container
              component={Paper}
              sx={{ width: "100%", height: "80vh" }}
            >
              <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
                <List>
                  <ListItem button key={user.fullname}>
                    <ListItemIcon>
                      <Avatar alt={user.fullname} src={user.profileUrl} />
                    </ListItemIcon>
                    <ListItemText primary={user.fullname}></ListItemText>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={9}>
                <List sx={{ height: "70vh", overflowY: "auto" }}>
                  {messageList.map((m) => (
                    <ChatItem item={m} />
                  ))}
                  {console.log(messageList)}
                </List>
                <Divider />
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container style={{ padding: "20px" }}>
                      <Grid item xs={11}>
                        <TextField
                          id="outlined-basic-email"
                          label="Type Something"
                          fullWidth
                          type="chat"
                          {...getFieldProps("chat")}
                        />
                      </Grid>
                      <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" type="submit">
                          <SendRounded />
                        </Fab>
                      </Grid>
                    </Grid>
                  </Form>
                </FormikProvider>
              </Grid>
            </Grid>
          </Stack>
        </RegisterStyle>
      </Container>
    </Page>
  );
}

const ChatItem = (item) => {
  const { align, message, date } = item.item;
  console.log(message);
  return (
    <ListItem key="3">
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={align} primary={message}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={align}
            secondary={fDateTime(parseISO(date))}
          ></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};
