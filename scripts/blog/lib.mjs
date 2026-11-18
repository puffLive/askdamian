// Shared, build-time blog helpers.
//
// Articles live as Markdown files in src/content/blog. This module reads them,
// validates their metadata, renders the Markdown to HTML and decides which ones
// are live. It runs in Node only (Vite plugin, sitemap/prerender, CI checks), so
// draft and scheduled articles never reach the browser bundle.

import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export const SITE_URL = 'https://www.legacywealthadvisory.ca';
export const SITE_NAME = 'Legacy Wealth Advisory';
export const BLOG_TIME_ZONE = 'America/Toronto';
export const CONTENT_DIR = path.resolve(process.cwd(), 'src/content/blog');

const REQUIRED_FIELDS = ['title', 'slug', 'date', 'summary', 'category', 'status', 'seoDescription'];
const STATUSES = ['draft', 'published'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ----------------------------------------------------------------------

/** Today's date (YYYY-MM-DD) in the business's time zone. */
export function todayInTimeZone(timeZone = BLOG_TIME_ZONE, now = new Date()) {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/**
 * Minimal front-matter parser for `key: value` pairs between `---` fences.
 * Values may be wrapped in single or double quotes.
 */
export function parseFrontMatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);

  if (!match) {
    return { data: {}, body: raw };
  }

  const data = {};

  match[1].split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const idx = trimmed.indexOf(':');
    if (idx === -1) return;

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  });

  return { data, body: match[2] };
}

function readingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Validate one parsed article. Returns a list of error strings. */
export function validatePost(data, body, file) {
  const errors = [];

  REQUIRED_FIELDS.forEach((field) => {
    if (!data[field]) errors.push(`${file}: missing required field "${field}"`);
  });

  if (data.status && !STATUSES.includes(data.status)) {
    errors.push(`${file}: status must be one of ${STATUSES.join(', ')} (got "${data.status}")`);
  }
  if (data.slug && !SLUG_RE.test(data.slug)) {
    errors.push(`${file}: slug "${data.slug}" must be lowercase letters, numbers and hyphens`);
  }
  ['date', 'updated'].forEach((field) => {
    if (data[field] && !DATE_RE.test(data[field])) {
      errors.push(`${file}: ${field} must be YYYY-MM-DD (got "${data[field]}")`);
    }
  });
  if (data.image && !data.image.startsWith('/')) {
    errors.push(`${file}: image must be a path under /public, e.g. /assets/blog/photo.jpg`);
  }
  if (data.image && !data.imageAlt) {
    errors.push(`${file}: imageAlt is required when an image is set`);
  }
  if (data.image) {
    const imagePath = path.resolve(process.cwd(), 'public', `.${data.image}`);
    if (!fs.existsSync(imagePath)) errors.push(`${file}: image not found at public${data.image}`);
  }
  if (/^#\s/m.test(body)) {
    errors.push(`${file}: use "##" and below in the body; the title is the page's only H1`);
  }
  if (!body.trim()) {
    errors.push(`${file}: article body is empty`);
  }

  return errors;
}

/**
 * Load every article in the content folder.
 * Files whose names start with "_" (like the template) are ignored.
 */
export function loadAllPosts(dir = CONTENT_DIR) {
  if (!fs.existsSync(dir)) return { posts: [], errors: [] };

  const errors = [];
  const posts = [];
  const seen = new Map();

  fs.readdirSync(dir)
    .filter((name) => name.endsWith('.md') && !name.startsWith('_'))
    .sort()
    .forEach((name) => {
      const file = path.join('src/content/blog', name);
      const raw = fs.readFileSync(path.join(dir, name), 'utf8');
      const { data, body } = parseFrontMatter(raw);

      const postErrors = validatePost(data, body, file);
      errors.push(...postErrors);

      if (data.slug) {
        if (seen.has(data.slug)) {
          errors.push(`${file}: slug "${data.slug}" is already used by ${seen.get(data.slug)}`);
        }
        seen.set(data.slug, file);
      }

      if (postErrors.length) return;

      posts.push({
        file,
        slug: data.slug,
        title: data.title,
        date: data.date,
        updated: data.updated || null,
        summary: data.summary,
        category: data.category,
        status: data.status,
        seoTitle: data.seoTitle || data.title,
        seoDescription: data.seoDescription,
        image: data.image || null,
        imageAlt: data.imageAlt || '',
        author: data.author || 'Damian Alexander',
        readingTime: readingTime(body),
        html: marked.parse(body, { gfm: true }),
      });
    });

  return { posts, errors };
}

/**
 * Live articles: status "published" and a publication date on or before today
 * (Toronto time). Articles dated in the future go live on the first build on
 * or after that date, which the daily publish workflow triggers.
 * Sorted newest first.
 */
export function selectLivePosts(posts, { today = todayInTimeZone(), includeDrafts = false } = {}) {
  return posts
    .filter((post) => includeDrafts || (post.status === 'published' && post.date <= today))
    .sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)));
}

export function postUrl(slug) {
  return `${SITE_URL}/blog/${slug}`;
}
