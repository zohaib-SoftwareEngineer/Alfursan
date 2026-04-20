<div align="center">

# Safa Alfursan — Riyadh

A pixel-faithful React rebuild of the [`safaalfursan.sa/Alfursan/Zone_All`](https://safaalfursan.sa/Alfursan/Zone_All) marketing zone, built on **Vite 8** and **React 19**.

[![Made with React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Built with Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#-license)

</div>

---

## ✨ Overview

Safa Alfursan is a luxury residential development in Riyadh. This repository contains a **single-page React application** that mirrors the public Zone marketing experience — hero video, live unit listing with multi-criteria filtering, amenities marquee, interactive locations panel, and a glassmorphism "Register your interest" modal.

The project was reverse-engineered from the live site so the design, copy, navigation structure and CDN assets all match the production build, while the implementation is clean, componentised, and easy to extend.

## 🖼 Live Look & Feel

| Section | What it does |
| --- | --- |
| **Navbar** | Fixed glass pill that mirrors the production `ApartmentListNav`. Logo, language pill, in-page navigation, *Log in* and *contact us* buttons (both open the registration modal). |
| **Hero** | Full-viewport autoplay video (`object-fit: cover`, no blur) with the Safa wordmark, headline _"Your place to **embrace**"_ and an `Explore` pill. |
| **Ticker** | Disclaimer marquee under the hero. |
| **Stats Bar** | Four animated counters that reveal on scroll. |
| **Available Units** | Filter bar (building / floor / m² / SAR / toggles) + responsive card grid pulling from a generated inventory of 48 units (6 live + 42 deterministic). |
| **Project Amenities** | Auto-pause CDN-image marquee + responsive grid of 12 amenities. Cards self-remove if their image 404s. |
| **Localization** | Stylised SVG district map with 8 interactive landmark pins synced to a side panel. |
| **Register your interest** | Accessible modal (Esc to close, body-scroll lock, focus trap-ready) with Saudi flag phone prefix and 4-field form. |
| **Footer** | Brand mark, navigation column, contact column (opens modal) and back-to-top button. |

## 🧱 Tech Stack

- **React 19** with hooks and `StrictMode`.
- **Vite 8** as build tool and dev server.
- **ESLint 9** flat config with React + React Hooks plugins.
- **CSS** — no UI library. Two hand-written stylesheets:
  - `src/styles/globals.css` — design tokens, animations, page-wide utilities.
  - `src/styles/navbar.css` — production class names from the live `Zone_All` build.
- **Inline component styles** — used wherever a token isn't reused, for locality and zero indirection.
- **Live CDN imagery** — every photographic asset is fetched directly from `https://data.prographers.com/VinodeSafaAlfursan23` (no local copies committed).

## 📁 Project Structure

```
.
├── public/
│   ├── icons/                   # Static SVGs used by globals/navbar
│   └── images/
│       └── logo.svg             # Brand wordmark (used in Navbar + Hero)
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   ├── NavLoginIcon.jsx
│   │   │   └── SaudiFlagIcon.jsx
│   │   ├── images/
│   │   │   ├── FloorImg.jsx     # CDN floorplan thumb with SVG fallback
│   │   │   ├── FloorplanSVG.jsx # Inline floorplan illustration
│   │   │   └── POIImg.jsx       # Self-unmounting amenity image
│   │   ├── AmenityCard.jsx
│   │   ├── AptCard.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LocationSection.jsx
│   │   ├── Marquee.jsx
│   │   ├── Navbar.jsx
│   │   ├── RegisterInterestModal.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── StatsBar.jsx
│   │   └── Ticker.jsx
│   ├── data/
│   │   ├── amenities.js         # 12 amenities (key + copy)
│   │   ├── apartments.js        # BUILDINGS, APTS, DEFAULT_FILTER
│   │   ├── cdn.js               # CDN base, THUMB, POI_FILE, POI_URL helpers
│   │   └── locations.js         # NAV labels, NAV_LOGO_SRC, LOCATION_POINTS
│   ├── hooks/
│   │   └── useInView.js         # IntersectionObserver one-shot reveal hook
│   ├── lib/
│   │   └── layout.js            # PAGE constants, pageWrap(), scrollToSection()
│   ├── styles/
│   │   ├── globals.css
│   │   └── navbar.css
│   ├── App.jsx                  # Composition root + filter state
│   └── main.jsx                 # React root, CSS imports
├── index.html
├── eslint.config.js
├── vite.config.js
├── package.json
└── README.md
```

### Why this layout?

- **`components/`** is purely presentational. Each component owns its JSX and (where useful) its inline styles, but pulls every shared token from `data/`, `lib/`, or `hooks/`.
- **`data/`** contains plain JS modules — no JSX, no hooks. They're trivial to unit-test or replace with a CMS / API later.
- **`hooks/`** and **`lib/`** are reserved for cross-cutting concerns. Kept tiny on purpose.
- **`styles/`** is split between **`globals.css`** (project-wide) and **`navbar.css`** (production-class-name parity with the live site).

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (Node 20 LTS recommended)
- **npm 9+** (or `pnpm` / `yarn` / `bun` — all work with Vite)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (HMR, opens at http://localhost:5173)
npm run dev

# 3. Lint
npm run lint

# 4. Production build
npm run build

# 5. Preview the production build locally
npm run preview
```

## 🧩 Architecture Notes

### State

All page-level state lives in `App.jsx`:

| State | Purpose |
| --- | --- |
| `filter` | Multi-criteria filter for the apartments grid. Defaulted from `DEFAULT_FILTER()` in `data/apartments.js`. |
| `activeLoc` | Index of the currently selected landmark in the Localization section. |
| `ready` | Flips true 180 ms after mount to drive the hero entrance animation. |
| `registerOpen` | Controls the Register-your-interest modal (opened from Navbar + Footer). |

`applyFilter()` is a pure function colocated in `App.jsx` — it's small, only used here, and easy to read alongside the JSX it powers.

### Performance & UX

- **Lazy reveals** — every section uses `useInView` so animations only run once the section enters the viewport.
- **Self-healing cards** — `POIImg` reports load failures upward, and both `AmenityCard` and the marquee `MarqueeTile` unmount themselves so broken CDN paths never produce visual artefacts.
- **Body-scroll lock** — when the registration modal is open, the page is frozen and Esc closes it.
- **Memoised derivations** — `filtered`, `floors`, and `availableCount` are wrapped in `useMemo` so the heavy filter pipeline doesn't re-run on unrelated state changes.

### Accessibility

- `role="dialog"` + `aria-modal` + `aria-labelledby` on the registration modal.
- Visible focus styles for all custom buttons (`:focus-visible` outline in `navbar.css`).
- Decorative SVGs marked `aria-hidden`; meaningful icons keep accessible names.

## 🌐 Assets & Integrations

All photographic assets are served live from the production CDN:

```
https://data.prographers.com/VinodeSafaAlfursan23
├── h264/mobile/Sequencer_CameraAlfursanZoneHero1_*.mp4   # Hero video
├── Thumbnails/ApartmentCards/D_F.jpg                     # Floorplan thumbnail
└── POIs/<key>.jpg                                        # Amenity photos
```

The local-key → CDN-filename mapping is centralised in `src/data/cdn.js`. Add new amenities by extending `AMENITIES` (`src/data/amenities.js`) and `POI_FILE` (`src/data/cdn.js`) together.

## 🧪 Quality Gates

```bash
npm run lint    # ESLint flat config (React + React Hooks)
npm run build   # Vite production build (must succeed before commit)
```

## 🗺 Roadmap

- [ ] Wire the registration form to a real backend (currently displays a thank-you state on submit).
- [ ] Replace the demo `APTS` generator with the live CMS feed.
- [ ] Per-unit detail page + virtual tour embed.
- [ ] Arabic locale + RTL layout (the styles already account for `[dir="rtl"]`).
- [ ] PWA / offline shell.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feat/your-thing`
2. Make your changes — keep components small and colocate inline styles when they're component-specific.
3. Run `npm run lint && npm run build` before committing.
4. Open a pull request with a clear description and screenshots for visual changes.

## 📝 License

Released under the **MIT License**. See [`LICENSE`](LICENSE) (add one if your fork needs it).

## 🙌 Credits

- Design and assets © **Safa Investment Company**. This repository is an educational reconstruction.
- 3D / video pipeline by **Prographers** (CDN host).
- Reconstruction & React port — see commit history.
