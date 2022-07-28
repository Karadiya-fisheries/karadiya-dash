import { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Container,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
// components
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import noticeService from "../../../services/notice.service";
// utils
import { fDate } from "../../../utils/formatTime";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

const CoverImgStyle = styled("img")({
  objectFit: "contain",
});

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState({
    NoticeTitle: "",
    NoticeCover: "",
    NoticeCat: "",
    NoticeText: "",
    createdAt: "3/4/2000",
    user: {
      fullname: "",
      profileUrl: "",
      email: "",
    },
  });
  useEffect(() => {
    noticeService.getNoticeById(id).then((notice) => {
      setPost(notice.data);
    });
  }, []);
  return (
    <Page title="Dashboard: Notices">
      <Container>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={3} direction="column">
            <Typography variant="h2" sx={{ fontFamily: "serif" }}>
              {post.NoticeTitle}
            </Typography>
            <CoverImgStyle alt={post.NoticeTitle} src={post.NoticeCover} />
            <Stack direction="row" spacing={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: () => alpha("#adbdcc", 0.1),
                  borderRadius: 3,
                }}
              >
                <Typography variant="caption" sx={{ fontStyle: "oblique" }}>
                  Created By:
                </Typography>
                <Avatar alt={post.user.fullname} src={post.user.profileUrl} />

                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ color: "text.disabled", display: "block" }}
                >
                  {post.user.fullname}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ color: "text.disabled", display: "block" }}
                >
                  {post.user.email}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ color: "text.disabled", display: "block" }}
                >
                  {fDate(post.createdAt)}
                </Typography>
              </Box>
              <Paper>
                <Typography paragraph={true}>{post.NoticeText}</Typography>
              </Paper>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Page>
  );
}
