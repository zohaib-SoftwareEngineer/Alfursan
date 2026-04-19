/**
 * scripts/extract-all-data.mjs
 *
 * 1. Fetches every page of the building (by floor + all unit detail pages)
 * 2. Mines __NEXT_DATA__ JSON for apartments, real prices, images
 * 3. Downloads every /uploads/ image found
 * 4. Writes  src/imageManifest.json
 *            src/siteData.json        ← real API data (prices, rooms, PDFs)
 *
 * Usage (from repo root): node scripts/extract-all-data.mjs
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');
const GALLERY   = path.join(ROOT, 'public', 'assets', 'gallery');

const BASE      = 'https://safaalfursan.sa';
const BLDG      = '/Alfursan/Zone_B/Alfursan_C4V';

// ── HTTP helpers ──────────────────────────────────────────────────────────────
const HDR = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Accept: 'text/html,*/*;q=0.8',
  Referer: BASE + '/',
};

async function getHtml(url) {
  const res = await fetch(url, { headers: HDR });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function downloadBinary(url, destPath) {
  if (fs.existsSync(destPath)) return 'skip';
  const res = await fetch(url, {
    headers: { ...HDR, Accept: 'image/*,*/*' },
  });
  if (!res.ok) return `fail:${res.status}`;
  const buf = await res.arrayBuffer();
  if (buf.byteLength < 200) return 'fail:too-small';
  fs.writeFileSync(destPath, Buffer.from(buf));
  return `ok:${(buf.byteLength / 1024).toFixed(1)}kB`;
}

// ── Parse __NEXT_DATA__ ───────────────────────────────────────────────────────
function parseNextData(html) {
  const m = html.match(/<script[^>]+id="__NEXT_DATA__"[^>]*>(.+?)<\/script>/s);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

// ── Collect upload image URLs from arbitrary nested JSON ───────────────────────
const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

function findUploadUrls(obj, found = new Set()) {
  if (!obj || typeof obj !== 'object') return found;
  if (Array.isArray(obj)) {
    obj.forEach(v => findUploadUrls(v, found));
  } else {
    for (const [k, v] of Object.entries(obj)) {
      if ((k === 'url' || k === 'src') && typeof v === 'string' && IMAGE_EXT.test(v)) {
        const abs = v.startsWith('http') ? v : BASE + v;
        found.add(abs);
      }
      findUploadUrls(v, found);
    }
  }
  return found;
}

// ── CDN thumbnail patterns ────────────────────────────────────────────────────
const THUMBS = ['A_F','B_F','C_F','D_F','E_F'].map(
  t => `https://data.prographers.com/VinodeSafaAlfursan23/Thumbnails/ApartmentCards/${t}.jpg`
);

// ── Safe filename ─────────────────────────────────────────────────────────────
function safeFile(url) {
  const u   = new URL(url);
  const ext = (url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) || ['','.jpg'])[0].toLowerCase();
  const stem = (u.hostname + u.pathname)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 110);
  return stem.endsWith(ext) ? stem : stem + ext;
}

// ── Scrape unit detail pages ───────────────────────────────────────────────────
const UNIT_NUMS = [
  '1_01','1_02','1_03','1_04','1_05','1_06',
  '2_01','2_02','2_03','2_04','2_05','2_06',
  '3_01','3_02','3_03','3_04','3_05','3_06',
  '4_01','4_02','4_03','4_04','4_05','4_06',
  '5_01','5_02',
];

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  fs.mkdirSync(GALLERY, { recursive: true });

  const allImageUrls  = new Set(THUMBS);
  const allApartments = new Map(); // ExternalId → attributes
  const unitDetails   = {};        // unitNum → detail data

  // 1 — Scrape per-floor listing pages
  console.log('\n=== Scraping floor listing pages ===');
  for (let fl = 1; fl <= 5; fl++) {
    const url = `${BASE}${BLDG}?side=east&floor=${fl}`;
    process.stdout.write(`  Floor ${fl} … `);
    try {
      const html = await getHtml(url);
      const nd   = parseNextData(html);
      if (!nd) { console.log('no NEXT_DATA'); continue; }
      const apts = nd.props?.pageProps?.apartments ?? [];
      apts.forEach(a => allApartments.set(a.attributes.ExternalId, a.attributes));
      const imgs = findUploadUrls(nd);
      imgs.forEach(u => allImageUrls.add(u));
      console.log(`${apts.length} apartments, ${imgs.size} upload imgs`);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400));
  }

  // 2 — Scrape each unit detail page
  console.log('\n=== Scraping unit detail pages ===');
  for (const num of UNIT_NUMS) {
    const floor = num[0];
    const url   = `${BASE}${BLDG}/${num}?side=north&floor=${floor}`;
    process.stdout.write(`  ${num} … `);
    try {
      const html = await getHtml(url);
      const nd   = parseNextData(html);
      if (!nd) { console.log('no NEXT_DATA'); continue; }
      const pp  = nd.props?.pageProps ?? {};
      const apt = pp.apartment ?? {};

      // collect images
      const imgs = findUploadUrls(nd);
      imgs.forEach(u => allImageUrls.add(u));

      // store detail (rooms, pdfs, price)
      unitDetails[num] = {
        price:    apt.Price,
        status:   apt.Status,
        rooms:    (apt.Rooms?.data ?? []).map(r => ({ name: r.attributes.Name, size: r.attributes.Area })),
        pdfs:     (apt.Pdfs?.data ?? []).map(p => ({
          name:  p.attributes.name,
          url:   BASE + p.attributes.url,
          large: p.attributes.formats?.large ? BASE + p.attributes.formats.large.url : null,
          medium:p.attributes.formats?.medium ? BASE + p.attributes.formats.medium.url : null,
        })),
        uploadImgs: [...imgs],
      };

      console.log(`ok – ${imgs.size} imgs, price=${apt.Price}, ${(apt.Rooms?.data??[]).length} rooms`);
    } catch (e) {
      console.log(`${e.message.includes('404') ? '404' : `ERROR: ${e.message}`}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n=== ${allImageUrls.size} unique image URLs found ===`);

  // 3 — Download all images
  console.log('\n=== Downloading to public/assets/gallery/ ===');
  const manifest = [];
  let ok = 0, skip = 0, fail = 0;

  for (const url of allImageUrls) {
    const filename = safeFile(url);
    const dest     = path.join(GALLERY, filename);
    const res      = await downloadBinary(url, dest);
    const tag      = res.startsWith('ok') ? '✓' : res === 'skip' ? '–' : '✗';
    console.log(`  ${tag} ${res.padEnd(18)} ${url}`);
    if (res.startsWith('ok') || res === 'skip') {
      manifest.push({ url, local: `/assets/gallery/${filename}`, filename });
      res.startsWith('ok') ? ok++ : skip++;
    } else { fail++; }
  }

  // 4 — Write outputs
  const manifestPath = path.join(ROOT, 'src', 'imageManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const siteDataPath = path.join(ROOT, 'src', 'siteData.json');
  const allAptArr    = [...allApartments.entries()].map(([id, attrs]) => ({ id, ...attrs }));
  fs.writeFileSync(siteDataPath, JSON.stringify({ apartments: allAptArr, unitDetails }, null, 2));

  console.log(`
=== Done ===
  Downloaded : ${ok}
  Skipped    : ${skip}
  Failed     : ${fail}
  Apartments : ${allApartments.size}
  Manifest   : src/imageManifest.json
  Site data  : src/siteData.json
`);
}

main().catch(e => { console.error(e); process.exit(1); });
