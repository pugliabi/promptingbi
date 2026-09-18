// Dev-only helper for the /preview/ route.
//
// This lives outside the page because Astro evaluates `getStaticPaths` in its
// own module scope: nothing declared in the page frontmatter is in scope there,
// not even hoisted function declarations. Anything getStaticPaths needs has to
// be imported.
//
// Covers the two folders the blog collection never loads: angles/ (per-episode
// ore) and backlog/ (freeform ideas).

const IDEA_FOLDERS = {
  angles: import.meta.glob('../content/blog/angles/*.md', { eager: true }),
  backlog: import.meta.glob('../content/blog/backlog/*.md', { eager: true }),
} as Record<string, Record<string, any>>;

export const ideaFolderNames = Object.keys(IDEA_FOLDERS);

/** Idea files in a folder, README excluded (it's folder docs, not an idea). */
export function ideaFiles(folder: string) {
  return Object.entries(IDEA_FOLDERS[folder])
    .map(([path, mod]) => ({ file: path.split('/').pop()!.replace(/\.md$/, ''), path, mod }))
    .filter((f) => f.file.toLowerCase() !== 'readme')
    .sort((a, b) => a.file.localeCompare(b.file));
}
