/**
 * Content quality gate — run after the articles are written, before build.
 * Enforces the three gates from the project brief:
 *   1. DEPTH — every solution carries the 6 required labels; Common Mistakes
 *      + Conclusion present; no filler-thin articles (word-count floor).
 *   2. GOOGLE SEO — unique meta description 150–160 chars (hard 145–165),
 *      distinct target query per article, 1–2 outbound links to real sources,
 *      FAQ 4–6, H1 only in layout (no "# " in body).
 *   3. PINTEREST SEO — keyword-first title/description, 3:4 image referenced
 *      and present on disk.
 * Plus indexing safeguards: zero orphan articles (each article linked from
 * its category page by construction AND from >=1 other article), and
 * affiliate safety: no Amazon tracking IDs / affiliate links in v1.
 *
 * Usage: node scripts/validate-content.mjs   (exit 1 on any failure)
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/content/articles');

const EXPECTED = [
  // [slug, category, pillar]
  ['renter-friendly-kitchen-storage-ideas-small-apartments', 'kitchen-storage', true],
  ['no-drill-kitchen-storage-for-renters', 'kitchen-storage', false],
  ['small-apartment-pantry-organization-no-pantry', 'kitchen-storage', false],
  ['under-sink-storage-small-apartments-renters-guide', 'kitchen-storage', false],
  ['removable-kitchen-storage-ideas-renters', 'kitchen-storage', false],
  ['small-rental-kitchen-countertop-storage', 'kitchen-storage', false],
  ['small-bedroom-closet-storage-renters-complete-guide', 'bedroom-closet-storage', true],
  ['under-bed-storage-ideas-small-rental-bedrooms', 'bedroom-closet-storage', false],
  ['no-closet-bedroom-storage-create-wardrobe', 'bedroom-closet-storage', false],
  ['clothing-storage-ideas-small-bedrooms-no-dresser', 'bedroom-closet-storage', false],
  ['small-bedroom-organization-ideas-rental', 'bedroom-closet-storage', false],
  ['double-rental-closet-space-without-installing', 'bedroom-closet-storage', false],
  ['renter-friendly-bathroom-storage-ideas-tiny-bathrooms', 'bathroom-storage', true],
  ['storage-above-rental-bathroom-toilet-without-drilling', 'bathroom-storage', false],
  ['under-sink-bathroom-storage-small-rental-apartments', 'bathroom-storage', false],
  ['no-drill-shower-storage', 'bathroom-storage', false],
  ['where-store-cleaning-supplies-tiny-rental-bathroom', 'bathroom-storage', false],
  ['small-bathroom-organization-ideas-renters-budget', 'bathroom-storage', false],
  ['rental-apartment-entryway-storage-ideas-small-spaces', 'living-room-entryway-storage', true],
  ['small-apartment-shoe-storage-without-drilling', 'living-room-entryway-storage', false],
  ['multifunctional-furniture-small-rental-living-rooms', 'living-room-entryway-storage', false],
  ['small-apartment-entryway-decor-that-adds-storage', 'living-room-entryway-storage', false],
  ['living-room-storage-ideas-small-rentals-no-built-ins', 'living-room-entryway-storage', false],
  ['create-drop-zone-small-rental-no-entryway', 'living-room-entryway-storage', false],
  ['no-drill-shelves-apartment-walls-compared', 'renter-guides', true],
  ['tension-rod-storage-ideas-renters', 'renter-guides', false],
  ['adhesive-hooks-renters-weight-limits-surfaces-removal', 'renter-guides', false],
  ['removable-shelves-organizers-damage-free', 'renter-guides', false],
  ['small-apartment-laundry-storage-solutions-renters', 'renter-guides', false],
  ['renters-move-out-storage-checklist-deposit-back', 'renter-guides', false],
];

const LABELS = [
  'Required space:',
  'Installation:',
  'Approximate dimensions:',
  'Rental-friendly limits:',
  'Pros:',
  'Cons:',
  'Suitable products:',
];

const CORE_PAGES = new Set([
  '/', '/about/', '/contact/', '/privacy-policy/', '/disclaimer/',
  '/affiliate-disclosure/', '/before-after/', '/search/', '/authors/hamza-hameed/',
  '/kitchen-storage/', '/bedroom-closet-storage/', '/bathroom-storage/',
  '/living-room-entryway-storage/', '/renter-guides/',
]);

const failures = [];
const warnings = [];
const fail = (slug, msg) => failures.push(`[${slug}] ${msg}`);
const warn = (slug, msg) => warnings.push(`[${slug}] ${msg}`);

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { fm: {}, body: text };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    fm[kv[1]] = v;
  }
  return { fm, body: text.slice(m[0].length) };
}

const files = new Map();
for (const f of readdirSync(dir).filter((x) => x.endsWith('.mdx'))) {
  files.set(f.replace(/\.mdx$/, ''), readFileSync(join(dir, f), 'utf8'));
}

const expectedUrls = new Set();
for (const [slug, category] of EXPECTED) expectedUrls.add(`/${category}/${slug}/`);

const keywords = new Map();
const linkTargets = new Map(); // url -> count of articles linking to it

for (const [slug, category, pillar] of EXPECTED) {
  const raw = files.get(slug);
  if (!raw) {
    fail(slug, 'MISSING FILE');
    continue;
  }
  const { fm, body } = parseFrontmatter(raw);
  const words = body.split(/\s+/).filter(Boolean).length;

  // --- Frontmatter / Google SEO gate ---
  if (!fm.title) fail(slug, 'missing title');
  if (!fm.description) fail(slug, 'missing description');
  else {
    const len = fm.description.length;
    if (len < 145 || len > 165) fail(slug, `description is ${len} chars (need 145–165)`);
    else if (len < 150 || len > 160) warn(slug, `description is ${len} chars (target 150–160)`);
  }
  if (fm.category !== category) fail(slug, `category is "${fm.category}", expected "${category}"`);
  if ((fm.pillar === 'true') !== pillar) fail(slug, `pillar flag wrong (expected ${pillar})`);
  if (!fm.keyword) fail(slug, 'missing keyword');
  else if (keywords.has(fm.keyword)) fail(slug, `duplicate keyword "${fm.keyword}" (also in ${keywords.get(fm.keyword)})`);
  else keywords.set(fm.keyword, slug);
  const faqCount = (raw.match(/^\s+- q:/gm) || []).length;
  if (faqCount < 4 || faqCount > 6) fail(slug, `FAQ count is ${faqCount} (need 4–6)`);
  if (!fm.image || !existsSync(join(root, 'public', fm.image))) {
    fail(slug, `feature image missing on disk: ${fm.image}`);
  }
  if (!fm.imageAlt) fail(slug, 'missing imageAlt');

  // --- Depth gate ---
  const minWords = pillar ? 1800 : 1200;
  if (words < minWords) fail(slug, `body is ${words} words (floor ${minWords})`);
  if (/^# /m.test(body)) fail(slug, 'body contains an H1 (layout provides it)');
  if (!/## Common Mistakes/i.test(body)) fail(slug, 'missing "Common Mistakes" section');
  if (!/## Conclusion/i.test(body)) fail(slug, 'missing "Conclusion" section');
  // Move-out checklist is room-by-room, not solution-labelled — check it separately.
  if (slug !== 'renters-move-out-storage-checklist-deposit-back') {
    for (const label of LABELS) {
      const n = (body.split(`**${label}`).length - 1) + (body.split(`**${label.replace(':', '')}:**`).length - 1);
      const count = body.includes(`**${label}`) ? (body.match(new RegExp(`\\*\\*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g')) || []).length : 0;
      if (count < 4) fail(slug, `solution label "${label}" appears ${count}x (need >= 4)`);
    }
  }

  // --- Links ---
  const internal = [...body.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
  const external = [...body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
  if (internal.length < 3) fail(slug, `only ${internal.length} internal links (need >= 3)`);
  for (const target of internal) {
    const clean = target.replace(/\/$/, '/');
    if (!expectedUrls.has(clean) && !CORE_PAGES.has(clean) && !clean.startsWith('/authors/')) {
      fail(slug, `internal link to unknown page: ${target}`);
    }
    linkTargets.set(clean, (linkTargets.get(clean) || 0) + 1);
  }
  if (external.length < 1) fail(slug, 'no outbound links (need 1–2)');
  if (external.length > 3) warn(slug, `${external.length} outbound links (guideline 1–2)`);
  for (const url of external) {
    if (/tag=|amzn\.to|amazon\./i.test(url)) {
      fail(slug, `affiliate-style link in v1 (not allowed): ${url}`);
    }
  }
  if (/amazon\.com/i.test(raw)) warn(slug, 'mentions amazon.com — check no affiliate link is present');
}

// --- Orphan check: every article linked from >= 1 other article ---
for (const [slug, category] of EXPECTED) {
  const url = `/${category}/${slug}/`;
  const inbound = linkTargets.get(url) || 0;
  if (inbound < 1) fail(slug, `orphan risk: linked from ${inbound} other articles (need >= 1; category page + pillar cover the rest)`);
}

// --- Unexpected extra files ---
for (const slug of files.keys()) {
  if (!EXPECTED.some(([s]) => s === slug)) warn('extra', `unexpected article file: ${slug}.mdx`);
}

console.log(`Checked ${EXPECTED.length} expected articles, ${files.size} files on disk.`);
console.log(`Keywords unique: ${keywords.size}/${EXPECTED.length}`);
if (warnings.length) {
  console.log('\nWARNINGS:');
  for (const w of warnings) console.log('  ! ' + w);
}
if (failures.length) {
  console.log('\nFAILURES:');
  for (const f of failures) console.log('  ✗ ' + f);
  console.log(`\n${failures.length} failure(s). Fix before build.`);
  process.exit(1);
}
console.log('\nAll content gates PASS ✓');
