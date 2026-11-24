export const SITE = {
  name: 'Cozy Tiny Space',
  tagline: 'Renter-Friendly Small Space Organization',
  // CHANGE THIS when the real domain is purchased.
  // cozytinyspace.com was checked available on 18 Nov 2026 (NOT confirmed).
  url: 'https://cozytinyspace.com',
  description:
    'More storage, better organization, without permanent changes. Practical renter-friendly storage ideas for small apartments — no drilling, no damage, no lost deposit.',
  pinterest: 'https://www.pinterest.com/benstokes32cv/',
  email: 'hamzahameed9810@gmail.com',
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  'kitchen-storage': 'Kitchen Storage',
  'bedroom-closet-storage': 'Bedroom & Closet Storage',
  'bathroom-storage': 'Bathroom Storage',
  'living-room-entryway-storage': 'Living Room & Entryway Storage',
  'renter-guides': 'Renter Guides',
};

export const CATEGORY_ORDER = [
  'kitchen-storage',
  'bedroom-closet-storage',
  'bathroom-storage',
  'living-room-entryway-storage',
  'renter-guides',
] as const;
