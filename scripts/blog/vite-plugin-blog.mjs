// Vite plugin for the Legacy Wealth Advisory blog.
//
// 1. Serves `virtual:blog-posts`, a module holding only the live articles
//    (already rendered to HTML), so drafts and future-dated articles are never
//    shipped to visitors.
// 2. After a production build, writes:
//    - dist/sitemap.xml with the home page, /blog and every live article
//    - dist/blog.html and dist/blog/<slug>.html (served at /blog and
//      /blog/<slug> thanks to "cleanUrls" in vercel.json): copies of the app
//      shell with the page's title, description, canonical URL, Open Graph tags,
//      structured data and article text already in the HTML, so search engines
//      and link previews see the content without running JavaScript.

import fs from 'node:fs';
import path from 'node:path';

import {
  SITE_URL,
  postUrl,
  SITE_NAME,
  CONTENT_DIR,
  loadAllPosts,
  selectLivePosts,
  todayInTimeZone,
} from './lib.mjs';

const VIRTUAL_ID = 'virtual:blog-posts';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

const BLOG_TITLE = 'Financial Planning Insights';
const BLOG_DESCRIPTION =
  'Educational articles on Canadian financial planning, retirement, pensions, insurance, estate planning and investing from Legacy Wealth Advisory.';
const DEFAULT_IMAGE = '/assets/legacy-images/lwa-logo-512x512.png';

// ----------------------------------------------------------------------

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function absolute(url) {
  return url.startsWith('http') ? url : `${SITE_URL}${url}`;
}

function loadLive({ includeDrafts }) {
  const { posts, errors } = loadAllPosts(CONTENT_DIR);
  if (errors.length) {
    throw new Error(`Blog content has errors:\n  - ${errors.join('\n  - ')}`);
  }
  return selectLivePosts(posts, { includeDrafts, today: todayInTimeZone() });
}

function headTags({ title, description, canonical, image, type, jsonLd, noindex }) {
  // data-rh lets react-helmet-async take these tags over once the app loads,
  // so the page never ends up with two descriptions or canonicals.
  const rh = 'data-rh="true"';
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta ${rh} name="description" content="${escapeHtml(description)}" />`,
    `<link ${rh} rel="canonical" href="${escapeHtml(canonical)}" />`,
    noindex ? `<meta ${rh} name="robots" content="noindex" />` : '',
    `<meta ${rh} property="og:site_name" content="${SITE_NAME}" />`,
    `<meta ${rh} property="og:type" content="${type}" />`,
    `<meta ${rh} property="og:title" content="${escapeHtml(title)}" />`,
    `<meta ${rh} property="og:description" content="${escapeHtml(description)}" />`,
    `<meta ${rh} property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta ${rh} property="og:image" content="${escapeHtml(absolute(image))}" />`,
    `<meta ${rh} name="twitter:card" content="summary_large_image" />`,
    jsonLd
      ? `<script ${rh} type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n    ');
}

export function articleJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: postUrl(post.slug),
    image: absolute(post.image || DEFAULT_IMAGE),
    articleSection: post.category,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: absolute(DEFAULT_IMAGE) },
    },
  };
}

function renderShell(shell, head, bodyHtml) {
  const withoutTitle = shell
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, '');

  // The static article is replaced by the React app as soon as it starts.
  const fallback = `<div style="max-width:760px;margin:0 auto;padding:32px 16px;font-family:'Public Sans',sans-serif;line-height:1.6">${bodyHtml}</div>`;

  return withoutTitle
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
}

function writeFile(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

function buildSitemap(posts) {
  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'monthly', priority: '1.0' },
    { loc: `${SITE_URL}/blog`, lastmod: posts[0]?.updated || posts[0]?.date, changefreq: 'daily', priority: '0.8' },
    ...posts.map((post) => ({
      loc: postUrl(post.slug),
      lastmod: post.updated || post.date,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeHtml(u.loc)}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function prerender(outDir, posts) {
  const shellPath = path.join(outDir, 'index.html');
  const shell = fs.readFileSync(shellPath, 'utf8');

  // Blog listing
  const listHtml = [
    `<h1>${BLOG_TITLE}</h1>`,
    `<p>${escapeHtml(BLOG_DESCRIPTION)}</p>`,
    '<ul>',
    ...posts.map(
      (post) =>
        `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a> <small>(${post.date}, ${escapeHtml(post.category)})</small><br />${escapeHtml(post.summary)}</li>`
    ),
    '</ul>',
  ].join('\n');

  writeFile(
    path.join(outDir, 'blog.html'),
    renderShell(
      shell,
      headTags({
        title: `${BLOG_TITLE} | ${SITE_NAME}`,
        description: BLOG_DESCRIPTION,
        canonical: `${SITE_URL}/blog`,
        image: DEFAULT_IMAGE,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${BLOG_TITLE} | ${SITE_NAME}`,
          url: `${SITE_URL}/blog`,
          description: BLOG_DESCRIPTION,
        },
      }),
      listHtml
    )
  );

  // Articles
  posts.forEach((post) => {
    const articleHtml = [
      `<p><a href="/blog">&larr; ${BLOG_TITLE}</a></p>`,
      '<article>',
      `<h1>${escapeHtml(post.title)}</h1>`,
      `<p><small>${escapeHtml(post.category)} &middot; ${post.date}</small></p>`,
      post.html,
      '</article>',
    ].join('\n');

    writeFile(
      path.join(outDir, 'blog', `${post.slug}.html`),
      renderShell(
        shell,
        headTags({
          title: `${post.seoTitle} | ${SITE_NAME}`,
          description: post.seoDescription,
          canonical: postUrl(post.slug),
          image: post.image || DEFAULT_IMAGE,
          type: 'article',
          jsonLd: articleJsonLd(post),
        }),
        articleHtml
      )
    );
  });

  writeFile(path.join(outDir, 'sitemap.xml'), buildSitemap(posts));
}

// ----------------------------------------------------------------------

export default function blogPlugin() {
  let config;
  let isBuild = false;

  return {
    name: 'lwa-blog',

    configResolved(resolved) {
      config = resolved;
      isBuild = resolved.command === 'build';
    },

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },

    load(id) {
      if (id !== RESOLVED_ID) return null;

      // Drafts can be previewed locally with BLOG_SHOW_DRAFTS=true npm run dev.
      // They are never included in a production build.
      const includeDrafts = !isBuild && process.env.BLOG_SHOW_DRAFTS === 'true';
      const posts = loadLive({ includeDrafts }).map(({ file, ...post }) => post);

      if (fs.existsSync(CONTENT_DIR)) {
        fs.readdirSync(CONTENT_DIR).forEach((name) => this.addWatchFile(path.join(CONTENT_DIR, name)));
      }

      return `export default ${JSON.stringify(posts)};`;
    },

    handleHotUpdate({ file, server }) {
      if (!file.startsWith(CONTENT_DIR)) return undefined;
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) server.moduleGraph.invalidateModule(mod);
      server.ws.send({ type: 'full-reload' });
      return [];
    },

    closeBundle() {
      if (!isBuild || config.build.ssr) return;
      const outDir = path.resolve(config.root, config.build.outDir);
      if (!fs.existsSync(path.join(outDir, 'index.html'))) return;

      const posts = loadLive({ includeDrafts: false });
      prerender(outDir, posts);
      config.logger.info(`\n[lwa-blog] ${posts.length} live article(s); wrote sitemap.xml and prerendered blog pages.`);
    },
  };
}
