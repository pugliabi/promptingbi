#!/usr/bin/env node
// Two scheduled-content chores, run by the deploy workflow (and available locally
// via `npm run publish-due`):
//
//   1. Auto-publish: any post with `draft: true` whose `date` day has arrived
//      (UTC) gets flipped to `draft: false` so the next build lists it.
//   2. Filename sync: the `YYYY-MM-DD-` prefix on each post file is kept in sync
//      with the front-matter `date`. For posts that are NOT yet live, the
//      `permalink` date prefix is synced too so date/filename/URL stay consistent.
//      Live posts (draft:false AND date already passed) are never re-permalinked —
//      that would break inbound links.
//
// The script only mutates files; committing/pushing is the workflow's job.
import { readdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_DIR = join('src', 'content', 'blog');

const now = new Date();
const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

const frontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
};

const published = [];
const renamed = [];
const repermalinked = [];

for (const file of readdirSync(BLOG_DIR)) {
  if (!file.endsWith('.md')) continue;

  const path = join(BLOG_DIR, file);
  let raw = readFileSync(path, 'utf8');
  const fm = frontmatter(raw);
  if (!fm) continue;

  const dateMatch = fm.match(/^date:\s*(.+?)\s*$/m);
  if (!dateMatch) continue;
  const date = new Date(dateMatch[1]);
  if (Number.isNaN(date.valueOf())) continue;
  const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

  const draftMatch = fm.match(/^draft:\s*(true|false)\s*$/m);
  let isDraft = draftMatch?.[1] === 'true';

  // 1) Auto-publish once the post's day has arrived.
  if (isDraft && dateStr <= todayStr) {
    raw = raw.replace(/^draft:\s*true\s*$/m, 'draft: false');
    writeFileSync(path, raw);
    isDraft = false;
    published.push(file);
  }

  const isLive = !isDraft && date.valueOf() <= now.valueOf();

  // 2a) Sync the permalink date prefix for posts that aren't live yet.
  if (!isLive) {
    const wantPrefix = `${dateStr.replaceAll('-', '/')}/`;
    const permMatch = raw.match(/^(permalink:\s*["']?)(\d{4}\/\d{2}\/\d{2}\/)/m);
    if (permMatch && permMatch[2] !== wantPrefix) {
      raw = raw.replace(
        /^(permalink:\s*["']?)\d{4}\/\d{2}\/\d{2}\//m,
        `$1${wantPrefix}`
      );
      writeFileSync(path, raw);
      repermalinked.push(file);
    }
  }

  // 2b) Sync the filename date prefix with the front-matter date.
  const rest = file.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const expected = `${dateStr}-${rest}`;
  if (expected !== file) {
    renameSync(path, join(BLOG_DIR, expected));
    renamed.push(`${file} -> ${expected}`);
  }
}

if (published.length)
  console.log('Auto-published (draft -> false):\n  ' + published.join('\n  '));
if (repermalinked.length)
  console.log('Permalink date synced:\n  ' + repermalinked.join('\n  '));
if (renamed.length)
  console.log('Filename date synced:\n  ' + renamed.join('\n  '));
if (!published.length && !renamed.length && !repermalinked.length)
  console.log('Nothing due: no drafts to publish and all filenames in sync.');
