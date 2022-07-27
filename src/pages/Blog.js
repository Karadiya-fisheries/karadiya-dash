import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
  BlogCreate,
} from "../sections/@dashboard/blog";
// mock
import POSTS from "../_mock/blog";
import NoticeService from "../services/notice.service";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

export default function Blog() {
  const [newPost, setNewpost] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    NoticeService.getNotices().then((notices) => {
      const posts = notices.data.map((notice) => ({
        id: notice.NoticeId,
        cover: notice.NoticeCover,
        title: notice.NoticeTitle,
        view: notice.NoticeView,
        text: notice.NoticeText,
        cat: notice.NoticeCat,
        createdAt: notice.createdAt,
        author: {
          name: notice.user.fullname,
          avatarUrl: notice.user.profileUrl,
        },
      }));
      setPost(posts);
    });
  }, []);

  return (
    <Page title="Dashboard: Notices">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Notices
          </Typography>
          <Button
            to={{ pathname: "/dashboard/notices/create", replace: true }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={RouterLink}
          >
            New Post
          </Button>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <BlogPostsSearch posts={post} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {post.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>

      <Container>
        <BlogCreate />
      </Container>
    </Page>
  );
}
