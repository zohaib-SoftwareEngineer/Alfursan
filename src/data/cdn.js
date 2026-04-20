/**
 * Live CDN base + URL helpers used by image components.
 *
 *  - `THUMB`    — generic apartment-card floorplan thumbnail.
 *  - `POI_FILE` — local amenity key → real CDN filename used by the live site.
 *                 Verified via `HEAD` probes of `${CDN}/POIs/<filename>.jpg`.
 *  - `POI_URL`  — convenience builder.
 */

export const CDN = "https://data.prographers.com/VinodeSafaAlfursan23";
export const THUMB = `${CDN}/Thumbnails/ApartmentCards/D_F.jpg`;

export const POI_FILE = {
  pool: "pool",
  gym: "gym",
  kindergarten: "childcare",
  businessCenter: "business",
  gaming: "gamehall",
  supermarket: "supermarket",
  specialtyCafe: "cafe",
  parcelDelivery: "parcel",
  laundryServices: "laundry",
  retailShops: "shop",
  masjid: "Masjid",
  lounge: "Lounge",
};

export const POI_URL = (n) => `${CDN}/POIs/${POI_FILE[n] || n}.jpg`;
