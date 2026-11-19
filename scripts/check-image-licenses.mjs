/**
 * Image licence report — site policy: credit alone is NOT permission.
 *
 * Scans every article's frontmatter and reports the licence state of its
 * feature image:
 *   own / stock / permissioned  -> cleared for publication + ad review
 *   ai                          -> decorative use only, must be disclosed
 *   placeholder                 -> generated SVG stand-in, MUST be replaced
 *                                  before applying to any ad network
 * Articles whose feature visual is an official Instagram embed are listed
 * separately (embeds are a supplement, never the only visual evidence).
 *
 * This is a REPORT, not a gate: it always exits 0. The launch gate is a
 * human check — the placeholder count must be 0 before launch.
 *
 * Usage: node scripts/check-image-licenses.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/content/articles');

const files = readdirSync(dir).filter((f) => f.endsWith('.mdx')).sort();
const counts = { own: 0, stock: 0, permissioned: 0, ai: 0, placeholder: 0 };
const placeholders = [];
const embeds = [];
const uncredited = [];

for (const file of files) {
  const text = readFileSync(join(dir, file), 'utf8');
  const fm = text.split('---')[1] ?? '';
  const license = (fm.match(/^imageLicense:\s*(\S+)/m)?.[1] ?? 'placeholder').replace(/['"]/g, '');
  counts[license] = (counts[license] ?? 0) + 1;
  if (license === 'placeholder') placeholders.push(file);
  if (/^instagramUrl:/m.test(fm)) embeds.push(file);
  if ((license === 'stock' || license === 'permissioned') && !/^imageCredit:/m.test(fm)) {
    uncredited.push(file);
  }
}

console.log(`Image licence report — ${files.length} articles`);
for (const [k, v] of Object.entries(counts)) console.log(`  ${k.padEnd(12)} ${v}`);
console.log(`  instagram embeds (supplement only): ${embeds.length}`);
if (placeholders.length) {
  console.log('\nPLACEHOLDER images still to replace before launch/ad applications:');
  for (const f of placeholders) console.log(`  - ${f}`);
}
if (uncredited.length) {
  console.log('\nStock/permissioned images MISSING a visible imageCredit line:');
  for (const f of uncredited) console.log(`  - ${f}`);
}
if (!placeholders.length && !uncredited.length) {
  console.log('\nAll feature images are licensed and credited. Launch gate: PASS.');
}
