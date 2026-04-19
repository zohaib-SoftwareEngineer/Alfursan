// Scraped from https://safaalfursan.sa/Alfursan/Zone_B/Alfursan_C4V
// Prices, statuses, and room data sourced from site's __NEXT_DATA__ JSON via scripts/extract-all-data.mjs
// Floor-plan thumbnails stored under /public/assets/thumbnails/

import { assetUrl } from './assetPaths.js';

export const BUILDING = {
  name: 'Alfursan_C4V',
  zone: 'Zone B',
  project: 'Alfursan',
  totalAvailable: 22,
  disclaimer:
    'The images and virtual walkthroughs presented have been created and designed for illustrative purposes only and do not reflect the complete reality',
  compassIcon: assetUrl('assets/icons/compas_Icon_01.svg'),
};

export const APARTMENT_TYPES = {
  A: { label: 'Al Marjan',      code: 'A', thumbnail: assetUrl('assets/thumbnails/A_F.jpg'), bedrooms: 1, bathrooms: 1 },
  B: { label: 'Al Marjan',      code: 'B', thumbnail: assetUrl('assets/thumbnails/B_F.jpg'), bedrooms: 1, bathrooms: 1 },
  C: { label: 'Al Sultan Duplex', code: 'C', thumbnail: assetUrl('assets/thumbnails/C_F.jpg'), bedrooms: 4, bathrooms: 5 },
  D: { label: 'Al Baylasan',    code: 'D', thumbnail: assetUrl('assets/thumbnails/D_F.jpg'), bedrooms: 3, bathrooms: 4 },
  E: { label: 'Al Baylasan Plus', code: 'E', thumbnail: assetUrl('assets/thumbnails/E_F.jpg'), bedrooms: 3, bathrooms: 4 },
};

// Real prices & statuses extracted from safaalfursan.sa __NEXT_DATA__
// (SAR values; units without a detail page are estimated from neighbours)
export const UNITS = [
  // ── Floor 1 ──────────────────────────────────────────────────────────────
  { id: '298-C4-1-11', unitNum: '1_01', floor: 1, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'sold',      price: 881000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-1-12', unitNum: '1_02', floor: 1, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'available',  price: 890000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-1-13', unitNum: '1_03', floor: 1, type: 'B', label: 'Al Marjan',       size:  57.68, bedrooms: 1, bathrooms: 1, status: 'available',  price: 333000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-1-14', unitNum: '1_04', floor: 1, type: 'C', label: 'Al Sultan Duplex', size: 214.82, bedrooms: 4, bathrooms: 5, status: 'available', price: 1069000, side: 'north', hasBalcony: true,  isDuplex: true  },
  { id: '298-C4-1-15', unitNum: '1_05', floor: 1, type: 'D', label: 'Al Baylasan',     size: 175.48, bedrooms: 3, bathrooms: 4, status: 'available',  price: 889000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-1-16', unitNum: '1_06', floor: 1, type: 'D', label: 'Al Baylasan',     size: 175.50, bedrooms: 3, bathrooms: 4, status: 'available',  price: 880000,  side: 'north', hasBalcony: true,  isDuplex: false },

  // ── Floor 2 ──────────────────────────────────────────────────────────────
  { id: '298-C4-2-11', unitNum: '2_01', floor: 2, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'available',  price: 882000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-2-12', unitNum: '2_02', floor: 2, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'sold',       price: 891000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-2-13', unitNum: '2_03', floor: 2, type: 'B', label: 'Al Marjan',       size:  57.68, bedrooms: 1, bathrooms: 1, status: 'available',  price: 890000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-2-14', unitNum: '2_04', floor: 2, type: 'C', label: 'Al Sultan Duplex', size: 214.82, bedrooms: 4, bathrooms: 5, status: 'available', price: 881000,  side: 'north', hasBalcony: true,  isDuplex: true  },
  { id: '298-C4-2-15', unitNum: '2_05', floor: 2, type: 'D', label: 'Al Baylasan',     size: 175.48, bedrooms: 3, bathrooms: 4, status: 'available',  price: null,    side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-2-16', unitNum: '2_06', floor: 2, type: 'D', label: 'Al Baylasan',     size: 175.50, bedrooms: 3, bathrooms: 4, status: 'available',  price: null,    side: 'north', hasBalcony: true,  isDuplex: false },

  // ── Floor 3 ──────────────────────────────────────────────────────────────
  { id: '298-C4-3-11', unitNum: '3_01', floor: 3, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'available',  price: 879000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-3-12', unitNum: '3_02', floor: 3, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'sold',       price: 892000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-3-13', unitNum: '3_03', floor: 3, type: 'B', label: 'Al Marjan',       size:  57.68, bedrooms: 1, bathrooms: 1, status: 'sold',       price: 334000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-3-14', unitNum: '3_04', floor: 3, type: 'C', label: 'Al Sultan Duplex', size: 214.82, bedrooms: 4, bathrooms: 5, status: 'available', price: 1072000, side: 'north', hasBalcony: true,  isDuplex: true  },
  { id: '298-C4-3-15', unitNum: '3_05', floor: 3, type: 'D', label: 'Al Baylasan',     size: 175.48, bedrooms: 3, bathrooms: 4, status: 'available',  price: 887000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-3-16', unitNum: '3_06', floor: 3, type: 'D', label: 'Al Baylasan',     size: 175.50, bedrooms: 3, bathrooms: 4, status: 'available',  price: 883000,  side: 'north', hasBalcony: true,  isDuplex: false },

  // ── Floor 4 ──────────────────────────────────────────────────────────────
  { id: '298-C4-4-11', unitNum: '4_01', floor: 4, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'available',  price: 836000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-4-12', unitNum: '4_02', floor: 4, type: 'D', label: 'Al Baylasan',     size: 175.56, bedrooms: 3, bathrooms: 4, status: 'sold',       price: 889000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-4-13', unitNum: '4_03', floor: 4, type: 'B', label: 'Al Marjan',       size:  57.68, bedrooms: 1, bathrooms: 1, status: 'sold',       price: 843000,  side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-4-14', unitNum: '4_04', floor: 4, type: 'C', label: 'Al Sultan Duplex', size: 214.82, bedrooms: 4, bathrooms: 5, status: 'available', price: 879000,  side: 'north', hasBalcony: true,  isDuplex: true  },
  { id: '298-C4-4-15', unitNum: '4_05', floor: 4, type: 'D', label: 'Al Baylasan',     size: 175.48, bedrooms: 3, bathrooms: 4, status: 'available',  price: null,    side: 'north', hasBalcony: true,  isDuplex: false },
  { id: '298-C4-4-16', unitNum: '4_06', floor: 4, type: 'D', label: 'Al Baylasan',     size: 175.50, bedrooms: 3, bathrooms: 4, status: 'available',  price: null,    side: 'north', hasBalcony: true,  isDuplex: false },

  // ── Penthouse / Floor 5 ───────────────────────────────────────────────────
  { id: '298-C4-5-11', unitNum: '5_01', floor: 5, type: 'C', label: 'Al Sultan Duplex', size: 298.40, bedrooms: 5, bathrooms: 6, status: 'sold',      price: null,    side: 'north', hasBalcony: true,  isDuplex: true  },
  { id: '298-C4-5-12', unitNum: '5_02', floor: 5, type: 'C', label: 'Al Sultan Duplex', size: 312.00, bedrooms: 5, bathrooms: 6, status: 'available', price: null,    side: 'north', hasBalcony: true,  isDuplex: true  },
];

export const SIZE_MIN = Math.min(...UNITS.map((u) => u.size));
export const SIZE_MAX = Math.max(...UNITS.map((u) => u.size));

// Room data sourced from __NEXT_DATA__ for each unit that had a detail page
export const UNIT_ROOMS = {
  '1_01': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '1_02': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '1_03': [{ name: 'Bedroom', size: 12.35 }, { name: 'Living Room', size: 12.00 }, { name: 'Kitchen', size: 7.00 }, { name: 'Bathroom', size: 4.24 }, { name: 'Balcony', size: 4.96 }],
  '1_04': [{ name: 'Living Room', size: 16.73 }, { name: 'Dining Room', size: 13.06 }, { name: 'Kitchen', size: 9.01 }, { name: 'Bathroom 1', size: 3.43 }, { name: 'Balcony 1', size: 5.28 }, { name: 'Master Bedroom', size: 12.54 }, { name: 'Bedroom 1', size: 12.73 }, { name: 'Bedroom 2', size: 12.35 }, { name: 'Bedroom 3', size: 11.04 }, { name: 'Maid Room', size: 7.24 }, { name: 'Bathroom 2', size: 3.12 }, { name: 'Bathroom 3', size: 4.97 }, { name: 'Bathroom 4', size: 6.09 }, { name: 'Bathroom 5', size: 8.00 }, { name: 'Balcony 2', size: 4.62 }, { name: 'Balcony 3', size: 4.33 }],
  '1_05': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '1_06': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '2_01': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '2_02': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '2_03': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '2_04': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '3_01': [{ name: 'Master Bedroom', size: 14.76 }, { name: 'Bedroom 1', size: 15.04 }, { name: 'Bedroom 2', size: 15.22 }, { name: 'Maid Room', size: 7.35 }, { name: 'Dining Room', size: 13.05 }, { name: 'Living Room', size: 18.48 }, { name: 'Kitchen', size: 16.74 }, { name: 'Bathroom 1', size: 4.00 }, { name: 'Bathroom 2', size: 3.87 }, { name: 'Bathroom 3', size: 1.82 }, { name: 'Bathroom 4', size: 1.33 }],
  '3_02': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '3_03': [{ name: 'Bedroom', size: 12.35 }, { name: 'Living Room', size: 12.00 }, { name: 'Kitchen', size: 7.00 }, { name: 'Bathroom', size: 4.24 }, { name: 'Balcony', size: 4.96 }],
  '3_04': [{ name: 'Living Room', size: 16.73 }, { name: 'Dining Room', size: 13.06 }, { name: 'Kitchen', size: 9.01 }, { name: 'Bathroom 1', size: 3.43 }, { name: 'Balcony 1', size: 5.28 }, { name: 'Master Bedroom', size: 12.54 }, { name: 'Bedroom 1', size: 12.73 }, { name: 'Bedroom 2', size: 12.35 }, { name: 'Bedroom 3', size: 11.04 }, { name: 'Maid Room', size: 7.24 }, { name: 'Bathroom 2', size: 3.12 }, { name: 'Bathroom 3', size: 4.97 }, { name: 'Bathroom 4', size: 6.09 }, { name: 'Bathroom 5', size: 8.00 }, { name: 'Balcony 2', size: 4.62 }, { name: 'Balcony 3', size: 4.33 }],
  '3_05': [{ name: 'Master Bedroom', size: 14.76 }, { name: 'Bedroom 1', size: 15.04 }, { name: 'Bedroom 2', size: 15.22 }, { name: 'Maid Room', size: 7.35 }, { name: 'Dining Room', size: 13.05 }, { name: 'Living Room', size: 18.48 }, { name: 'Kitchen', size: 16.74 }, { name: 'Bathroom 1', size: 4.00 }, { name: 'Bathroom 2', size: 3.87 }, { name: 'Bathroom 3', size: 1.82 }, { name: 'Bathroom 4', size: 1.33 }],
  '3_06': [{ name: 'Master Bedroom', size: 18.09 }, { name: 'Bedroom 1', size: 13.68 }, { name: 'Bedroom 2', size: 14.06 }, { name: 'Maid Room', size: 7.02 }, { name: 'Dining Room', size: 21.02 }, { name: 'Living Room', size: 20.06 }, { name: 'Kitchen', size: 12.05 }, { name: 'Bathroom 1', size: 3.68 }, { name: 'Bathroom 2', size: 4.16 }, { name: 'Bathroom 3', size: 3.97 }, { name: 'Bathroom 4', size: 3.79 }, { name: 'Balcony', size: 2.01 }],
  '4_01': [{ name: 'Master Bedroom', size: 14.76 }, { name: 'Bedroom 1', size: 15.04 }, { name: 'Bedroom 2', size: 15.22 }, { name: 'Maid Room', size: 7.35 }, { name: 'Dining Room', size: 13.05 }, { name: 'Living Room', size: 18.48 }, { name: 'Kitchen', size: 16.74 }, { name: 'Bathroom 1', size: 4.00 }, { name: 'Bathroom 2', size: 3.87 }, { name: 'Bathroom 3', size: 1.82 }, { name: 'Bathroom 4', size: 1.33 }],
  '4_02': [{ name: 'Master Bedroom', size: 14.76 }, { name: 'Bedroom 1', size: 15.04 }, { name: 'Bedroom 2', size: 15.22 }, { name: 'Maid Room', size: 7.35 }, { name: 'Dining Room', size: 13.05 }, { name: 'Living Room', size: 18.48 }, { name: 'Kitchen', size: 16.74 }, { name: 'Bathroom 1', size: 4.00 }, { name: 'Bathroom 2', size: 3.87 }, { name: 'Bathroom 3', size: 1.82 }, { name: 'Bathroom 4', size: 1.33 }],
  '4_03': [{ name: 'Master Bedroom', size: 14.76 }, { name: 'Bedroom 1', size: 15.04 }, { name: 'Bedroom 2', size: 15.22 }, { name: 'Maid Room', size: 7.35 }, { name: 'Dining Room', size: 13.05 }, { name: 'Living Room', size: 18.48 }, { name: 'Kitchen', size: 16.74 }, { name: 'Bathroom 1', size: 4.00 }, { name: 'Bathroom 2', size: 3.87 }, { name: 'Bathroom 3', size: 1.82 }, { name: 'Bathroom 4', size: 1.33 }],
  '4_04': [{ name: 'Master Bedroom', size: 14.76 }, { name: 'Bedroom 1', size: 15.04 }, { name: 'Bedroom 2', size: 15.22 }, { name: 'Maid Room', size: 7.35 }, { name: 'Dining Room', size: 13.05 }, { name: 'Living Room', size: 18.48 }, { name: 'Kitchen', size: 16.74 }, { name: 'Bathroom 1', size: 4.00 }, { name: 'Bathroom 2', size: 3.87 }, { name: 'Bathroom 3', size: 1.82 }, { name: 'Bathroom 4', size: 1.33 }],
};

// Video walkthrough URL (served via CDN — plays in browser, not downloadable)
export const UNIT_VIDEO_URL =
  'https://data.prographers.com/VinodeSafaAlfursan23/h264/desktop/Sequencer_CameraPlanApart0-2_CameraPlanApart0-2.mp4';

export const SIZE_MIN_COMPUTED = Math.min(...UNITS.map((u) => u.size));
export const SIZE_MAX_COMPUTED = Math.max(...UNITS.map((u) => u.size));

export const AVAILABLE_COUNT = UNITS.filter((u) => u.status === 'available').length;

export const getThumbnail = (type) => assetUrl(`assets/thumbnails/${type}_F.jpg`);

/** Format SAR price in the Saudi convention: e.g. 890000 → "890,000 SAR" */
export function formatPrice(price) {
  if (!price) return null;
  return price.toLocaleString('en-US') + ' SAR';
}

/** All locally downloaded images for the gallery */
export const GALLERY_IMAGES = [
  {
    filename: 'D_F.jpg',
    local: assetUrl('assets/thumbnails/D_F.jpg'),
    label: 'Al Baylasan (Type D)',
    description: '3 Bedrooms · 4 Bathrooms · 175 m²',
    type: 'D',
  },
  {
    filename: 'E_F.jpg',
    local: assetUrl('assets/thumbnails/E_F.jpg'),
    label: 'Al Baylasan Plus (Type E)',
    description: '3 Bedrooms · 4 Bathrooms',
    type: 'E',
  },
  {
    filename: 'C_F.jpg',
    local: assetUrl('assets/thumbnails/C_F.jpg'),
    label: 'Al Sultan Duplex (Type C)',
    description: '4 Bedrooms · 5 Bathrooms · 214 m²',
    type: 'C',
  },
  {
    filename: 'B_F.jpg',
    local: assetUrl('assets/thumbnails/B_F.jpg'),
    label: 'Al Marjan (Type B)',
    description: '1 Bedroom · 1 Bathroom · 57 m²',
    type: 'B',
  },
  {
    filename: 'A_F.jpg',
    local: assetUrl('assets/thumbnails/A_F.jpg'),
    label: 'Al Marjan (Type A)',
    description: '1 Bedroom · 1 Bathroom',
    type: 'A',
  },
  {
    filename: 'compas_Icon_01.svg',
    local: assetUrl('assets/icons/compas_Icon_01.svg'),
    label: 'Compass Icon',
    description: 'Site navigation asset',
    type: 'icon',
  },
  {
    filename: 'header_pattern.svg',
    local: assetUrl('assets/icons/header_pattern.svg'),
    label: 'Header Pattern',
    description: 'Brand background asset',
    type: 'icon',
  },
];
