import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Turn ```mermaid fenced blocks into <pre class="mermaid"> so Shiki leaves them
// alone and the client script in Base.astro can render them. No npm dependency.
function remarkMermaid() {
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const walk = (node) => {
    if (!node || !Array.isArray(node.children)) return;
    node.children.forEach((child, i) => {
      if (child.type === 'code' && child.lang === 'mermaid') {
        node.children[i] = { type: 'html', value: `<pre class="mermaid">${escape(child.value)}</pre>` };
      } else {
        walk(child);
      }
    });
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://promptingbi.com',
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
