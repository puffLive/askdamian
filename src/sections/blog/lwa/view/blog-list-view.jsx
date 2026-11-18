import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import BlogCta from "../blog-cta";
import BlogPostCard from "../blog-post-card";
import { getPosts, getCategories } from "../posts";
import {
  SITE_URL,
  SITE_NAME,
  BLOG_TITLE,
  absoluteUrl,
  BLOG_DESCRIPTION,
  DEFAULT_SHARE_IMAGE,
} from "../config";

// ----------------------------------------------------------------------

const PAGE_SIZE = 12;
const ALL = "All articles";

export default function BlogListView() {
  const posts = getPosts();
  const categories = getCategories();

  const [category, setCategory] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      category === ALL ? posts : posts.filter((p) => p.category === category),
    [category, posts],
  );

  const pageTitle = `${BLOG_TITLE} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}/blog`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={BLOG_DESCRIPTION} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={absoluteUrl(DEFAULT_SHARE_IMAGE)} />
      </Helmet>

      <Box
        component="header"
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: "background.neutral",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            component="p"
            sx={{ color: "primary.main" }}
          >
            Build • Protect • Transfer
          </Typography>
          <Typography variant="h2" component="h1" sx={{ my: 2 }}>
            {BLOG_TITLE}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Plain-language articles on Canadian financial planning: retirement
            and pensions, registered savings plans, insurance, estate planning
            and investing. They are written to help you understand your options
            and ask better questions. They are general education, not advice for
            your specific situation.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {categories.length > 1 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={1}
            sx={{ mb: 6 }}
            role="group"
            aria-label="Filter articles by topic"
          >
            {[ALL, ...categories].map((item) => (
              <Chip
                key={item}
                label={item}
                clickable
                color={item === category ? "primary" : "default"}
                variant={item === category ? "filled" : "outlined"}
                aria-pressed={item === category}
                onClick={() => {
                  setCategory(item);
                  setVisible(PAGE_SIZE);
                }}
              />
            ))}
          </Stack>
        )}

        {filtered.length ? (
          <Box
            component="section"
            aria-label="Articles"
            sx={{
              display: "grid",
              gap: { xs: 3, md: 4 },
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {filtered.slice(0, visible).map((post) => (
              <BlogPostCard key={post.slug} post={post} headingLevel="h2" />
            ))}
          </Box>
        ) : (
          <Typography
            sx={{ textAlign: "center", color: "text.secondary", py: 10 }}
          >
            New articles are on the way. Please check back soon.
          </Typography>
        )}

        {filtered.length > visible && (
          <Stack alignItems="center" sx={{ mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              Show more articles
            </Button>
          </Stack>
        )}

        <Box sx={{ mt: { xs: 8, md: 10 } }}>
          <BlogCta />
        </Box>
      </Container>
    </>
  );
}
