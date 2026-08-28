# Plan: Astro 5.18.2 → 7.2.9

Status: **scoped, not approved to execute.** Tommy deferred this deliberately on 2026-08-28 when the
`npm audit fix` pass was run; that pass took the four patch-level transitive advisories and explicitly
declined `--force`, which would have pulled this major. Nothing in this document has been performed. No
package was installed, no config was edited, no branch was cut.

Author: dependency-maintenance agent, 2026-08-28. Written against the live repo at `f3d61cd`. Read-only
apart from this file.

Claims are labelled. **Measured** means I ran it against this repo or the npm registry during this
investigation. **Documented** means it comes from the official Astro upgrade guides or the config
reference and I did not execute it. **UNVERIFIED** means nobody has checked it and it needs checking
before or during the work. Appendix A is the full ledger.

---

## 1. Why this is worth doing, and why it is not urgent

`npm audit` reports eight advisories against `astro` plus two transitive ones (`esbuild`, `sharp`).
The advisory range on the Astro entry is `<=7.0.9`. **There is no patch on the 5.x line** — the fix
floor for the newest advisory is above 7.0.9, so no 5.x, and no 6.x, release clears it. Staying on
5.18.2 means these ten stay on the report permanently.

That is the entire case. It is a hygiene and currency case, not an incident.

### 1.1 The eight Astro advisories against this site's actual surface

Measured: the "Used here?" column comes from a grep sweep of `src/` for `define:vars`, `transition:`,
`ViewTransitions`, spread attributes (`{...`), named slots, `astro:assets`, and `Astro.glob`.

| Advisory | Vector | npm severity | Fix floor | Used here? |
| --- | --- | --- | --- | --- |
| GHSA-j687-52p2-xcff | XSS in `define:vars` via incomplete `</script>` sanitization | moderate | 6.1.6 | **No.** Zero `define:vars` in the repo. |
| GHSA-8hv8-536x-4wqp | Reflected XSS via unescaped slot name | high | 6.3.3 | **No.** One `<slot />` in `Base.astro`, unnamed and static. |
| GHSA-2pvr-wf23-7pc7 | Host-header SSRF in prerendered error-page fetch | high | 6.4.6 | **No.** Needs a running server to receive a Host header. |
| GHSA-jrpj-wcv7-9fh9 | XSS via unescaped attribute names in spread props | moderate | 6.4.6 | **No.** No spread attributes anywhere. |
| GHSA-xr5h-phrj-8vxv | Server-island encrypted params, cross-component replay | low | 6.1.10 | **No.** No server islands, no adapter. |
| GHSA-7pw4-f3q4-r2p2 | XSS via unescaped `transition:*` values on hydrated islands | low | 7.0.4 | **No.** No `transition:*` directives, no hydrated islands. |
| GHSA-f48w-9m4c-m7f5 | XSS via unescaped spread attr names in `renderHTMLElement` | moderate | 7.0.6 | **No.** As above. |
| GHSA-4g3v-8h47-v7g6 | Reflected XSS via unescaped View Transition animation properties | moderate | >7.0.9 | **No.** No View Transitions. |

**Every one of the eight is inapplicable to this site as built.** The output is fully prerendered static
HTML on GitHub Pages. There is no adapter, no SSR, no server islands, no middleware, no Actions, and no
attacker-controlled input reaching a render path — every value rendered comes from git-tracked front
matter that Tommy wrote. Five of the eight require an XSS sink this repo does not use at all; the SSRF
one requires a server that does not exist in this deployment.

Do not let this get written up as an exposure. The honest framing is: **a static site cannot be
exploited through these, and the reason to upgrade is that the advisories will otherwise sit on the
audit report forever, and the 5.x line is going to stop getting fixes.**

### 1.2 The two transitive ones

| Package | Advisory | Range | Why it is inert here |
| --- | --- | --- | --- |
| `esbuild` | GHSA-g7r4-m6w7-qqqr — arbitrary file read via the **dev server** on Windows | `0.27.3 - 0.28.0` | Only reachable while `npm run dev` is running and something else on the network can reach it. Local authoring only. Real, but bounded to Tommy's machine. |
| `sharp` | GHSA-f88m-g3jw-g9cj — inherited libvips CVEs | `<0.35.0` | Measured: `sharp` is an **optional** dependency of `astro`, used by the default image service. This repo uses no `astro:assets` / `<Image>`; every image is a raw `<img>` against a `public/images/...` path. Nothing in the build hands an image to sharp. |

The esbuild one is the only advisory in the set with a plausible (if narrow) real path to Tommy, and it
is a dev-server concern rather than a site concern.

### 1.3 What each target version actually clears

Measured against the npm registry.

| Target | Astro advisories cleared | `esbuild` | `sharp` | Verdict |
| --- | --- | --- | --- | --- |
| 5.18.2 (current) | 0 of 8 | `^0.27.3` — vulnerable | `^0.33.x` — vulnerable | today |
| **6.4.8** | 5 of 8 | `^0.27.3` — **still vulnerable** | `^0.34.0` — **still vulnerable** | **not a destination** |
| **7.1.0** (first release above the `<=7.0.9` range) | 8 of 8 | `^0.28.x` | `^0.35.x` | UNVERIFIED that 7.1.0 specifically pins the patched ranges; inferred from the advisory floors |
| **7.2.9** (latest) | 8 of 8 | `^0.28.0` → 0.28.2, patched | `^0.35.4`, patched | **the target** |

This table is the strongest argument in the document and it settles §10: **Astro 6 clears none of the
transitive advisories and only five of the eight Astro ones.** Landing on 6 and stopping buys nothing
worth deploying.

---

## 2. Current state

Measured 2026-08-28 against the working tree.

| | Value |
| --- | --- |
| `astro` installed | 5.18.2 (declared `^5.1.0`) |
| `@astrojs/rss` | 4.0.19 (declared `^4.0.11`) |
| `@astrojs/sitemap` | 3.7.3 (declared `^3.2.1`) |
| `pagefind` | 1.5.2 (declared `^1.3.0`, devDependency) |
| Total npm tree | 297 packages |
| Local Node / npm | v24.16.0 / 11.13.0 |
| `engines` in `package.json` | `node >=24.0.0`, `npm >=11.0.0` |
| `.nvmrc` | `24` |
| CI Node | `node-version: 24` via `withastro/action@v6` |
| Pages emitted | 57 HTML files, 258 files total in `dist/` |
| Shiki-highlighted code blocks in `dist/` | 59 |
| `pre.mermaid` blocks in `dist/` | 2 (both on 2024 posts) |
| Git tags | **0** |
| `tsconfig.json` | **absent** |
| `src/env.d.ts` | **absent** |

### 2.1 Two facts from that table that change how the work has to be verified

**There is no `tsconfig.json` and no `src/env.d.ts`.** Astro generates `.astro/types.d.ts`, but with no
`tsconfig.json` nothing in this project is ever type-checked — the `.ts` files in `src/lib/` and the
`satisfies GetStaticPaths` annotation in `src/pages/page/[page].astro` are type-stripped by esbuild and
never validated. `astro check` is not in the build script.

The consequence is specific and important: **Astro 6 upgrades Zod 3 → Zod 4 and changes content-collection
schema typing from generated to inferred, and neither of those can fail this build.** A schema that is
subtly wrong under Zod 4 will type-strip cleanly and either behave differently at runtime or silently
validate differently. A green `npm run build` is unusually weak evidence in this repo. Everything in §8
that checks *output* rather than *exit code* is doing the real work.

**There are 0 git tags.** The rollback point in §9 will be the repo's first tag.

---

## 3. Breaking changes that actually touch this repo

Documented from the official v6 and v7 upgrade guides, then matched against files I read:
`astro.config.mjs`, `package.json`, `src/content.config.ts`, `src/layouts/Base.astro`, all 13 files under
`src/pages/`, `src/lib/posts.ts`, `src/lib/prompts.ts`, the three `src/components/`, and the four
`scripts/*.mjs`.

### 3.1 Astro 6 — relevant

| # | Change | What it hits | Severity |
| --- | --- | --- | --- |
| A1 | **Sätteri/processor groundwork**: `markdown.remarkPlugins` becomes deprecated in favour of `markdown.processor` (available from 6.4.0) | `astro.config.mjs` — the local `remarkMermaid` plugin is passed via `markdown.remarkPlugins` | The pivot point for the whole upgrade. See §4. |
| A2 | **Zod 3 → Zod 4** | `src/content.config.ts` — `z.string().url()` on `source.notion` and `source.youtube` is deprecated in favour of `z.url()`; `z.enum(CATEGORY_IDS as [string, ...string[]])` needs re-checking against Zod 4 enum handling | Medium. Cannot fail the build (§2.1), so must be checked by asserting that a known-bad front matter value still *fails* validation. |
| A3 | **`z` from `astro:content` deprecated** in favour of `astro/zod` | `src/content.config.ts:1` is exactly the deprecated form: `import { defineCollection, z } from 'astro:content'` | Low. Mechanical two-line edit. |
| A4 | **Markdown heading IDs** — `github-slugger` becomes the default; trailing hyphens on headings ending in special characters are no longer stripped | Measured: **8 headings in published posts end in `.` or `?`** (in `dot-ai-folder`, `unlocking-ai-for-power-bi`, `should-an-ai-agent-sit`, `step-zero`, `inside-an-mcp-execution-session`, `hard-data-soft-data`) | Low, and self-contained. Measured: **0 markdown in-page anchor links** in all of `src/content/`, so nothing internal can break. Only external inbound `#anchor` deep links could, and that is unknowable. UNVERIFIED whether these 8 IDs actually change — headings ending in `.`/`?` may slug identically both ways. The `dist/` diff in §8 answers it. |
| A5 | **`<script>` / `<style>` render in source order** (was reversed) | `Base.astro` has one bundled `<script type="module">` (mermaid) and `CodeCopy.astro` contributes a second bundled `<script>` | Low. The two scripts target disjoint selectors (`pre.mermaid` vs `pre:not(.mermaid)`), so order is not load-bearing. `search.astro`'s two scripts are `is:inline` and were never reordered. |
| A6 | **`import.meta.env` values always inlined, never coerced** | `src/pages/preview/[...slug].astro:28` — `if (!import.meta.env.DEV) return [];` is the *only* thing keeping `/preview/` out of `dist/` | Low probability, **high consequence.** `DEV` is a Vite built-in and should stay boolean, but if this gate ever evaluates wrong, every draft and every future-dated post is published. Non-negotiable check in §8. |
| A7 | **File-extension endpoints can no longer be reached with a trailing slash** | `/rss.xml`, `/sitemap-index.xml` | **None.** Measured: zero occurrences of `.xml/` anywhere in `src/`. `Base.astro:44` already links `/rss.xml`. Pre-satisfied. |
| A8 | **Shiki 3 → 4** | `astro.config.mjs` — `shikiConfig: { theme: 'github-dark-default' }`, and 59 code blocks depend on it | Low. Measured: `github-dark-default` is still present in the current `tm-themes` bundle. But `Base.astro`'s CSS keys off `pre:not(.mermaid)` and `pre code`, so any change to the emitted wrapper markup is visible on 59 blocks. Check the rendered HTML, not just that it built. |
| A9 | **`getStaticPaths()` cannot return numeric `params`** | All five `getStaticPaths` implementations | **None.** Measured: every param is a string (`post.data.permalink`, `prompt.id`, `tag`, `post.id`) or `undefined` (`preview` index route, which the guide explicitly still permits). `page/[page].astro` delegates to `paginate()`. Pre-satisfied. |
| A10 | **Legacy content collections removed entirely** | `src/content.config.ts`, `src/lib/*.ts` | **None.** Already fully on the Content Layer API: `glob()` loaders, `render(entry)` imported from `astro:content`, `entry.id` used as the slug, no `type:` field, no `entry.render()`, no `entry.slug`. This is the single biggest v6 breaking change and this repo is already clean of it. |

### 3.2 Astro 7 — relevant

| # | Change | What it hits | Severity |
| --- | --- | --- | --- |
| B1 | **Sätteri replaces remark/rehype as the default Markdown processor**; `@astrojs/markdown-remark` is no longer installed by default | `astro.config.mjs` `remarkPlugins: [remarkMermaid]` | **The one substantive decision in this upgrade.** §4. |
| B2 | **Rust compiler is the only compiler**, and is stricter: unclosed tags now error, and semantically invalid HTML is no longer silently auto-corrected | All 13 `.astro` pages, 3 components, 1 layout | Medium. Everything I read is well-formed, but two spots want a look: `Base.astro:52-60` nests `<picture>`/`<img>` inside `<p class="site-title">` (valid — phrasing content, but the old compiler's tolerance is what it was tested against), and `preview/[...slug].astro:177` uses `<props.mod.Content />`, a dynamic component off a namespace expression, which is the least conventional syntax in the repo. UNVERIFIED how the Rust compiler treats that form. |
| B3 | **Rust compiler CSS serialisation differs** — named colours may become hex, `url()` quoting may change | `Base.astro`'s single 185-line `<style is:global>` block | Cosmetic. Will show up as noise in the `dist/` diff. Expect it; do not chase it. There are no named colours in the block (all hex already), so the diff should be small. |
| B4 | **`compressHTML` default changes `true` → `'jsx'`** — whitespace between inline elements is stripped by JSX rules instead of preserved by HTML rules | Any adjacent inline elements separated by a newline | Low, and mostly pre-mitigated by accident. The nav in `Base.astro:63-67` and the prompt list in `[...permalink].astro:41-43` do separate inline elements by newlines, but in both cases the gap is drawn by CSS (`.site-header nav a { margin: 0 .9rem }`, `.post-prompts li a { margin-right: .4rem }`), not by the HTML space. And whoever wrote `prompts/[...slug].astro` and `prompts/index.astro` already used explicit `{' '}`. Escape hatch if it bites: `compressHTML: true`. |
| B5 | **`src/fetch.ts` is now a reserved filename** | — | **None.** No such file. |
| B6 | **Vite 7 → 8** | — | None expected. No Vite plugins, no `vite` block in the config. |

### 3.3 Present in the changelogs, inapplicable here

Listed so nobody re-researches them. All confirmed absent by grep or by the absence of an adapter.

`@astrojs/db` removal · `astro:transitions` internals (deprecated in 6, removed in 7) · `<ViewTransitions />`
removal · `handleForms` prop · `prefetch({ with })` · `Astro.glob()` removal (`preview/[...slug].astro`
already uses `import.meta.glob`) · `astro:actions` internals · `rewrite()` from Actions context · session
drivers and the session `test` driver · `emitESMImage()` · `getContainerRenderer()` entrypoint move ·
percent-encoding (`%25`) in route filenames · route pathname normalisation / `decodeURI` · image-service
changes (cropping default, no-upscale, SVG rasterisation, `getImage()` on the client, `<Image fit>`) ·
CommonJS config files · `import.meta.env.ASSETS_PREFIX` · i18n routing defaults · and the entire Adapter
and Integration API surface (`SSRManifest`, `NodeApp`, `createExports()`, `RouteData.generate()`,
`astro:ssr-manifest`, `astro:build:done` routes, `astro:build:ssr` entryPoints, `app.render()` signature,
`app.setManifestData()`, Rollup output path, HMR access patterns).

Also inapplicable: **`Astro` inside `getStaticPaths()` is deprecated in v6**, but none of the five
`getStaticPaths` implementations here touch `Astro`. `Base.astro` uses `Astro.site` in frontmatter, which
is unaffected.

### 3.4 `trailingSlash: 'ignore'` — checked specifically, and it is fine

The concern was that this site deliberately relies on internal links carrying a trailing slash
(`/${permalink}/`) while the generated route does not, held together by `trailingSlash: 'ignore'`.

Documented, from the Astro 7 configuration reference: `trailingSlash` is still a **top-level** option,
its type is still `'always' | 'never' | 'ignore'`, `'ignore'` is still the **default**, and the semantics
are unchanged — *"Match URLs regardless of whether a trailing '/' exists."*

Two clarifications worth writing down, because they change how much this actually matters:

1. The v6 upgrade guide refers to `build.trailingSlash` when describing the endpoint change. The config
   reference documents `trailingSlash` at the top level. Treat the guide's phrasing as a docs slip;
   the repo's current top-level placement is correct for 7. UNVERIFIED whether a `build.trailingSlash`
   alias also exists.
2. More importantly, the same reference states that **trailing slashes on prerendered pages are handled
   by the hosting platform** and may not respect the config at all. For a fully static GitHub Pages
   deployment, `trailingSlash` is effectively a dev-server setting. The thing that actually makes
   `/2026/08/28/slug/` resolve to `dist/2026/08/28/slug/index.html` in production is GitHub Pages'
   directory-index behaviour, not Astro. **This upgrade cannot change that**, which is a much stronger
   guarantee than "the config option still exists."

The one real v6 change in this area — file-extension endpoints losing trailing-slash tolerance — is
already satisfied (A7).

---

## 4. The markdown pipeline is the only real decision

Astro 7 renders `.md` with **Sätteri**, its native pipeline, instead of remark/rehype, and stops
installing `@astrojs/markdown-remark` by default. This repo passes a hand-rolled 14-line remark plugin
(`remarkMermaid` in `astro.config.mjs:6-19`) that rewrites ` ```mermaid ` fenced blocks into
`<pre class="mermaid">` so Shiki skips them and the client script in `Base.astro:105-119` can render them.

That plugin is the only thing in the repo coupled to the remark pipeline. Measured, it is load-bearing
for exactly **2 diagrams**, both on 2024 posts (`unlocking-ai-for-power-bi...` and
`diagramming-for-dax-with-generative-ai`). By contrast Shiki carries **59** code blocks. That ratio
should drive the choice.

| Option | What it means | Cost | Ongoing debt |
| --- | --- | --- | --- |
| **C1 — pin `unified()`** | `npm i @astrojs/markdown-remark@7.2.4` (measured: this is the exact optional peer `astro@7.2.9` declares), then `markdown: { processor: unified({ remarkPlugins: [remarkMermaid] }) }` | Lowest. One dependency, one config edit, plugin untouched. | Real. `remarkPlugins` is already documented as deprecated and slated for removal in a future major, so this defers the decision rather than settling it, and adds a dependency that must track Astro's version exactly. |
| **C2 — port to Sätteri** | Install `@astrojs/markdown-satteri`, rewrite `remarkMermaid` as a Sätteri MDAST plugin | Highest. UNVERIFIED — I did not read the Sätteri plugin API, and the package is at **0.3.8**, i.e. pre-1.0, which is a poor thing to bet 59 code blocks on right now. | None once done. |
| **C3 — delete the plugin** | Replace the 2 fenced ` ```mermaid ` blocks with literal `<pre class="mermaid">…</pre>` HTML in those two markdown files. Drop `remarkPlugins` and the plugin from `astro.config.mjs` entirely. Land on default Sätteri with **zero** markdown plugin config. | Low — two content edits and a config deletion. | **None.** |

**Recommendation: C3, with C1 as the fallback if anything about it surprises.** Two diagrams is not
enough content to justify carrying a custom compiler plugin, an extra Astro-version-pinned dependency,
and a deprecated config option across a two-major upgrade. Deleting the plugin removes the single
largest coupling between this repo and Astro's markdown internals, and it makes the whole upgrade a
config-and-verify job instead of a pipeline migration.

Two things to check before committing to C3: that raw `<pre class="mermaid">` HTML passes through
Sätteri untouched (it should — it is literal HTML in a markdown file, not a plugin transform), and that
`markdown.shikiConfig` is still honoured by Sätteri identically. Both are UNVERIFIED and both are
answered by looking at the two mermaid pages and any one code-block page in the built output.

---

## 5. Integration and toolchain compatibility

Measured against the npm registry on 2026-08-28.

| Package | Installed | Latest | Declares `peerDependencies`? | Needs a major bump for Astro 7? |
| --- | --- | --- | --- | --- |
| `@astrojs/rss` | 4.0.19 | **4.0.19** | **No** | **No.** Already at latest. Measured: it depends on `zod@^4.3.6` and `fast-xml-parser@^5.5.7` — i.e. it already ships the Zod 4 that Astro 6 moved to. Strong signal it is current for the 6/7 era. |
| `@astrojs/sitemap` | 3.7.3 | **3.7.3** | **No** | **No.** Already at latest, also on `zod@^4.3.6`. |
| `pagefind` | 1.5.2 | **1.5.2** | No | **No.** Already at latest, and it is a post-build CLI that walks `dist/` HTML — it never imports Astro, so it is version-agnostic by construction. |

The earlier finding that neither Astro integration declares `peerDependencies` is confirmed, so nothing
forces a bump — but the more useful finding is that **both are already on their latest release and both
already carry Zod 4 internally.** There is no integration work in this upgrade. `astro.config.mjs`
imports `sitemap` with no options; `rss.xml.js` calls `rss()` with `title`/`description`/`site`/`items`,
all of which are long-stable.

One caveat: Pagefind already prints a notice that the Default UI (`pagefind-ui.js`, used in
`search.astro`) is superseded by the Component UI as of 1.5.0. It still works and is still supported.
That is unrelated to Astro and should not be bundled into this job.

### 5.1 `astro.config.mjs` — the full set of edits

Documented. Everything else in the file stays.

| Line | Now | After |
| --- | --- | --- |
| 6-19 | `remarkMermaid` plugin definition | deleted under C3 |
| 26 | `remarkPlugins: [remarkMermaid]` | deleted under C3, or `processor: unified({ remarkPlugins: [remarkMermaid] })` under C1 |
| 22 | `site: 'https://promptingbi.com'` | **unchanged — do not touch** |
| 23 | `integrations: [sitemap()]` | unchanged |
| 24 | `trailingSlash: 'ignore'` | unchanged (§3.4) |
| 27 | `shikiConfig: { theme: 'github-dark-default' }` | unchanged, verify output |

---

## 6. Node requirement — already satisfied

Measured from the registry: `astro@7.2.9` declares `engines: { node: '>=22.12.0', npm: '>=9.6.5' }`.
`astro@6.4.8` declares the same. Astro 6 was the release that dropped Node 18 and 20; Astro 7 did not
raise the floor further.

| Requirement | This repo | Margin |
| --- | --- | --- |
| `node >=22.12.0` | `engines.node: '>=24.0.0'`, `.nvmrc` = `24`, CI `node-version: 24`, local v24.16.0 | Two majors of headroom |
| `npm >=9.6.5` | `engines.npm: '>=11.0.0'`, local 11.13.0 | Satisfied |

Confirmed: **no Node work is required.** The uncommitted `engines`/`.nvmrc`/workflow change already in
the tree from the Node 24 pass has, incidentally, pre-cleared this prerequisite. Note that
`engines.node >=24.0.0` is stricter than Astro needs, which is fine and should be left alone.

---

## 7. What to do, in order

Documented. Do not start without Tommy's go.

1. `git tag pre-astro7 && git rev-parse HEAD > /tmp/astro7-rollback` — first tag in the repo (§9).
2. `npm run build`, then snapshot the baseline: the `dist/` file manifest, `dist/rss.xml`, and the
   heading-`id` attributes (§8.1). **Do this before touching anything.**
3. `git switch -c astro-7-upgrade`.
4. **Hop 1 — Astro 6.** `npx @astrojs/upgrade` or `npm i astro@6.4.8`. Apply A3 (`z` from `astro/zod`)
   and A2 (`z.string().url()` → `z.url()`). Build. Diff `dist/`. Triage until the only remaining diffs
   are ones you can name. Commit.
5. **Hop 2 — Astro 7.** `npm i astro@7.2.9`. Apply the §4 decision (C3: delete `remarkMermaid`, inline
   the two `<pre class="mermaid">` blocks). Build. Diff `dist/` against hop 1's output *and* against
   the original baseline. Commit.
6. Work §8 end to end. Only then push.

---

## 8. Verification checklist

A green build is not sufficient proof here, and §2.1 explains why it is weaker in this repo than in
most: nothing type-checks, so Zod and collection-typing regressions cannot fail the build. Everything
below checks output.

### 8.1 The strongest single signal: `dist/` file-list diff

Baseline before starting, compare after each hop:

```powershell
# before
Get-ChildItem dist -Recurse -File | ForEach-Object { $_.FullName.Replace("$PWD\dist\",'') } |
  Sort-Object | Set-Content ..\dist-baseline.txt
# after
Get-ChildItem dist -Recurse -File | ForEach-Object { $_.FullName.Replace("$PWD\dist\",'') } |
  Sort-Object | Set-Content ..\dist-after.txt
Compare-Object (Get-Content ..\dist-baseline.txt) (Get-Content ..\dist-after.txt)
```

Baseline is **258 files, 57 of them HTML.** The list must be **identical** except for hashed
`_astro/*.css` filenames. Any HTML path appearing or disappearing is a routing regression and a stop
signal.

### 8.2 Permalinks resolve at their exact paths

This is the reason `permalink` front matter exists. `src/pages/[...permalink].astro` routes entirely off
`getStaticPaths()`, so a change in collection filtering or path generation silently relocates every
WordPress-era URL and breaks every inbound link. The §8.1 diff catches it wholesale, but assert it
directly too:

- Every published post's `permalink` has a matching `dist/<permalink>/index.html`.
- Spot-check the live post explicitly: `dist/2026/08/28/agents-raise-the-floor-and-lower-the-ceiling/index.html`.
- Spot-check the two oldest, since they carry the oldest inbound links and both use mermaid:
  `dist/2024/07/17/unlocking-ai-for-power-bi-business-intelligence-skills/index.html` and
  `dist/2024/09/11/diagramming-for-dax-with-generative-ai/index.html`.
- `dist/404.html`, `dist/CNAME`, `dist/about/index.html`, `dist/contact/index.html`,
  `dist/page/2/index.html`, `dist/page/3/index.html` all still present.

### 8.3 The future-dated filter still excludes scheduled posts

`publishedPosts()` in `src/lib/posts.ts` filters inside `getCollection('blog', ({ data }) => !data.draft
&& data.date.valueOf() <= now.valueOf())`. Both halves depend on `getCollection`'s predicate contract and
on `date` being coerced to a real `Date` by the schema — which is exactly the Zod 3 → Zod 4 surface (A2).

- No `draft: true` post has a directory in `dist/`.
- No future-dated post has a directory in `dist/`.
- **Add a temporary future-dated `draft: false` post, build, confirm it does not emit, then delete it.**
  Absence of scheduled posts today is not evidence the filter works.
- `publishedPrompts()` in `src/lib/prompts.ts` has the identical shape — check it the same way.

### 8.4 `/preview/` must not leak (A6)

`src/pages/preview/[...slug].astro` returns `[]` from `getStaticPaths()` when `!import.meta.env.DEV`.
That single line is the only thing keeping drafts, scheduled posts, and both unloaded idea folders
(`angles/`, `backlog/`) off the public site. Astro 6 changes `import.meta.env` handling.

- `dist/preview/` **does not exist.** Grep the whole `dist/` tree for `preview` and for `PREVIEW MODE`.
- Then run `npm run dev` and confirm `/preview/` still works, so the gate did not fail the other way.

### 8.5 RSS output unchanged

`src/pages/rss.xml.js` uses `@astrojs/rss` with `context.site` and `link: /${permalink}/`.

- `dist/rss.xml` exists and byte-diffs clean against the baseline, or differs only in ways you can name.
- Item count matches the published-post count; `<link>` values keep their trailing slash.
- `dist/sitemap-index.xml` and its child sitemap still emit (A7 territory).

### 8.6 Pagefind index still builds

Pagefind runs after `astro build` and parses `dist/` HTML, so it is sensitive to markup changes from the
Rust compiler (B2) and from `compressHTML: 'jsx'` (B4).

- `dist/pagefind/` present; baseline is **76 files**.
- Reported page count is still **57**; indexed word count is in the same ballpark (baseline 3,573).
- `data-pagefind-meta="type:Prompt"` (from `prompts/[...slug].astro:23`) still present in output.
- `data-pagefind-ignore` still on the injected copy buttons.

### 8.7 Post ↔ prompts two-way links still render

Generated in both directions and never hand-maintained: `promptsForPost()` feeds the "Prompts and code
from this post" box in `[...permalink].astro:35-49`, and `sourceLinks()` feeds the "From the post"
callout in `prompts/[...slug].astro:34-47`. Both depend on `getCollection` filtering and on
`source.permalink` surviving as `z.union([z.string(), z.array(z.string()).min(1)])` under Zod 4.

- A post with artifacts still renders the box with the right count.
- An artifact page still renders its "From the post" callout with a working href.
- The `[prompts] <id>: source.permalink "…" matches no published post` warning does **not** newly appear.
  If it does, Zod 4 changed how `source` parses — not a content problem.
- `/prompts/` index still groups into category sections with `id={group.id}` anchors intact, and the
  jump-nav links (`#<category-id>`) still match. Those ids are permanent by project rule.

### 8.8 Rendering and markdown correctness

- **59 Shiki blocks**: sample several across posts and `/prompts/`. `<pre>` + `<code>` structure intact,
  `github-dark-default` colours applied, `.code-wrap` copy buttons still injected (they select
  `pre:not(.mermaid)`).
- **2 mermaid diagrams**: both pages still emit `<pre class="mermaid">`, and both still render client-side.
  This is the direct test of the §4 decision.
- **Heading IDs** (A4): diff `id="…"` attributes on `<h2>`/`<h3>` across all 57 pages. Expect changes on
  at most the 8 measured headings; expect none anywhere else.
- **Whitespace** (B4): eyeball the header nav, the prompts list items, the tag pills, and the
  `format-badge`/date line on an artifact page.
- **CSS** (B3): a hashed-filename change in `_astro/*.css` is expected. A *content* diff beyond colour
  serialisation and `url()` quoting is not.

---

## 9. Rollback

Cheap and complete, because this is a static site with no migrations and no state.

1. **Before starting:** `git tag pre-astro7` — this will be the repo's first tag, so also record the SHA
   (`f3d61cd` at time of writing) somewhere outside the repo.
2. **Also copy `package-lock.json` aside**, outside the working tree. The lock is the only file that
   `npm i` will rewrite non-reversibly if the tag is lost.
3. To revert, in order:
   ```powershell
   git switch main                      # abandon the astro-7-upgrade branch
   git restore --source=pre-astro7 -- package.json package-lock.json astro.config.mjs src/content.config.ts
   Remove-Item node_modules -Recurse -Force
   npm ci                               # not npm i — reinstall exactly the restored lock
   npm run build                        # must exit 0 and reproduce the 258-file dist/
   ```
4. If it was already pushed and deployed: revert the merge commit on `main` and push. GitHub Pages
   redeploys from the workflow, so the previous `dist/` is rebuilt from restored source. There is no
   database, no cache to purge, and no CDN invalidation step.

The branch should not be merged until §8 passes. **Do not push the intermediate Astro 6 commit to
`main`** (§10).

---

## 10. Sequencing and effort

### 10.1 Two hops or straight to 7

**Recommendation: two commits on one branch, one deploy.** Land 6.4.8 first, verify, commit; then 7.2.9,
verify, commit; merge once. Never deploy the Astro 6 state.

Reasoning:

- **The two majors fail differently, and attribution is the whole value.** Astro 6 carries the changes
  that alter *output silently* — Zod 4, heading IDs, script/style order, `import.meta.env` inlining,
  Shiki 4. Astro 7 carries the ones that fail *loudly* (Rust compiler errors) or *structurally* (the
  Sätteri swap). Going direct merges a silent-diff class and a loud-failure class into one `dist/` diff,
  and the `dist/` diff is the primary verification instrument (§8.1). Two hops means every diff has one
  candidate cause.
- **§2.1 makes attribution matter more than usual.** With no `tsconfig.json`, the Zod 4 and collection-typing
  changes cannot fail the build. They can only show up as a behavioural difference. Isolating them to a
  single hop is the only cheap way to catch them.
- **`markdown.processor` exists from 6.4.0.** This is the concrete argument. On 6.4.8 the option is
  available while remark is *still the default*, so the markdown pipeline decision (§4) can be made,
  applied, and proven green under Astro 6 — and then Astro 7's default-processor swap becomes a no-op
  rather than a change coupled to everything else in the same hop. That converts the scariest item in
  the upgrade into a non-event.
- **But Astro 6 is not a destination** (§1.3). It clears zero transitive advisories and only five of the
  eight Astro ones. Deploying it buys no security improvement and doubles production exposure for
  nothing. Hence: two commits, one deploy.

The counter-argument for going direct — half the npm churn, one PR, `@astrojs/upgrade` handles both — is
real but only saves perhaps 30 minutes, against losing the ability to say which major changed the output.

### 10.2 Effort

UNVERIFIED — estimates, not measurements. Assumes no surprises and one person working uninterrupted.

| Phase | Work | Estimate |
| --- | --- | --- |
| 0 | Tag, lock backup, baseline snapshots (§7.1-2, §8.1) | 20 min |
| 1 | Hop to 6.4.8; A2 + A3 edits; build; triage `dist/` diff | 1.5-2 h |
| 2 | §4 decision (C3) applied under Astro 6 and proven | 30-45 min |
| 3 | Hop to 7.2.9; build; triage B2/B3/B4 diff noise | 1-2 h |
| 4 | Full §8 checklist, including the temporary future-dated post in §8.3 | 1-1.5 h |
| 5 | Merge, push, watch the Actions run, verify live | 30 min |
| | **Total** | **5-7 h**, one sitting |

Two things could blow that up, both flagged UNVERIFIED above: an unexpected Rust-compiler rejection of
`<props.mod.Content />` in the preview route (B2), and Sätteri not honouring `markdown.shikiConfig` the
way remark did (§4), which would put all 59 code blocks in play. Neither is likely. If either lands,
add half a day.

### 10.3 Prerequisites

- The three uncommitted Node-24 changes in the tree (`engines`, `.nvmrc`, `deploy.yml`) should be
  committed and deployed **first**, so CI is known-green on Node 24 before Astro changes land on top.
  They already satisfy §6.
- Consider adding a `tsconfig.json` and `astro check` **before** the upgrade rather than after. It is a
  small, independent change, and it would turn most of §8.3 and §8.7 from manual output inspection into
  a compile-time check. This is the single highest-leverage thing that could be done to de-risk this
  job, and it is worth doing as its own task.

---

## 11. Open questions and unverified claims

| # | Question | Why it matters | How to settle it |
| --- | --- | --- | --- |
| Q1 | Does Sätteri honour `markdown.shikiConfig` identically to remark? | 59 code blocks, plus `Base.astro` CSS keyed to `pre:not(.mermaid)` / `pre code` | Build under 7 and inspect any code-block page |
| Q2 | Does raw `<pre class="mermaid">` HTML in a `.md` file pass through Sätteri untouched? | Decides whether C3 (§4) is viable | Build under 7, check the two 2024 posts |
| Q3 | Does the Rust compiler accept `<props.mod.Content />` (`preview/[...slug].astro:177`)? | Would break the dev-only preview route | Hop 2 build; dev-only, so it cannot break the live site |
| Q4 | Do the 8 measured headings (A4) actually get different IDs? | Inbound `#anchor` deep links | Diff `id=` attributes across `dist/` |
| Q5 | Does Zod 4 accept `z.enum(CATEGORY_IDS as [string, ...string[]])` unchanged? | `category` validation on all 13 artifacts | Feed a bad category and confirm the build still rejects it |
| Q6 | Is there a `build.trailingSlash` alias, or was the v6 guide's phrasing a slip? | Cosmetic; top-level is documented and current | Read `astro/config` types after hop 1 |
| Q7 | Is 7.1.0 genuinely the minimum that clears all eight advisories? | Only matters if 7.2.x ever has to be avoided | `npm audit` against a 7.1.0 install |

---

## Appendix A — claim ledger

| Claim | Status | Method |
| --- | --- | --- |
| Installed versions: astro 5.18.2, rss 4.0.19, sitemap 3.7.3, pagefind 1.5.2 | Measured | `npm ls --depth=0` |
| 297 packages; Node v24.16.0; npm 11.13.0 | Measured | `npm audit`, `node -v`, `npm -v` |
| `dist/` = 258 files, 57 HTML; pagefind = 76 files; 57 pages / 3,573 words indexed | Measured | `Get-ChildItem`, Pagefind build output |
| 59 Shiki blocks, 2 `pre.mermaid` in `dist/`; 2 mermaid fences in `src/content/` | Measured | grep of `dist/*.html` and `src/content/**/*.md` |
| 8 published-post headings end in `.` or `?`; 0 markdown in-page anchor links | Measured | regex over `src/content/**/*.md` |
| Zero `.xml/` links in `src/` | Measured | grep |
| No `define:vars`, `transition:*`, `ViewTransitions`, spread attrs, named slots, `astro:assets`, `Astro.glob` | Measured | grep of `src/` |
| All `getStaticPaths` params are string or `undefined` | Measured | read all 5 implementations |
| No `tsconfig.json`, no `src/env.d.ts`, 0 git tags | Measured | `Test-Path`, `Glob`, `git tag --list` |
| astro 7.2.9: `node >=22.12.0`, esbuild `^0.28.0`, vite `^8.0.13`, shiki `^4.0.2`, optional sharp `^0.35.4`, optional peer `@astrojs/markdown-remark@7.2.4` | Measured | `npm view astro@7.2.9` |
| astro 6.4.8: esbuild `^0.27.3`, optional sharp `^0.34.0` — both still in advisory range | Measured | `npm view astro@6.4.8` |
| rss 4.0.19 and sitemap 3.7.3 are latest, declare no `peerDependencies`, both depend on `zod@^4.3.6` | Measured | `npm view` |
| `@astrojs/markdown-satteri` is at 0.3.8; `@astrojs/markdown-remark` at 7.2.4 | Measured | `npm view` |
| `github-dark-default` still present in the current Shiki theme bundle | Measured | `tm-themes` index on `shikijs/textmate-grammars-themes` `main` |
| 7.1.0 is the first published 7.x above 7.0.9 | Measured | `npm view astro@7 version --json` |
| `trailingSlash` still top-level, still `'always' \| 'never' \| 'ignore'`, default `'ignore'`, semantics unchanged | Documented | Astro configuration reference |
| Trailing slashes on prerendered pages are the host's responsibility | Documented | Astro configuration reference |
| All v6 and v7 breaking changes in §3 | Documented | official v6 and v7 upgrade guides |
| Advisory titles, severities, and fix floors in §1.1 | Measured | `npm audit --json` |
| Every §1.1 advisory is inapplicable to this site | Measured (usage) + reasoned (impact) | grep sweep + static-output reasoning |
| Effort estimates in §10.2 | **UNVERIFIED** | judgement |
| Q1-Q7 | **UNVERIFIED** | see §11 |
