export interface ProductFaq {
  q: string;
  a: string;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number; // USD, 0 = free
  priceLabel: string;
  tagline: string;
  pages: string;
  format: string;
  cover: string;
  coverAlt: string;
  gumroadUrl: string;
  whatsInside: string[];
  whoFor: string[];
  faqs: ProductFaq[];
  related: RelatedLink[];
}

export const PRODUCTS: Product[] = [
  {
    slug: 'renter-move-in-move-out-kit',
    name: 'Renter Move-In / Move-Out Documentation Kit',
    price: 12,
    priceLabel: '$12',
    tagline:
      'A room-by-room printable system for documenting your rental\u2019s condition at move-in and move-out \u2014 so pre-existing damage never comes out of your deposit.',
    pages: '19 pages',
    format: 'Printable PDF \u00b7 US Letter (8.5 \u00d7 11 in)',
    cover: '/images/shop/cover-1-move-in-out-01.webp',
    coverAlt: 'Cover of the Renter Move-In / Move-Out Documentation Kit',
    gumroadUrl: 'https://getdigitalnest.gumroad.com/l/renter-move-in-move-out-kit',
    whatsInside: [
      'How-to guide: the walkthrough method and the two-shot photo rules (wide shot + close-up, timestamps on)',
      'Move-in condition report, room by room \u2014 living room, kitchen, bathroom, bedroom(s), walls/floors/ceilings, windows & doors, appliances & fixtures \u2014 each item rated Good / Fair / Poor / Damaged with a notes line',
      'Photo logs (move-in: 48 numbered entries; move-out: 24, matched to your move-in numbers)',
      'Utilities & meters page: meter readings, shutoff locations, thermostat, keys/remotes/fobs inventory',
      'Landlord-owned items inventory with a contacts block \u2014 landlord, property manager, emergency and non-emergency maintenance numbers',
      'Move-in summary page with a checklist for emailing the report to your landlord in the first week',
      'Move-out cleaning checklist (per room) and small repairs & touch-ups checklist',
      'Security deposit tracker: key dates, your state\u2019s itemized-statement deadline, and a deduction log \u2014 plus what to do if your deposit is withheld',
      'Three fill-in-the-blank sample letters: sending the move-in report, requesting the deposit after the deadline, and disputing a specific deduction',
    ],
    whoFor: [
      'Renters moving into a new apartment or house who want their full deposit back',
      'Renters approaching move-out who want to hand the home back provably clean and documented',
      'First-time renters who don\u2019t yet know what landlords deduct for \u2014 or what to photograph',
      'Roommates and couples who want one shared, organized record instead of scattered phone photos',
    ],
    faqs: [
      {
        q: 'How do I use the kit?',
        a: 'Print it (at home or a copy shop), then walk through your new home before the furniture arrives. Rate each item, write specific notes, and take the two photos per item the guide describes. Email the completed report and key photos to your landlord within the first week, and keep everything with your lease. Repeat the process in reverse at move-out.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. The kit is a documentation and organization tool with general guidance. Security deposit rules \u2014 including deadlines and what can be deducted \u2014 vary by state and city, and the kit prompts you to look up and record your own state\u2019s current deadline rather than guessing. For a serious dispute, check your state housing agency or a local tenant legal aid service.',
      },
      {
        q: 'I already moved in. Is it too late?',
        a: 'Earlier is better, but a report completed now \u2014 honestly dated, with photos \u2014 is still far stronger than none. Just never backdate it; note the actual date you documented each room.',
      },
      {
        q: 'What do I receive, and can I print pages again?',
        a: 'One 19-page PDF in US Letter size, designed for clean black-and-white or color printing. Print extra copies of any page whenever you need them \u2014 the bedroom checklist and photo logs are especially handy in duplicate for multi-bedroom homes.',
      },
    ],
    related: [
      { label: 'Renter\u2019s move-out checklist: get your deposit back', href: '/renter-guides/renters-move-out-storage-checklist-deposit-back/' },
      { label: 'No-drill shelves for apartment walls, compared', href: '/renter-guides/no-drill-shelves-apartment-walls-compared/' },
    ],
  },
  {
    slug: 'small-space-furniture-layout-kit',
    name: 'Small-Space Furniture Layout Kit',
    price: 9,
    priceLabel: '$9',
    tagline:
      'Plan your small room\u2019s furniture layout on paper, at true scale, before you move a single piece.',
    pages: '14 pages',
    format: 'Printable PDF \u00b7 US Letter (8.5 \u00d7 11 in) \u00b7 print at 100%',
    cover: '/images/shop/cover-2-layout-01.webp',
    coverAlt: 'Cover of the Small-Space Furniture Layout Kit',
    gumroadUrl: 'https://getdigitalnest.gumroad.com/l/small-space-furniture-layout-kit',
    whatsInside: [
      'How-to guide: how the kit works and how to measure a room (walls, ceiling height, doors and their swing, windows, outlets, vents)',
      'Room Measurement Worksheet \u2014 2 copies, with sketch box and measurements table',
      'Clearance Cheat Sheet \u2014 the standard rules of thumb (walkways 30\u201336 in, sofa-to-coffee-table 14\u201318 in, dining chair pull-out, bed clearance, door swings, the rug rule)',
      '4 scale grid planning sheets (1 square = 1 foot): 10 \u00d7 10 ft bedroom, 10 \u00d7 12 ft room, 12 \u00d7 14 ft living room, and a blank 14 \u00d7 18 ft studio grid with the fixed kitchen counter marked',
      '17 furniture cut-outs at the same scale as the grids: beds, nightstands, dresser, desk, bookshelf, sofas, armchair, coffee table, TV console, dining set, floor lamp \u2014 plus 2 blank \u201cYour Piece\u201d cut-outs',
      '4 worked sample layouts with diagrams and notes: studio apartment, 10 \u00d7 10 bedroom, small living room, guest room / home office combo',
      'The 6 layout mistakes that shrink a room \u2014 each with a one-line fix',
      'A calibration box on every scale page, so what you plan on paper is what fits in the room',
    ],
    whoFor: [
      'Renters and small-apartment dwellers tired of dragging furniture around to test an idea',
      'Anyone moving into a small space who wants to know what fits before moving day \u2014 or before buying',
      'Anyone with a room that never quite works, who wants to find out why on paper instead of over a whole Saturday',
    ],
    faqs: [
      {
        q: 'What do I need to print it correctly?',
        a: 'Any home printer and US Letter paper. Print at 100% / \u201cActual size\u201d (not \u201cFit to page\u201d), then measure the calibration box on any scale page \u2014 it should be exactly 2 inches square (4 ft at the kit\u2019s scale). If it isn\u2019t, fix the printer setting and reprint that page; the cut-outs only match the grids when the scale is true.',
      },
      {
        q: 'My room isn\u2019t one of the four grid sizes. Can I still use the kit?',
        a: 'Yes. Use a measurement worksheet to record your room, then draw its outline on any grid at the same scale (1 square = 1 foot). The cut-outs work on any grid drawn at that scale, whatever the room\u2019s shape.',
      },
      {
        q: 'My furniture is a different size from the cut-outs. What then?',
        a: 'Measure your piece (length \u00d7 depth) and use one of the two blank \u201cYour Piece\u201d cut-outs included in the kit \u2014 write in the size and cut it to scale. The standard cut-outs cover the most common sizes, but your actual measurements always win.',
      },
      {
        q: 'Is this a physical product? Will it work for a rental?',
        a: 'It\u2019s a printable PDF download \u2014 print as many copies as you need for your own home. And yes, it\u2019s made with renters in mind: it\u2019s purely a planning tool, so nothing gets installed, drilled, or damaged \u2014 you only move your furniture once the paper layout already works.',
      },
    ],
    related: [
      { label: 'Multifunctional furniture for small rental living rooms', href: '/living-room-entryway-storage/multifunctional-furniture-small-rental-living-rooms/' },
      { label: 'Clothing storage ideas for small bedrooms with no dresser', href: '/bedroom-closet-storage/clothing-storage-ideas-small-bedrooms-no-dresser/' },
    ],
  },
  {
    slug: 'kitchen-zone-planner-labels',
    name: 'Kitchen Cabinet & Pantry Zone Planner + Labels',
    price: 7,
    priceLabel: '$7',
    tagline:
      'Give every cabinet and drawer in your small rental kitchen a job with the 5-zone system \u2014 then label it so it stays that way. No drilling, nothing permanent.',
    pages: '11 pages',
    format: 'Printable PDF \u00b7 US Letter (8.5 \u00d7 11 in)',
    cover: '/images/shop/cover-3-kitchen-01.webp',
    coverAlt: 'Cover of the Kitchen Cabinet & Pantry Zone Planner + Labels',
    gumroadUrl: 'https://getdigitalnest.gumroad.com/l/kitchen-zone-planner-labels',
    whatsInside: [
      'The 5-Zone Method \u2014 Everyday, Cooking, Prep, Pantry, and Cleaning zones, plus the three rules behind them: point of use, heaviest at waist height, rarely used goes highest and furthest',
      'Map Your Kitchen worksheet \u2014 sketch grid for your own layout plus an inventory table: what\u2019s in each cabinet now, and how often it\u2019s used',
      'Zone Assignment Planner \u2014 a worked example mapping 12 cabinets/drawers in a typical small kitchen, plus a blank planner',
      'Pantry Zone Planner \u2014 the five-category system (Daily / Backup / Baking / Snacks / Cans & Jars), first-in-first-out rotation, and no-pantry adaptations: one cabinet, a shelf, or a rolling cart',
      'Small-Kitchen Adaptations \u2014 the only-4-cabinets plan, deep & corner cabinet tactics, above-cabinet storage rules, removable over-door racks, drawer dividers',
      '15-Minute Weekly Reset checklist \u2014 a timed routine that stops zone drift before it becomes chaos',
      'Printable labels: 8 wide zone labels, 24 small bin labels, and a page of blanks \u2014 with dashed cut lines and true sizes printed on each sheet',
      'Before You Buy Organizers \u2014 a measure-first checklist and the generic organizer types that fit each zone, with typical price ranges',
    ],
    whoFor: [
      'Renters in small apartments whose kitchen cabinets are a jumble \u2014 and who can\u2019t drill, screw, or install anything permanent',
      'Anyone who keeps buying organizers that don\u2019t fit, or food they forgot they had',
      'Small households that cook daily in a kitchen with limited cabinets \u2014 including kitchens with only four cabinets or no pantry at all',
    ],
    faqs: [
      {
        q: 'Is this really renter-friendly? Will anything damage my kitchen?',
        a: 'Yes \u2014 the whole system is built for rentals. There is no drilling, screwing, or permanent installation anywhere in the planner. Door racks are over-door/removable types only, and the labels can go inside cabinet doors or on removable adhesive, so everything leaves with you and your deposit stays intact.',
      },
      {
        q: 'What do I need to print it, and on what paper?',
        a: 'Any home printer and US Letter paper (8.5 \u00d7 11 in). Regular paper works for the worksheets; the label pages come out best on card stock or full-sheet sticker paper. Print at \u201cActual size\u201d / 100% scale (not \u201cFit to page\u201d) so the labels come out at the intended size, and cut along the dashed lines.',
      },
      {
        q: 'My kitchen is tiny \u2014 only a few cabinets and no pantry. Will this still work?',
        a: 'Yes, that\u2019s exactly who it\u2019s for. There\u2019s a dedicated only-4-cabinets plan that combines zones within cabinets, and the Pantry Planner covers three no-pantry stand-ins: one cabinet as \u201cpantry\u201d, a shelf anywhere, or a slim rolling cart.',
      },
      {
        q: 'Is this a physical product?',
        a: 'No \u2014 it\u2019s an instant-download PDF (11 pages). Buy once, download immediately, and reprint pages whenever you need them \u2014 most people reprint the blank labels and the weekly reset checklist.',
      },
    ],
    related: [
      { label: 'No-drill kitchen storage ideas for renters', href: '/kitchen-storage/no-drill-kitchen-storage-for-renters/' },
      { label: 'Small apartment pantry organization with no pantry', href: '/kitchen-storage/small-apartment-pantry-organization-no-pantry/' },
    ],
  },
  {
    slug: 'room-measuring-cheat-sheet',
    name: 'Room Measuring Cheat Sheet',
    price: 0,
    priceLabel: 'Free',
    tagline: 'Measure once. Buy right. Nothing goes back.',
    pages: '2 pages',
    format: 'Printable PDF \u00b7 US Letter (8.5 \u00d7 11 in)',
    cover: '/images/shop/cover-4-measuring-1.webp',
    coverAlt: 'First page of the free Room Measuring Cheat Sheet',
    gumroadUrl: 'https://getdigitalnest.gumroad.com/l/room-measuring-cheat-sheet',
    whatsInside: [
      'Page 1 \u2014 a what-to-measure checklist with write-in lines (room dimensions, ceiling height, wall segments, windows, doors, radiators, outlets, closet), a 5-step how-to-measure guide, and a gridded room-sketch box',
      'Page 2 \u2014 the delivery-path fit check (front door, hallway turn, stairwell, elevator), furniture fit checks (the tape-out method, walkway clearance, door swings), a measurements table for your rooms, and 5 common measuring mistakes to avoid',
    ],
    whoFor: [
      'Anyone about to buy, move, or rearrange furniture in a small home',
      'Renters who have ever had to return a piece that \u201calmost\u201d fit',
    ],
    faqs: [
      {
        q: 'Is it really free?',
        a: 'Yes \u2014 it\u2019s our free starter download, no catch. It\u2019s the same measuring method our Furniture Layout Kit is built on.',
      },
      {
        q: 'What do I need to print it?',
        a: 'Any home printer and one US Letter sheet, printed front and back (or two sheets). A tape measure and a pencil are all you need after that.',
      },
      {
        q: 'What if I want the full planning system?',
        a: 'The Small-Space Furniture Layout Kit turns these measurements into a finished layout: scale grids, furniture cut-outs at true scale, and worked sample layouts.',
      },
    ],
    related: [
      { label: 'Living room storage ideas for small rentals', href: '/living-room-entryway-storage/living-room-storage-ideas-small-rentals-no-built-ins/' },
      { label: 'The full Furniture Layout Kit', href: '/shop/small-space-furniture-layout-kit/' },
    ],
  },
];
