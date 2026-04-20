export const NAV = ["Home", "Apartments", "Amenities", "Localization"];

/** Same asset as the navbar — also used as the hero centre mark. */
export const NAV_LOGO_SRC = "/images/logo.svg";

/**
 * Approximate coordinates around the Alfursan development in north-eastern
 * Riyadh (near the Eastern Ring Road / Al Thumama Road corridor). Used to
 * centre and pan the Leaflet map.
 */
export const PROJECT_CENTER = { lat: 24.851, lng: 46.847 };

/**
 * Landmarks rendered as Leaflet markers and listed in the side panel.
 * `lat` / `lng` are the source of truth — `x` / `y` are kept for the legacy
 * SVG fallback (unused by the live map but handy for tests / screenshots).
 */
export const LOCATION_POINTS = [
  { name: "Awali Alfursan",    sub: "North sector",      lat: 24.860, lng: 46.840, x: 26, y: 30 },
  { name: "Nesaj Alfursan",    sub: "East corridor",     lat: 24.855, lng: 46.855, x: 54, y: 22 },
  { name: "Falwa",             sub: "District access",   lat: 24.848, lng: 46.860, x: 70, y: 42 },
  { name: "Alasila",           sub: "Residential edge",  lat: 24.844, lng: 46.842, x: 44, y: 56 },
  { name: "Alathbah",          sub: "Southern link",     lat: 24.840, lng: 46.830, x: 20, y: 64 },
  { name: "Mosque",            sub: "Community",         lat: 24.846, lng: 46.846, x: 62, y: 68 },
  { name: "Central park",      sub: "Green spine",       lat: 24.851, lng: 46.844, x: 38, y: 40 },
  { name: "Al Janadryiah Road", sub: "Primary arterial", lat: 24.858, lng: 46.860, x: 76, y: 28 },
];
