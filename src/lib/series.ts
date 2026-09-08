import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

function isLive(post: BlogPost, now = new Date()): boolean {
  return !post.data.draft && post.data.date.valueOf() <= now.valueOf();
}

/**
 * Posts in a series, ordered by `series.part`. Live site passes nothing and
 * only gets published, past-dated parts. Preview can pass
 * `{ includeUnpublished: true }` so a draft sees its siblings.
 */
export async function seriesParts(
  seriesId: string,
  opts: { includeUnpublished?: boolean } = {}
): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => data.series?.id === seriesId);
  const filtered = opts.includeUnpublished ? posts : posts.filter((post) => isLive(post));
  const sorted = filtered.sort((a, b) => {
    const partDelta = (a.data.series?.part ?? 0) - (b.data.series?.part ?? 0);
    return partDelta || a.data.date.valueOf() - b.data.date.valueOf();
  });

  const seen = new Map<number, string>();
  for (const post of sorted) {
    const part = post.data.series?.part;
    if (part == null) continue;
    const previous = seen.get(part);
    if (previous) {
      console.warn(
        `[series] ${seriesId}: duplicate part ${part} on "${previous}" and "${post.data.permalink}"`
      );
    }
    seen.set(part, post.data.permalink);
  }

  return sorted;
}

/** Short name shown in the series nav. */
export function seriesPartTitle(post: BlogPost): string {
  return post.data.series?.partTitle ?? post.data.title;
}

/** Permalink on the live site; preview routes for drafts and scheduled posts. */
export function seriesHref(post: BlogPost, opts: { preview?: boolean } = {}): string {
  if (opts.preview && !isLive(post)) {
    return `/preview/${post.id}/`;
  }
  return `/${post.data.permalink}/`;
}
