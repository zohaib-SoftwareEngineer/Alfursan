/**
 * scripts/scrape-images.mjs
 *
 * Scrapes every page of the Alfursan C4V listing (main + all 26 unit detail
 * pages), extracts every unique image URL found in <img>, srcset, and
 * background-image attributes, downloads each file into
 *   public/assets/gallery/<sanitised-name>.<ext>
 * and writes a manifest to
 *   src/imageManifest.json
 *
 * Usage (from repo root):
 *   node scripts/scrape-images.mjs
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.join(__dirname, '..');
const GALLERY    = path.join(ROOT, 'public', 'assets', 'gallery');
const MANIFEST   = path.join(ROOT, 'src', 'imageManifest.json');

const BASE        = 'https://safaalfursan.sa';
const BUILDING    = '/Alfursan/Zone_B/Alfursan_C4V';
const SIDES       = ['east', 'north', 'south', 'west'];

const UNIT_NUMS = [
  '1_01','1_02','1_03','1_04','1_05','1_06',
  '2_01','2_02','2_03','2_04','2_05','2_06',
  '3_01','3_02','3_03','3_04','3_05','3_06',
  '4_01','4_02','4_03','4_04','4_05','4_06',
  '5_01','5_02',
];

const PAGES = [
  `${BASE}${BUILDING}?side=east`,
  `${BASE}${BUILDING}?side=west`,
  ...UNIT_NUMS.map(u => `${BASE}${BUILDING}/${u}?side=north&floor=${u[0]}`),
];

// Extra CDN bases we know about
const CDN_BASES = [
  'https://data.prographers.com/VinodeSafaAlfursan23/Thumbnails/ApartmentCards/',
];
const KNOWN_THUMBS = ['A_F','B_F','C_F','D_F','E_F']
  .map(t => `${CDN_BASES[0]}${t}.jpg`);

// ── helpers ──────────────────────────────────────────────────────────────────

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,*/*;q=0.9',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://safaalfursan.sa/',
};

async function fetchHtml(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function resolveUrl(raw, pageUrl) {
  if (!raw || raw.startsWith('data:')) return null;
  try {
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith('//'))      return 'https:' + raw;
    if (raw.startsWith('/'))       return new URL(raw, BASE).href;
    return new URL(raw, pageUrl).href;
  } catch { return null; }
}

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;

function extractImageUrls(html, pageUrl) {
  const found = new Set();

  const add = (raw) => {
    const u = resolveUrl(raw?.trim(), pageUrl);
    if (u && IMAGE_EXT.test(u)) found.add(u.split('?')[0]); // strip QS
  };

  // <img src="…">
  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi))    add(m[1]);
  // <img srcset="…">
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi))
    m[1].split(',').forEach(part => add(part.trim().split(/\s+/)[0]));
  // url(…) in style attributes / inline CSS
  for (const m of html.matchAll(/url\(["']?([^"')]+)["']?\)/gi))        add(m[1]);
  // <source src="…"> (videos – skip)
  // og:image
  for (const m of html.matchAll(/property=["']og:image["'][^>]+content=["']([^"']+)["']/gi)) add(m[1]);
  for (const m of html.matchAll(/content=["']([^"']+)["'][^>]+property=["']og:image["']/gi)) add(m[1]);

  return [...found];
}

function safeFilename(url) {
  const u    = new URL(url);
  const ext  = (url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) || ['','.jpg'])[0];
  const stem = (u.hostname + u.pathname)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  // keep it short
  if (stem.length > 120) {
    const hash = Buffer.from(url).toString('base64').replace(/[^a-z0-9]/gi, '').slice(0, 12);
    return hash + ext;
  }
  return stem.endsWith(ext) ? stem : stem + ext;
}

async function download(url, destPath) {
  if (fs.existsSync(destPath)) return 'skip';
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, Accept: 'image/webp,image/apng,image/*,*/*' },
    });
    if (!res.ok) return `fail:${res.status}`;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 100) return 'fail:empty';
    fs.writeFileSync(destPath, Buffer.from(buf));
    return `ok:${(buf.byteLength / 1024).toFixed(1)}kB`;
  } catch (e) {
    return `fail:${e.message.slice(0, 40)}`;
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(GALLERY, { recursive: true });

  const allUrls = new Set(KNOWN_THUMBS);

  // 1 — scrape pages
  console.log(`\n=== Scraping ${PAGES.length} pages ===`);
  for (const pageUrl of PAGES) {
    process.stdout.write(`  ${pageUrl.replace(BASE, '')} … `);
    try {
      const html = await fetchHtml(pageUrl);
      const imgs = extractImageUrls(html, pageUrl);
      imgs.forEach(u => allUrls.add(u));
      console.log(`${imgs.length} imgs`);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
    // polite delay
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n=== ${allUrls.size} unique image URLs found ===`);

  // 2 — download
  console.log(`\n=== Downloading to public/assets/gallery/ ===`);
  const manifest = [];
  let ok = 0, skip = 0, fail = 0;

  for (const url of allUrls) {
    const filename = safeFilename(url);
    const dest     = path.join(GALLERY, filename);
    const result   = await download(url, dest);
    const tag      = result.startsWith('ok')   ? '✓' :
                     result === 'skip'          ? '–' : '✗';
    console.log(`  ${tag} ${result.padEnd(18)} ${url}`);

    if (result.startsWith('ok') || result === 'skip') {
      manifest.push({ url, local: `/assets/gallery/${filename}`, filename });
      if (result.startsWith('ok')) ok++;
      else skip++;
    } else { fail++; }
  }

  // 3 — write manifest
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`
=== Done ===
  Downloaded : ${ok}
  Skipped    : ${skip}
  Failed     : ${fail}
  Manifest   : src/imageManifest.json  (${manifest.length} entries)
  Output dir : public/assets/gallery/
`);
}

main().catch(err => { console.error(err); process.exit(1); });
