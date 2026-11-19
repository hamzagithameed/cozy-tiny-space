/**
 * Generates original local SVG illustrations for the site.
 * v1 PLACEHOLDERS ONLY — see README "Image policy": replace with original
 * phone photos before launch (best), or free-licensed Unsplash/Pexels stock.
 * Never hotlink images; never reuse Instagram/social photos.
 *
 * Feature images are 900x1200 (3:4 portrait) as the structure doc requires.
 * Run: npm run images
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => join(root, 'public', p);

const INK = '#1c1917';
const MUTED = '#78716c';
const PAPER = '#faf7f1';
const CARD = '#ffffff';
const LINE = '#e7dfd3';
const ACCENT = '#b4532a';
const ACCENT_DARK = '#8f3f1e';
const SOFT = '#f6e9df';
const GRAY = '#a8a29e';

const ARTICLES = [
  // slug, category, title
  ['renter-friendly-kitchen-storage-ideas-small-apartments', 'kitchen-storage', '12 Renter-Friendly Kitchen Storage Ideas for Small Apartments (Without Drilling)'],
  ['no-drill-kitchen-storage-for-renters', 'kitchen-storage', 'No-Drill Kitchen Storage for Renters: 9 Damage-Free Fixes'],
  ['small-apartment-pantry-organization-no-pantry', 'kitchen-storage', 'Small Apartment Pantry Organization When You Have No Pantry'],
  ['under-sink-storage-small-apartments-renters-guide', 'kitchen-storage', 'Under-Sink Storage for Small Apartments: A Renter\u2019s Guide'],
  ['removable-kitchen-storage-ideas-renters', 'kitchen-storage', 'Removable Kitchen Storage Ideas for Renters That Actually Stay Put'],
  ['small-rental-kitchen-countertop-storage', 'kitchen-storage', 'Small Rental Kitchen Countertop Storage: Free Up Space Without Cabinets'],
  ['small-bedroom-closet-storage-renters-complete-guide', 'bedroom-closet-storage', 'Small Bedroom Closet Storage for Renters: The Complete Guide'],
  ['under-bed-storage-ideas-small-rental-bedrooms', 'bedroom-closet-storage', 'Under-Bed Storage Ideas for Small Rental Bedrooms'],
  ['no-closet-bedroom-storage-create-wardrobe', 'bedroom-closet-storage', 'No-Closet Bedroom Storage: How to Create a Wardrobe Without One'],
  ['clothing-storage-ideas-small-bedrooms-no-dresser', 'bedroom-closet-storage', 'Clothing Storage Ideas for Small Bedrooms With No Dresser'],
  ['small-bedroom-organization-ideas-rental', 'bedroom-closet-storage', 'Small Bedroom Organization Ideas That Work in a Rental'],
  ['double-rental-closet-space-without-installing', 'bedroom-closet-storage', 'How to Double Your Rental Closet Space Without Installing Anything'],
  ['renter-friendly-bathroom-storage-ideas-tiny-bathrooms', 'bathroom-storage', 'Renter-Friendly Bathroom Storage Ideas for Tiny Bathrooms'],
  ['storage-above-rental-bathroom-toilet-without-drilling', 'bathroom-storage', 'How to Add Storage Above a Rental Bathroom Toilet Without Drilling'],
  ['under-sink-bathroom-storage-small-rental-apartments', 'bathroom-storage', 'Under-Sink Bathroom Storage for Small Rental Apartments'],
  ['no-drill-shower-storage', 'bathroom-storage', 'No-Drill Shower Storage That Does Not Fall Down'],
  ['where-store-cleaning-supplies-tiny-rental-bathroom', 'bathroom-storage', 'Where to Store Cleaning Supplies in a Tiny Rental Bathroom'],
  ['small-bathroom-organization-ideas-renters-budget', 'bathroom-storage', 'Small Bathroom Organization Ideas for Renters on a Budget'],
  ['rental-apartment-entryway-storage-ideas-small-spaces', 'living-room-entryway-storage', 'Rental Apartment Entryway Storage Ideas for Small Spaces'],
  ['small-apartment-shoe-storage-without-drilling', 'living-room-entryway-storage', 'Small Apartment Shoe Storage Without Drilling'],
  ['multifunctional-furniture-small-rental-living-rooms', 'living-room-entryway-storage', 'Multifunctional Furniture for Small Rental Living Rooms'],
  ['small-apartment-entryway-decor-that-adds-storage', 'living-room-entryway-storage', 'Small Apartment Entryway Decor That Adds Storage'],
  ['living-room-storage-ideas-small-rentals-no-built-ins', 'living-room-entryway-storage', 'Living Room Storage Ideas for Small Rentals With No Built-Ins'],
  ['create-drop-zone-small-rental-no-entryway', 'living-room-entryway-storage', 'How to Create a Drop Zone in a Small Rental With No Entryway'],
  ['no-drill-shelves-apartment-walls-compared', 'renter-guides', 'No-Drill Shelves for Apartment Walls: Every Method Compared'],
  ['tension-rod-storage-ideas-renters', 'renter-guides', 'Tension Rod Storage Ideas for Renters Beyond the Curtain'],
  ['adhesive-hooks-renters-weight-limits-surfaces-removal', 'renter-guides', 'Adhesive Hooks for Renters: Weight Limits, Surfaces and Removal'],
  ['removable-shelves-organizers-damage-free', 'renter-guides', 'Removable Shelves and Organizers: What Is Actually Damage-Free?'],
  ['small-apartment-laundry-storage-solutions-renters', 'renter-guides', 'Small Apartment Laundry Storage Solutions for Renters'],
  ['renters-move-out-storage-checklist-deposit-back', 'renter-guides', 'The Renter\u2019s Move-Out Storage Checklist: Getting Your Deposit Back'],
];

const CATEGORIES = [
  ['kitchen-storage', 'Kitchen Storage', 'Pantry, cabinets, countertops and under-sink fixes for rental kitchens.'],
  ['bedroom-closet-storage', 'Bedroom & Closet Storage', 'Wardrobes, under-bed storage and clothing organization for small rental bedrooms.'],
  ['bathroom-storage', 'Bathroom Storage', 'No-drill shelves, over-toilet storage and under-sink organization for tiny bathrooms.'],
  ['living-room-entryway-storage', 'Living Room & Entryway Storage', 'Shoe storage, multifunctional furniture and drop zones for small rentals.'],
  ['renter-guides', 'Renter-Friendly Solutions', 'Adhesive hooks, tension rods and removable shelves — the methods behind every fix.'],
];

const CATEGORY_LABEL = {
  'kitchen-storage': 'Kitchen Storage',
  'bedroom-closet-storage': 'Bedroom & Closet',
  'bathroom-storage': 'Bathroom Storage',
  'living-room-entryway-storage': 'Living Room & Entryway',
  'renter-guides': 'Renter-Friendly Solutions',
};

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Simple word wrap for SVG <text> (no auto-wrap in SVG).
function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

/* ---------- Category motifs (line art, 772x520 scene) ---------- */
function motif(category) {
  const s = 'stroke="' + INK + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const a = 'stroke="' + ACCENT + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const fA = 'fill="' + ACCENT + '"';
  const fS = 'fill="' + SOFT + '"';
  const fW = 'fill="' + CARD + '"';
  switch (category) {
    case 'kitchen-storage':
      return `<rect x="70" y="60" width="632" height="400" rx="24" ${fW} stroke="${LINE}" stroke-width="3"/>
<line x1="110" y1="180" x2="662" y2="180" ${s}/><line x1="140" y1="180" x2="140" y2="220" ${s}/><line x1="632" y1="180" x2="632" y2="220" ${s}/>
<rect x="150" y="110" width="70" height="70" rx="10" ${fS} stroke="${ACCENT}" stroke-width="4"/><rect x="245" y="100" width="70" height="80" rx="10" ${fS} stroke="${ACCENT}" stroke-width="4"/><rect x="340" y="115" width="70" height="65" rx="10" ${fS} stroke="${ACCENT}" stroke-width="4"/><rect x="520" y="105" width="90" height="75" rx="10" ${fA} opacity="0.9"/>
<line x1="110" y1="300" x2="662" y2="300" ${a}/><circle cx="200" cy="300" r="10" ${fA}/><circle cx="330" cy="300" r="10" ${fA}/><circle cx="460" cy="300" r="10" ${fA}/><circle cx="590" cy="300" r="10" ${fA}/>
<path d="M200 310 v40 a18 18 0 0 0 36 0 v-40" ${s}/><path d="M330 310 v40 a18 18 0 0 0 36 0 v-40" ${s}/><path d="M460 310 v40 a18 18 0 0 0 36 0 v-40" ${s}/>
<line x1="70" y1="420" x2="702" y2="420" ${s}/><rect x="150" y="360" width="180" height="60" rx="8" ${fS} stroke="${INK}" stroke-width="4"/><rect x="430" y="350" width="150" height="70" rx="8" ${fW} stroke="${ACCENT}" stroke-width="4"/>`;
    case 'bedroom-closet-storage':
      return `<rect x="70" y="60" width="632" height="400" rx="24" ${fW} stroke="${LINE}" stroke-width="3"/>
<rect x="110" y="90" width="230" height="330" rx="12" ${fS} stroke="${INK}" stroke-width="4"/><line x1="225" y1="90" x2="225" y2="420" ${s}/><line x1="130" y1="150" x2="320" y2="150" ${a}/><path d="M160 150 v50 M150 150 h20 M160 200 l-14 26 h28 z" ${s}/><path d="M250 150 v50 M240 150 h20 M250 200 l-14 26 h28 z" ${s}/><rect x="130" y="330" width="190" height="60" rx="8" ${fW} stroke="${ACCENT}" stroke-width="4"/>
<rect x="390" y="280" width="280" height="140" rx="12" ${fW} stroke="${INK}" stroke-width="4"/><rect x="390" y="280" width="280" height="46" rx="12" ${fA} opacity="0.9"/><circle cx="430" cy="255" r="26" ${fW} stroke="${INK}" stroke-width="4"/><rect x="470" y="240" width="90" height="40" rx="20" ${fS} stroke="${INK}" stroke-width="4"/><rect x="420" y="380" width="220" height="40" rx="8" ${fS} stroke="${ACCENT}" stroke-width="4"/>`;
    case 'bathroom-storage':
      return `<rect x="70" y="60" width="632" height="400" rx="24" ${fW} stroke="${LINE}" stroke-width="3"/>
<rect x="280" y="80" width="212" height="150" rx="60" ${fS} stroke="${INK}" stroke-width="4"/><path d="M386 250 v30" ${a}/><path d="M360 280 q26 -22 52 0" ${a}/><path d="M300 330 q86 -40 172 0 q0 70 -86 70 q-86 0 -86 -70" ${fW} stroke="${INK}" stroke-width="4"/>
<line x1="110" y1="180" x2="250" y2="180" ${s}/><rect x="120" y="120" width="34" height="60" rx="8" ${fA}/><rect x="168" y="105" width="34" height="75" rx="8" ${fS} stroke="${ACCENT}" stroke-width="4"/><rect x="216" y="125" width="30" height="55" rx="8" ${fS} stroke="${ACCENT}" stroke-width="4"/>
<line x1="520" y1="180" x2="660" y2="180" ${s}/><circle cx="560" cy="180" r="9" ${fA}/><path d="M560 189 v34 a14 14 0 0 0 28 0 v-34" ${s}/><path d="M620 189 v44" ${s}/><rect x="606" y="233" width="28" height="60" rx="8" ${fA}/>`;
    case 'living-room-entryway-storage':
      return `<rect x="70" y="60" width="632" height="400" rx="24" ${fW} stroke="${LINE}" stroke-width="3"/>
<rect x="110" y="230" width="330" height="110" rx="16" ${fW} stroke="${INK}" stroke-width="4"/><rect x="110" y="230" width="330" height="54" rx="16" ${fA} opacity="0.9"/><rect x="140" y="170" width="70" height="60" rx="10" ${fS} stroke="${INK}" stroke-width="4"/><rect x="330" y="170" width="70" height="60" rx="10" ${fS} stroke="${INK}" stroke-width="4"/><line x1="110" y1="340" x2="110" y2="420" ${s}/><line x1="440" y1="340" x2="440" y2="420" ${s}/>
<rect x="480" y="90" width="180" height="330" rx="10" ${fS} stroke="${INK}" stroke-width="4"/><circle cx="640" cy="200" r="9" ${fA}/><circle cx="640" cy="280" r="9" ${fA}/><path d="M500 350 h140 M500 390 h140" ${a}/><path d="M520 350 l-14 26 h28 z M560 350 l-14 26 h28 z M600 350 l-14 26 h28 z" ${s}/>`;
    default: // renter-guides
      return `<rect x="70" y="60" width="632" height="400" rx="24" ${fW} stroke="${LINE}" stroke-width="3"/>
<circle cx="180" cy="140" r="46" ${fS} stroke="${ACCENT}" stroke-width="4"/><path d="M162 140 l12 12 l24 -26" ${a}/><text x="180" y="230" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="${INK}">no drill</text>
<line x1="300" y1="140" x2="660" y2="140" ${a}/><circle cx="300" cy="140" r="12" ${fA}/><circle cx="660" cy="140" r="12" ${fA}/><path d="M380 140 v44 M370 140 h20 M380 184 l-13 24 h26 z" ${s}/><path d="M500 140 v44 M490 140 h20 M500 184 l-13 24 h26 z" ${s}/>
<line x1="330" y1="300" x2="660" y2="300" ${s}/><line x1="360" y1="300" x2="360" y2="420" ${s}/><line x1="630" y1="300" x2="630" y2="420" ${s}/><line x1="330" y1="360" x2="660" y2="360" ${s}/><rect x="380" y="312" width="70" height="48" rx="8" ${fA}/><rect x="480" y="312" width="70" height="48" rx="8" ${fS} stroke="${ACCENT}" stroke-width="4"/><rect x="400" y="372" width="180" height="48" rx="8" ${fW} stroke="${INK}" stroke-width="4"/>`;
  }
}

function articleSvg(slug, category, title) {
  const lines = wrap(title, 26);
  const lineHeight = 66;
  const titleBlock = lines
    .map((l, i) => `<text x="64" y="${700 + i * lineHeight}" font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="600" fill="${INK}">${esc(l)}</text>`)
    .join('\n');
  const titleHeight = lines.length * lineHeight;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200" role="img" aria-label="${esc(title)}">
<rect width="900" height="1200" fill="${PAPER}"/>
<rect x="0" y="0" width="900" height="14" fill="${ACCENT}"/>
<g transform="translate(64,52)">${motif(category)}</g>
<text x="64" y="640" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="${ACCENT}">${esc(CATEGORY_LABEL[category].toUpperCase())}</text>
${titleBlock}
<line x1="64" y1="${700 + titleHeight + 30}" x2="180" y2="${700 + titleHeight + 30}" stroke="${ACCENT}" stroke-width="5"/>
<text x="64" y="${700 + titleHeight + 84}" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="2" fill="${MUTED}">COZY TINY SPACE · RENTER-FRIENDLY</text>
</svg>`;
}

function categorySvg(slug, name, tagline) {
  const nameLines = wrap(name, 22);
  const tagLines = wrap(tagline, 42);
  const nameBlock = nameLines
    .map((l, i) => `<text x="64" y="${700 + i * 70}" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="600" fill="${INK}">${esc(l)}</text>`)
    .join('\n');
  const tagBlock = tagLines
    .map((l, i) => `<text x="64" y="${700 + nameLines.length * 70 + 44 + i * 36}" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="${MUTED}">${esc(l)}</text>`)
    .join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200" role="img" aria-label="${esc(name)}">
<rect width="900" height="1200" fill="${PAPER}"/>
<rect x="0" y="0" width="900" height="14" fill="${ACCENT}"/>
<g transform="translate(64,52)">${motif(slug)}</g>
<text x="64" y="640" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="${ACCENT}">COZY TINY SPACE</text>
${nameBlock}
${tagBlock}
</svg>`;
}

function heroSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="Small rental apartment with organized shelves and storage">
<rect width="1600" height="900" fill="${PAPER}"/>
<rect x="0" y="0" width="1600" height="12" fill="${ACCENT}"/>
<text x="80" y="170" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="5" fill="${ACCENT}">RENTER-FRIENDLY SMALL SPACE ORGANIZATION</text>
<text x="80" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="600" fill="${INK}">More storage in your</text>
<text x="80" y="360" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="600" fill="${INK}">small rental —</text>
<text x="80" y="450" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="600" fill="${ACCENT}">without drilling.</text>
<text x="80" y="540" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${MUTED}">No damage. No lost deposit. Just more room.</text>
<g transform="translate(880,110)"><rect x="0" y="0" width="640" height="620" rx="28" fill="${CARD}" stroke="${LINE}" stroke-width="3"/>
<line x1="60" y1="170" x2="580" y2="170" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><rect x="90" y="90" width="80" height="80" rx="10" fill="${SOFT}" stroke="${ACCENT}" stroke-width="4"/><rect x="200" y="75" width="80" height="95" rx="10" fill="${SOFT}" stroke="${ACCENT}" stroke-width="4"/><rect x="420" y="85" width="110" height="85" rx="10" fill="${ACCENT}" opacity="0.9"/>
<line x1="60" y1="330" x2="580" y2="330" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/><circle cx="150" cy="330" r="11" fill="${ACCENT}"/><circle cx="300" cy="330" r="11" fill="${ACCENT}"/><circle cx="450" cy="330" r="11" fill="${ACCENT}"/><path d="M150 341 v44 a20 20 0 0 0 40 0 v-44" stroke="${INK}" stroke-width="6" fill="none"/><path d="M300 341 v44 a20 20 0 0 0 40 0 v-44" stroke="${INK}" stroke-width="6" fill="none"/><path d="M450 341 v44 a20 20 0 0 0 40 0 v-44" stroke="${INK}" stroke-width="6" fill="none"/>
<line x1="40" y1="500" x2="600" y2="500" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><rect x="100" y="430" width="200" height="70" rx="8" fill="${SOFT}" stroke="${INK}" stroke-width="4"/><rect x="360" y="420" width="170" height="80" rx="8" fill="${CARD}" stroke="${ACCENT}" stroke-width="4"/></g>
<text x="80" y="830" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="2" fill="${MUTED}">COZY TINY SPACE</text>
</svg>`;
}

/* ---------- Before / After scenes (1200x900) ---------- */
function baScene(kind, after) {
  const clutter = after ? INK : GRAY;
  const accent = after ? ACCENT : GRAY;
  if (kind === 'kitchen') {
    const items = after
      ? `<rect x="180" y="420" width="220" height="180" rx="10" fill="${SOFT}" stroke="${INK}" stroke-width="5"/><line x1="180" y1="510" x2="400" y2="510" stroke="${INK}" stroke-width="5"/><rect x="210" y="450" width="60" height="60" rx="8" fill="${ACCENT}"/><rect x="300" y="440" width="60" height="70" rx="8" fill="${SOFT}" stroke="${ACCENT}" stroke-width="4"/><rect x="700" y="430" width="200" height="170" rx="10" fill="${CARD}" stroke="${INK}" stroke-width="5"/><circle cx="760" cy="400" r="14" fill="${ACCENT}"/><circle cx="840" cy="400" r="14" fill="${ACCENT}"/><path d="M760 414 v40 M840 414 v40" stroke="${INK}" stroke-width="5"/>`
      : `<rect x="150" y="470" width="120" height="130" rx="8" fill="${GRAY}" opacity="0.55" transform="rotate(-8 210 535)"/><rect x="300" y="440" width="110" height="160" rx="8" fill="${GRAY}" opacity="0.45" transform="rotate(6 355 520)"/><circle cx="560" cy="520" r="55" fill="${GRAY}" opacity="0.5"/><rect x="680" y="480" width="90" height="120" rx="8" fill="${GRAY}" opacity="0.55" transform="rotate(-5 725 540)"/><rect x="820" y="450" width="130" height="150" rx="8" fill="${GRAY}" opacity="0.4" transform="rotate(9 885 525)"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="${PAPER}"/><rect x="120" y="180" width="960" height="60" rx="10" fill="${CARD}" stroke="${LINE}" stroke-width="3"/><line x1="60" y1="600" x2="1140" y2="600" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>${items}<text x="60" y="820" font-family="Georgia, serif" font-size="44" font-weight="600" fill="${MUTED}">${after ? 'After — riser, hooks and bins' : 'Before — everything on the counter'}</text></svg>`;
  }
  if (kind === 'closet') {
    const items = after
      ? `<line x1="200" y1="280" x2="1000" y2="280" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><line x1="200" y1="470" x2="1000" y2="470" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/><path d="M280 280 v60 M270 280 h20 M280 340 l-16 30 h32 z" stroke="${INK}" stroke-width="5" fill="none"/><path d="M480 280 v60 M470 280 h20 M480 340 l-16 30 h32 z" stroke="${INK}" stroke-width="5" fill="none"/><path d="M680 280 v60 M670 280 h20 M680 340 l-16 30 h32 z" stroke="${INK}" stroke-width="5" fill="none"/><path d="M880 280 v60 M870 280 h20 M880 340 l-16 30 h32 z" stroke="${INK}" stroke-width="5" fill="none"/><rect x="250" y="520" width="200" height="120" rx="10" fill="${SOFT}" stroke="${ACCENT}" stroke-width="4"/><rect x="500" y="520" width="200" height="120" rx="10" fill="${CARD}" stroke="${INK}" stroke-width="4"/><rect x="750" y="520" width="200" height="120" rx="10" fill="${SOFT}" stroke="${ACCENT}" stroke-width="4"/>`
      : `<line x1="200" y1="280" x2="1000" y2="280" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M260 280 v70 M240 280 h40 M260 350 l-30 60 h60 z" stroke="${GRAY}" stroke-width="5" fill="none"/><path d="M420 280 v70 M400 280 h40 M420 350 l-30 60 h60 z" stroke="${GRAY}" stroke-width="5" fill="none"/><path d="M580 280 v70 M560 280 h40 M580 350 l-30 60 h60 z" stroke="${GRAY}" stroke-width="5" fill="none"/><path d="M740 280 v70 M720 280 h40 M740 350 l-30 60 h60 z" stroke="${GRAY}" stroke-width="5" fill="none"/><path d="M900 280 v70 M880 280 h40 M900 350 l-30 60 h60 z" stroke="${GRAY}" stroke-width="5" fill="none"/><rect x="250" y="560" width="220" height="90" rx="10" fill="${GRAY}" opacity="0.45" transform="rotate(-4 360 605)"/><rect x="520" y="580" width="220" height="90" rx="10" fill="${GRAY}" opacity="0.4" transform="rotate(5 630 625)"/><rect x="790" y="555" width="200" height="90" rx="10" fill="${GRAY}" opacity="0.45"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="${PAPER}"/><rect x="120" y="120" width="960" height="580" rx="24" fill="${CARD}" stroke="${LINE}" stroke-width="3"/>${items}<text x="60" y="820" font-family="Georgia, serif" font-size="44" font-weight="600" fill="${MUTED}">${after ? 'After — double rod, dividers, boxes' : 'Before — one rod, everything piled'}</text></svg>`;
  }
  // bathroom
  const items = after
    ? `<rect x="380" y="150" width="440" height="220" rx="90" fill="${SOFT}" stroke="${INK}" stroke-width="5"/><path d="M600 400 v40" stroke="${ACCENT}" stroke-width="7"/><path d="M560 440 q40 -32 80 0" stroke="${ACCENT}" stroke-width="6" fill="none"/><path d="M480 500 q120 -56 240 0 q0 90 -120 90 q-120 0 -120 -90" fill="${CARD}" stroke="${INK}" stroke-width="5"/><line x1="180" y1="280" x2="340" y2="280" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><rect x="190" y="220" width="40" height="60" rx="8" fill="${ACCENT}"/><rect x="245" y="205" width="40" height="75" rx="8" fill="${SOFT}" stroke="${ACCENT}" stroke-width="4"/><line x1="860" y1="280" x2="1020" y2="280" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><rect x="880" y="220" width="40" height="60" rx="8" fill="${ACCENT}"/><rect x="935" y="205" width="40" height="75" rx="8" fill="${SOFT}" stroke="${ACCENT}" stroke-width="4"/>`
    : `<rect x="380" y="150" width="440" height="220" rx="90" fill="${CARD}" stroke="${GRAY}" stroke-width="5"/><path d="M600 400 v40" stroke="${GRAY}" stroke-width="7"/><path d="M480 500 q120 -56 240 0 q0 90 -120 90 q-120 0 -120 -90" fill="${CARD}" stroke="${GRAY}" stroke-width="5"/><rect x="420" y="430" width="60" height="90" rx="8" fill="${GRAY}" opacity="0.5" transform="rotate(-7 450 475)"/><rect x="520" y="420" width="55" height="100" rx="8" fill="${GRAY}" opacity="0.45" transform="rotate(5 548 470)"/><rect x="620" y="435" width="60" height="85" rx="8" fill="${GRAY}" opacity="0.5" transform="rotate(-4 650 478)"/><rect x="720" y="425" width="55" height="95" rx="8" fill="${GRAY}" opacity="0.4" transform="rotate(8 748 472)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="${PAPER}"/>${items}<text x="60" y="820" font-family="Georgia, serif" font-size="44" font-weight="600" fill="${MUTED}">${after ? 'After — shelves and organizers in place' : 'Before — everything crowded on the sink'}</text></svg>`;
}

function write(rel, content) {
  const p = out(rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
}

let count = 0;
for (const [slug, category, title] of ARTICLES) {
  write(`images/${category}/${slug}.svg`, articleSvg(slug, category, title));
  count++;
}
for (const [slug, name, tagline] of CATEGORIES) {
  write(`images/categories/${slug}.svg`, categorySvg(slug, name, tagline));
  count++;
}
write('images/hero-home.svg', heroSvg());
count++;
for (const kind of ['kitchen-counter', 'closet', 'bathroom-shelf']) {
  const scene = kind === 'kitchen-counter' ? 'kitchen' : kind === 'closet' ? 'closet' : 'bathroom';
  write(`images/before-after/${kind}-before.svg`, baScene(scene, false));
  write(`images/before-after/${kind}-after.svg`, baScene(scene, true));
  count += 2;
}
write(
  'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${ACCENT}"/><text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="700" fill="#fff">C</text></svg>`,
);
write(
  'images/og-default.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${PAPER}"/><rect x="0" y="0" width="1200" height="10" fill="${ACCENT}"/><text x="80" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="84" font-weight="600" fill="${INK}">Cozy Tiny Space</text><text x="80" y="350" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="${MUTED}">More storage in your small rental — without drilling.</text><text x="80" y="560" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="3" fill="${ACCENT}">RENTER-FRIENDLY SMALL SPACE ORGANIZATION</text></svg>`,
);
console.log(`Generated ${count + 2} SVG files (30 articles + 5 categories + hero + 6 before/after + favicon + og).`);
