import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { RouterLink } from "src/routes/components";

import Iconify from "src/components/iconify";
import Markdown from "src/components/markdown";

import BlogCta from "../blog-cta";
import BlogImage from "../blog-image";
import BlogPostCard from "../blog-post-card";
import BlogDisclaimer from "../blog-disclaimer";
import {
  SITE_URL,
  SITE_NAME,
  BLOG_TITLE,
  absoluteUrl,
  DEFAULT_SHARE_IMAGE,
} from "../config";
import {
  getPostBySlug,
  formatPostDate,
  articleJsonLd,
  getRelatedPosts,
} from "../posts";

// ----------------------------------------------------------------------

function BackToBlog() {
  return (
    <Button
      component={RouterLink}
      href="/blog"
      startIcon={<Iconify icon="carbon:arrow-left" />}
      sx={{ px: 0, "&:hover": { bgcolor: "transparent" } }}
    >
      Back to {BLOG_TITLE}
    </Button>
  );
}

function PostNotFound() {
  return (
    <Container
      maxWidth="sm"
      sx={{ py: { xs: 10, md: 15 }, textAlign: "center" }}
    >
      <Helmet>
        <title>{`Article not found | ${SITE_NAME}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Typography variant="h3" component="h1" paragraph>
        We couldn&apos;t find that article
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        It may have moved or is no longer available. You can browse all of our
        articles on the blog.
      </Typography>
      <Button
        component={RouterLink}
        href="/blog"
        variant="contained"
        size="large"
      >
        Browse all articles
      </Button>
    </Container>
  );
}

export default function BlogPostView() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <PostNotFound />;
  }

  const related = getRelatedPosts(post);
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const pageTitle = `${post.seoTitle} | ${SITE_NAME}`;
  const shareImage = absoluteUrl(post.image || DEFAULT_SHARE_IMAGE);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={shareImage} />
        <meta property="article:published_time" content={post.date} />
        {post.updated && (
          <meta property="article:modified_time" content={post.updated} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd(post))}
        </script>
      </Helmet>

      <Container maxWidth="md" sx={{ pt: { xs: 4, md: 6 } }}>
        <Breadcrumbs aria-label="Breadcrumb" sx={{ typography: "body2" }}>
          <Link component={RouterLink} href="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} href="/blog" color="inherit">
            Blog
          </Link>
          <Typography
            variant="body2"
            color="text.primary"
            aria-current="page"
            noWrap
            sx={{ maxWidth: { xs: 160, sm: 360 } }}
          >
            {post.title}
          </Typography>
        </Breadcrumbs>

        <Box component="article" sx={{ mt: { xs: 4, md: 6 } }}>
          <Stack spacing={2} component="header">
            <Typography
              variant="overline"
              component="p"
              sx={{ color: "primary.main" }}
            >
              {post.category}
            </Typography>
            <Typography variant="h2" component="h1">
              {post.title}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: "text.secondary", fontWeight: 400 }}
            >
              {post.summary}
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              columnGap={2}
              sx={{ typography: "body2", color: "text.secondary" }}
            >
              <span>By {post.author}</span>
              <span>
                Published{" "}
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>
              {post.updated && post.updated !== post.date && (
                <span>
                  Updated{" "}
                  <time dateTime={post.updated}>
                    {formatPostDate(post.updated)}
                  </time>
                </span>
              )}
              <span>{post.readingTime} min read</span>
            </Stack>
          </Stack>

          <Box
            sx={{ my: { xs: 4, md: 6 }, borderRadius: 2, overflow: "hidden" }}
          >
            <BlogImage post={post} ratio="21/9" />
          </Box>

          <Markdown
            content={post.html}
            sx={{
              "& h2": { typography: "h4", mt: 5, mb: 2 },
              "& h3": { typography: "h5", mt: 4, mb: 1.5 },
              "& p": { mb: 2.5, lineHeight: 1.8 },
              "& ul, & ol": { pl: 3, mb: 2.5 },
              "& li": { lineHeight: 1.8 },
              "& table": {
                width: 1,
                mb: 3,
                borderCollapse: "collapse",
                typography: "body2",
              },
              "& th, & td": {
                p: 1.5,
                textAlign: "left",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
          />

          <Box sx={{ mt: 6 }}>
            <BlogDisclaimer />
          </Box>
        </Box>

        <Box sx={{ my: 6 }}>
          <BlogCta />
        </Box>

        <Box sx={{ pb: related.length ? 0 : 8 }}>
          <BackToBlog />
        </Box>
      </Container>

      {related.length > 0 && (
        <Box
          sx={{ bgcolor: "background.neutral", py: { xs: 8, md: 10 }, mt: 8 }}
        >
          <Container>
            <Typography variant="h3" component="h2" sx={{ mb: 5 }}>
              Related articles
            </Typography>
            <Box
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
              {related.map((item) => (
                <BlogPostCard key={item.slug} post={item} headingLevel="h3" />
              ))}
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}
