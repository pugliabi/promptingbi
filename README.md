# promptingbi.com

Static rebuild of Prompting BI — recovered from the Wayback Machine after the WordPress install was hacked and the original hosting lapsed. Astro + markdown. No database, no PHP, no admin login: nothing on the site itself to hack.

## One-time setup

```powershell
# 1. Pull the original images from the Wayback Machine (8 files -> public/images/)
powershell -ExecutionPolicy Bypass -File .\download-images.ps1

# 2. Install and preview locally (optional)
npm install
npm run dev        # http://localhost:4321
```

## Writing a new post

Drop a markdown file in `src/content/blog/`:

```markdown
---
title: "My New Post"
date: 2026-07-20T09:00:00Z
permalink: "2026/07/20/my-new-post"
description: "One-sentence teaser shown on the homepage and in RSS."
---

Post content here. Images go in public/images/ and are referenced as /images/...
```

Push to main — the site rebuilds and deploys automatically. Old WordPress URLs (`/YYYY/MM/DD/slug/`) are preserved via the `permalink` field.

## Deploy option A — GitHub Pages (free)

1. Create a GitHub repo (e.g. `promptingbi`), push this folder to `main`
2. Repo → Settings → Pages → Source: **GitHub Actions** (workflow already included at `.github/workflows/deploy.yml`)
3. Settings → Pages → Custom domain: `promptingbi.com` (the `public/CNAME` file is already set); check **Enforce HTTPS** once available

**DNS at Bluehost** (Domains → promptingbi.com → DNS):

| Type  | Host | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | `<your-github-username>.github.io` |

## Deploy option B — Azure Static Web Apps (free tier)

1. Push this repo to GitHub first
2. Azure Portal → Create resource → **Static Web App** → Free plan
3. Connect the GitHub repo/branch; build presets: **Astro** (app location `/`, output location `dist`) — Azure adds its own workflow file
4. After creation: Static Web App → Custom domains → Add `promptingbi.com` and `www.promptingbi.com`, follow the validation steps
5. **DNS at Bluehost:** CNAME `www` → `<your-swa-name>.azurestaticapps.net`; for the apex `promptingbi.com` use the ALIAS/ANAME or A-record target Azure shows during custom-domain validation (TXT record for validation)

Either host works; GitHub Pages is simpler, Azure keeps everything in your Microsoft world. Don't do both at once — pick one, point DNS at it.

## Domain hygiene (what took the old site down)

- Bluehost: keep a **valid card** on file + **auto-renew ON** for both domains (card ending 4736 was expired as of Jul 2026)
- 2FA on Bluehost and GitHub/Azure accounts
- The old `Adminpuglia` password is compromised — never reuse it

## Recovered content provenance

Post/page content extracted July 15, 2026 from web.archive.org snapshots of the original WordPress site (details in the `promptingbi-recovery` package: snapshot URLs in each file's front matter). Tagline typo "Intelligenc" from the original site was fixed. The nav "Contact" link now anchors to the footer contact block (on the old site it was an empty placeholder).
