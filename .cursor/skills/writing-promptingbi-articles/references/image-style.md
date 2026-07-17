# PromptingBI Image House Style

Every banner and in-article image must look like it belongs to the same set. This is the spec. It's derived from the existing banners (`unlocking-ai-banner.png`, `diagramming-dax-banner.png`, `governance-agent-banner.png`) and matches the site's brand accent `#14606a`.

## The look in one line

Flat editorial vector infographic, monochrome teal on white, tons of negative space, a calm left-to-right "concept flows into a BI output" narrative. No photos, no 3D, no text.

## Non-negotiables

- **Background:** pure white (`#ffffff`), lots of empty space. Never a colored or dark background.
- **Palette:** monochrome teal only. Anchor on brand teal `#14606a`; use lighter teal tints and a muted slate-gray (`~#6b7a80`) for secondary lines/dots. One or two solid filled silhouettes max; everything else thin line work.
- **Style:** flat 2D vector, editorial/infographic. No photorealism, no 3D renders, no heavy gradients, no drop shadows, no clip-art gloss.
- **Motifs (use 2-3, not all):** flowing connector lines, dotted paths, small circle "nodes"/connection points, light circuit-style routing.
- **Narrative:** left-to-right transformation. An input concept on the left (a prompt bubble, a question, a table set, a boardroom) flows/streams into a BI output on the right (bar chart, ERD, DAX code brackets, a document/folder, a dashboard).
- **BI iconography:** pull from bar charts, ERD table cards, DAX code brackets, documents, folders, a conference table, dashboards. Concrete BI objects, never generic tech clip-art.
- **No text.** No words, labels, letters, or numbers rendered in the image (real DAX/code is abstracted into bracket/line shapes, never legible text).
- **Mood:** quiet, confident, professional. Not busy, not neon, not playful.

## Aspect ratio

- **Banner (`featured`):** the site renders it at `16/9` with `object-fit: cover`, so generate **16:9** and keep the subject centered/safe from edge cropping. (Existing banners are 3:2 and crop acceptably, but 16:9 is the safe target.)
- **In-article section image:** looser. A single tighter diagram concept, 3:2 or 4:3, one idea only, same palette and line style.

## Paste-ready style suffix

Append this to any subject description before generating. It carries the whole house style:

> Flat editorial vector infographic, monochrome teal palette (brand teal #14606a with lighter teal tints and muted slate-gray accents) on a pure white background with generous negative space. Thin clean line work with one or two solid filled silhouettes, connected by flowing lines, dotted paths, and small circular nodes in a subtle circuit style. Calm, professional, minimal. No text, no words, no letters or numbers. No photorealism, no 3D, no drop shadows.

## Two worked prompt patterns

**Banner** (dramatize the article's tension, left→right):
> A [left-side concept, e.g. glowing prompt speech bubble] on the left streaming into [right-side BI output, e.g. a rising bar chart] on the right, connected by flowing data lines and node dots. <style suffix>. 16:9.

**In-article diagram** (one idea, tighter):
> [Single concept, e.g. three ERD table cards converging through a lens into a block of DAX code brackets]. <style suffix>. 3:2.

## Placement of in-article images

- Reference in the markdown body as `![descriptive alt](/images/YYYY/MM/name.png)` right after the section heading or paragraph it illustrates.
- Store the file in `public/images/YYYY/MM/` mirroring the post date (same rule as banners).
- Always write real, descriptive alt text.
- Body images show in markdown preview and on the site; the `featured` banner only shows on the built site (it's frontmatter-only and doubles as the OG image).
