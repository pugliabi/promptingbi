import rss from '@astrojs/rss';
import { publishedPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await publishedPosts();
  return rss({
    title: 'Prompting BI',
    description:
      'Where Business Intelligence & Prompt Engineering Meet',
    site: context.site,
    items: posts
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/${post.data.permalink}/`,
      })),
  });
}
