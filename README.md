# Alfursan C4V — Real Estate Listing Clone

A production-ready React/Vite clone of the [Alfursan C4V](https://safaalfursan.sa/Alfursan/Zone_B/Alfursan_C4V?side=east) real estate listing portal — Zone B, Alfursan Project, Saudi Arabia.

All apartment data, real prices, statuses, room breakdowns, brand assets, and imagery have been extracted from the live site and are served fully locally (no external runtime dependencies).

---

## Live Demo

> Deploy to Vercel with one click — see [Deployment](#deployment) section below.

---

## Features

- **Full unit listings** — 24 apartments across 4 floors with real data sourced from the live site
- **Real prices** — SAR prices extracted directly from the site's JSON API (e.g. 333,000 – 1,072,000 SAR)
- **Real room breakdowns** — per-unit room names and areas (master bedroom, kitchen, bathrooms, balcony, etc.)
- **Advanced filters** — floor selector, size range (m²), balcony toggle, duplex toggle, for-sale only, favorites
- **Favorites** — saved to `localStorage`, persists across sessions
- **Sort** — by unit number, floor, or size (ascending/descending)
- **Unit detail modal** — floor plan image, room breakdown, price, video walkthrough (unit 1_02), link to original site
- **Image gallery** — all 7 locally downloaded assets displayed in a filterable, lightbox-enabled grid
- **Responsive** — mobile bar + desktop side panel layout matching the reference site
- **Fully offline assets** — fonts (Altone, Poppins), icons, floor plan thumbnails all served from `/public`
- **Brand accurate** — teal color theme, Altone custom font, header pattern, floating compass — identical to reference

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 4 |
| Styling | CSS Modules |
| Fonts | Altone (local TTF) + Poppins (local TTF) |
| State | React `useState` / `useMemo` |
| Persistence | `localStorage` (favorites, disclaimer) |
| Data | Static `src/data.js` (sourced from live site's `__NEXT_DATA__` JSON) |
| Assets | `/public/assets/` (thumbnails, icons, fonts) |

---

## Project Structure

```
alfursan-clone/
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── altone/          # Altone-Light/Regular/Medium/Bold.ttf
│   │   │   └── poppins/         # Poppins-Light/Regular/Medium/SemiBold/Bold.ttf
│   │   ├── icons/
│   │   │   ├── compas_Icon_01.svg
│   │   │   └── header_pattern.svg
│   │   ├── thumbnails/          # A_F.jpg B_F.jpg C_F.jpg D_F.jpg E_F.jpg
│   │   └── gallery/             # All extracted site images
│   └── favicon.svg
├── scripts/
│   ├── download-site-assets.ps1 # Downloads fonts, icons, thumbnails
│   ├── scrape-images.mjs        # Scrapes image URLs from all site pages
│   └── extract-all-data.mjs    # Extracts __NEXT_DATA__ JSON (prices, rooms, images)
├── src/
│   ├── components/
│   │   ├── DisclaimerBar.jsx    # Dismissible disclaimer banner
│   │   ├── Filters.jsx          # Collapsible filter panel
│   │   ├── FloatingCompass.jsx  # Floating compass icon
│   │   ├── Gallery.jsx          # Image gallery with lightbox
│   │   ├── MobileBar.jsx        # Mobile header bar
│   │   ├── SceneBackdrop.jsx    # Background gradient + pattern
│   │   ├── UnitCard.jsx         # Apartment listing card with price
│   │   └── UnitDetail.jsx       # Unit detail modal (rooms, video, price)
│   ├── App.jsx                  # Main app layout + filter/sort logic
│   ├── App.module.css
│   ├── assetPaths.js            # Utility: resolves /public asset URLs with Vite base
│   ├── data.js                  # All apartment data, prices, rooms, gallery images
│   ├── imageManifest.json       # Auto-generated list of downloaded images
│   ├── index.css                # Global styles, CSS variables, @font-face
│   ├── main.jsx
│   └── siteData.json            # Raw extracted JSON from the live site
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/zohaib-SoftwareEngineer/Alfursan.git
cd Alfursan

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## Data Extraction

The apartment data was extracted from the live site using custom Node.js scripts:

```bash
# Download all static assets (fonts, icons, thumbnails)
powershell -ExecutionPolicy Bypass -File scripts/download-site-assets.ps1

# Scrape all image URLs from every page
node scripts/scrape-images.mjs

# Extract full apartment data (prices, rooms, statuses) from __NEXT_DATA__ JSON
node scripts/extract-all-data.mjs
```

### What was extracted

| Data | Source | Status |
|---|---|---|
| Apartment prices (SAR) | Site `__NEXT_DATA__` JSON | ✅ 20 units |
| Unit statuses (sold/available) | Site `__NEXT_DATA__` JSON | ✅ 20 units |
| Room breakdowns with areas | Site `__NEXT_DATA__` JSON | ✅ 20 units |
| Floor plan thumbnail images | data.prographers.com CDN | ✅ 5 types (A–E) |
| Brand icons & patterns | safaalfursan.sa/icons/ | ✅ |
| Custom fonts (Altone, Poppins) | safaalfursan.sa/fonts/ | ✅ |
| Floor plan document images | safaalfursan.sa/uploads/ | ❌ Server returns 404 (Strapi backend, not publicly accessible) |
| 3D interactive building view | Unreal Pixel Streaming | ❌ Live GPU stream — not downloadable |
| Video walkthroughs | data.prographers.com CDN | ⚠️ Hotlink-protected — plays in browser when loaded from original domain |

### Why wget / HTTrack Won't Work

The original site is a **Next.js application with Unreal Pixel Streaming**, not a static website:

- `wget --mirror` only downloads the initial HTML shell — all apartment data is injected by JavaScript after load
- The 3D building view is a **live Unreal Engine video stream** rendered on a remote GPU server; it cannot be saved as a file
- Floor plan document images are stored in a **private Strapi CMS** backend (`/uploads/`) that returns 404 for direct access
- Video walkthroughs have **CDN hotlink protection** — they only play when the browser's `Referer` header matches the original domain

---

## Apartment Types

| Code | Name | Bedrooms | Bathrooms |
|---|---|---|---|
| A | Al Marjan | 1 | 1 |
| B | Al Marjan | 1 | 1 |
| C | Al Sultan Duplex | 4 | 5 |
| D | Al Baylasan | 3 | 4 |
| E | Al Baylasan Plus | 3 | 4 |

---

## Deployment

### Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. Select **Vite** as the framework preset
4. Click **Deploy** — no environment variables needed

### Netlify

```bash
npm run build
# drag & drop the dist/ folder at app.netlify.com/drop
```

---

## License

This project is a technical clone built for demonstration purposes. All original content, branding, and data belong to [Safa Alfursan / Prographers](https://safaalfursan.sa). Not intended for commercial use.
