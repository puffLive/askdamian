// Validates every article in src/content/blog and prints what is live,
// scheduled and in draft. Exits with an error if any article is invalid.
// Run with: npm run blog:check
//
// With --due, it also writes due=true|false to $GITHUB_OUTPUT: true when a
// published article's date is today or yesterday (Toronto time), meaning a
// fresh deploy is needed for it to go live. Yesterday is included so a
// skipped scheduled run is caught up the next day.

import fs from 'node:fs';

import { loadAllPosts, selectLivePosts, todayInTimeZone } from './lib.mjs';

const today = todayInTimeZone();
const { posts, errors } = loadAllPosts();

if (errors.length) {
  console.error(`Blog content has ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

const live = selectLivePosts(posts, { today });
const scheduled = posts.filter((p) => p.status === 'published' && p.date > today);
const drafts = posts.filter((p) => p.status === 'draft');

const list = (items) => items.forEach((p) => console.log(`  ${p.date}  /blog/${p.slug}`));

console.log(`Blog check for ${today} (America/Toronto): ${posts.length} article(s), no errors.\n`);
console.log(`Live (${live.length}):`);
list(live);
console.log(`\nScheduled (${scheduled.length}):`);
list(scheduled);
console.log(`\nDrafts, not published (${drafts.length}):`);
list(drafts);

if (process.argv.includes('--due')) {
  const yesterday = todayInTimeZone(undefined, new Date(Date.now() - 24 * 60 * 60 * 1000));
  const due = live.filter((p) => p.date === today || p.date === yesterday);
  console.log(`\nDue for publishing (dated ${yesterday} or ${today}): ${due.length}`);
  list(due);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `due=${due.length > 0}\n`);
  }
}
