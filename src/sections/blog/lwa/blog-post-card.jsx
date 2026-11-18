import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/routes/components";

import Iconify from "src/components/iconify";

import { formatPostDate } from "./posts";
import BlogImage from "./blog-image";

// ----------------------------------------------------------------------

export default function BlogPostCard({ post, headingLevel = "h3" }) {
  const href = `/blog/${post.slug}`;

  return (
    <Card
      component="article"
      sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        transition: (theme) => theme.transitions.create("box-shadow"),
        "&:hover": { boxShadow: (theme) => theme.customShadows.z16 },
      }}
    >
      <Link component={RouterLink} href={href} tabIndex={-1} aria-hidden>
        <BlogImage post={post} ratio="16/9" />
      </Link>

      <Stack spacing={1.5} sx={{ p: 3, flexGrow: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          spacing={1}
          sx={{ typography: "caption", color: "text.secondary" }}
        >
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: 0.75,
              fontWeight: "fontWeightSemiBold",
              color: "primary.main",
              bgcolor: (theme) => theme.palette.action.selected,
            }}
          >
            {post.category}
          </Box>
          <Box component="time" dateTime={post.date}>
            {formatPostDate(post.date)}
          </Box>
        </Stack>

        <Link
          component={RouterLink}
          href={href}
          color="inherit"
          underline="hover"
        >
          <Typography variant="h5" component={headingLevel}>
            {post.title}
          </Typography>
        </Link>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", flexGrow: 1 }}
        >
          {post.summary}
        </Typography>

        <Box>
          <Button
            component={RouterLink}
            href={href}
            color="primary"
            endIcon={<Iconify icon="carbon:arrow-right" />}
            aria-label={`Read article: ${post.title}`}
            sx={{ px: 0, "&:hover": { bgcolor: "transparent" } }}
          >
            Read Article
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};
