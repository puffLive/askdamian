// Live blog articles, newest first.
//
// `virtual:blog-posts` is generated at build time from src/content/blog by
// scripts/blog/vite-plugin-blog.mjs. It only contains articles that are
// published and whose date has arrived, already rendered to HTML.
import { format, parseISO } from "date-fns";

import posts from "virtual:blog-posts";

import {
  SITE_URL,
  SITE_NAME,
  absoluteUrl,
  DEFAULT_SHARE_IMAGE,
} from "./config";

// ----------------------------------------------------------------------

export function getPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function getCategories() {
  return [...new Set(posts.map((post) => post.category))].sort();
}

/** Up to `limit` other articles, same category first, then the most recent. */
export function getRelatedPosts(post, limit = 3) {
  const others = posts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

// Dates are stored as YYYY-MM-DD. parseISO reads them as local dates, so
// they never shift to the previous day in Canadian time zones.
export function formatPostDate(date) {
  return date ? format(parseISO(date), "MMMM d, yyyy") : "";
}

export function articleJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: absoluteUrl(post.image || DEFAULT_SHARE_IMAGE),
    articleSection: post.category,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl(DEFAULT_SHARE_IMAGE) },
    },
  };
}
