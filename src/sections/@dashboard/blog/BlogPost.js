import { useState, useEffect } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Container,
  Stack,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
// components
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import noticeService from "../../../services/notice.service";
import authService from "../../../services/auth.service";
// utils
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import { IntegrationInstructionsRounded } from "@mui/icons-material";
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    NoticeTitle: "",
    NoticeCover: "",
    NoticeCat: "",
    NoticeText: "",
    createdAt: "3/4/2000",
    user: {
      uid: "",
      fullname: "",
      profileUrl: "",
      email: "",
    },
  });

  const [cover, setCover] = useState("");
  useEffect(() => {
    noticeService.getNoticeById(id).then((notice) => {
      setPost(notice.data);
      if (!notice.data.NoticeCover) {
        setCover("");
        return;
      } else if (notice.data.NoticeCover === "auto") {
        if (notice.data.NoticeCat === "Notice") {
          setCover("/static/mock-images/covers/Notice.png");
        }
        if (notice.data.NoticeCat === "Article") {
          setCover("/static/mock-images/covers/Article.jpg");
        }
      } else {
        setCover(notice.data.NoticeCover);
      }

      noticeService
        .setView(id, { NoticeView: parseInt(notice.data.NoticeView) + 1 })
        .then((res) => console.log(res));
    });

    console.log(cover);
  }, []);
  return (
    <Page title="Dashboard: Notices">
      <Container>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={3} direction="column">
            <Typography variant="h2" sx={{ fontFamily: "serif" }}>
              {post.NoticeTitle}
            </Typography>
            <CoverImgStyle alt={post.NoticeTitle} src={cover} />
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
                <Box color="text.disabled">
                  <Iconify
                    icon={"eva:eye-fill"}
                    sx={{ width: 16, height: 16, mr: 0.5 }}
                  />
                  <Typography variant="caption">
                    {fShortenNumber(post.NoticeView)}
                  </Typography>

                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      noticeService.deleteNotice(post.NoticeId).then((res) => {
                        navigate("/dashboard/notices", {
                          replace: true,
                        });
                      });
                    }}
                  >
                    <DeleteIcon
                      visibility={
                        post.user.uid === authService.getCurrentUser.uid
                          ? "hidden"
                          : "visible"
                      }
                    />
                  </IconButton>
                </Box>
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
