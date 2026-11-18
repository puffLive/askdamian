# Publishing blog articles

The blog lives at `/blog` (listing) and `/blog/<slug>` (articles). Every article
is a Markdown file in `src/content/blog/`. Adding an article never requires a new
React page or a navigation change.

## Add an article

1. Copy `src/content/blog/_template.md` to `src/content/blog/<slug>.md`.
2. Fill in the front matter:

   | Field | Required | Notes |
   | --- | --- | --- |
   | `title` | Yes | Shown on the card and as the page heading |
   | `slug` | Yes | Lowercase words and hyphens; becomes `/blog/<slug>` |
   | `date` | Yes | `YYYY-MM-DD`; publication date (Toronto time) |
   | `summary` | Yes | One or two sentences for the card and article intro |
   | `category` | Yes | Reuse an existing category where possible |
   | `status` | Yes | `draft` or `published` |
   | `seoDescription` | Yes | About 155 characters, for search results and link previews |
   | `seoTitle` | No | Shorter title for search results |
   | `updated` | No | `YYYY-MM-DD` when an article is materially revised |
   | `image` / `imageAlt` | No | Image under `public/`, e.g. `/assets/blog/photo.jpg` (keep it under ~200 KB, about 1200 px wide). `imageAlt` is required with an image |
   | `author` | No | Defaults to Damian Alexander |

3. Write the body in Markdown. Use `##` and `###` headings (the title is the
   page's only `#` heading). The disclaimer and booking call to action are added
   automatically.
4. Run `npm run blog:check` to validate, and `npm run dev` to preview.
   To preview drafts locally: `BLOG_SHOW_DRAFTS=true npm run dev`.

## Review and publish

1. Fact-check the article and complete the compliance review (Canadian
   terminology, current limits and rules, no personalized recommendations, no
   guarantees).
2. Commit it on a branch and open a pull request. The **Blog checks** workflow
   validates every article and builds the site; Vercel posts a preview link.
3. The owner approves the pull request and merges it into `main`.
4. Vercel deploys `main` to production. Confirm the article at
   `https://www.legacywealthadvisory.ca/blog/<slug>`.

## Schedule an article

Set `status: published` and a future `date`, then merge it as above. It stays
out of the site (and out of the JavaScript sent to visitors) until a build runs
on or after that date. The **Daily blog publish** workflow runs every morning at
about 6 AM Toronto time and triggers a production deploy whenever an article is
due, so a backlog of approved articles can be released one per day.

It can also be run by hand from the repository's **Actions** tab
(with "force" to redeploy even when nothing is due).

## Edit or unpublish

- **Edit:** change the file, set `updated: YYYY-MM-DD`, and go through a pull request.
- **Unpublish:** set `status: draft` (or delete the file) and merge. The article,
  its page and its sitemap entry disappear on the next deploy.
- **Change a slug:** avoid it once published; old links would stop working.

## What the build produces

`scripts/blog/vite-plugin-blog.mjs` runs as part of `npm run build` and:

- includes only live articles (published and dated today or earlier) in the app,
- writes `dist/sitemap.xml` with the home page, `/blog` and each live article,
- writes `dist/blog.html` and `dist/blog/<slug>.html` with the article's title,
  description, canonical URL, Open Graph tags, structured data and text already
  in the HTML, so search engines and link previews don't depend on JavaScript.
  `cleanUrls` in `vercel.json` serves these at `/blog` and `/blog/<slug>`.

A build fails if any article has invalid metadata, so mistakes are caught in the
pull request rather than on the live site.

## Periodic review

Financial rules change. Each January (after the CRA publishes new limits) and
after each federal budget, review articles that quote dollar limits, rates or
deadlines, update them, and set `updated`.
