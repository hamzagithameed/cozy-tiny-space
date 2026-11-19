/**
 * Builds public/search-index.json from the article MDX files.
 * Runs as part of `npm run build` (after `astro build`).
 * The search page uses Pagefind when its index exists, and falls back
 * to this JSON index otherwise.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/content/articles');

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[kv[1]] = v;
  }
  return out;
}

function stripMarkdown(text) {
  return text
    .replace(/^---\n[\s\S]*?\n---/, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*`_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const index = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith('.mdx')).sort()) {
  const raw = readFileSync(join(dir, file), 'utf8');
  const fm = parseFrontmatter(raw);
  if (fm.draft === 'true') continue;
  const slug = file.replace(/\.mdx$/, '');
  const body = stripMarkdown(raw);
  index.push({
    url: `/${fm.category}/${slug}/`,
    title: fm.title || slug,
    excerpt: (fm.description || body.slice(0, 160)).slice(0, 200),
    category: fm.category || '',
    text: body.slice(0, 2000),
  });
}

writeFileSync(join(root, 'public/search-index.json'), JSON.stringify(index));
console.log(`Search index: ${index.length} articles -> public/search-index.json`);
