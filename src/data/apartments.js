export const BUILDINGS = [
  "Al Baylasan",
  "Al Sidr",
  "Al Rayhan",
  "Al Yasmine",
  "Al Nakheel",
  "Al Rawdah",
];

/** Real units pulled from the live `Zone_All` listing (Al Baylasan, floors 1–2). */
const LIVE_APTS = [
  { id: 1, building: "Al Baylasan", unit: "299-A5-1-11", size: 170.52, floor: 1, bedrooms: 3, bathrooms: 3, status: "Sold", price: null, hasBalcony: false, hasDuplex: false, favorite: false },
  { id: 2, building: "Al Baylasan", unit: "299-A5-1-12", size: 171.1,  floor: 1, bedrooms: 3, bathrooms: 3, status: "Sold", price: null, hasBalcony: false, hasDuplex: false, favorite: true  },
  { id: 3, building: "Al Baylasan", unit: "299-A5-1-13", size: 171.1,  floor: 1, bedrooms: 3, bathrooms: 3, status: "Sold", price: null, hasBalcony: false, hasDuplex: false, favorite: false },
  { id: 4, building: "Al Baylasan", unit: "299-A5-1-14", size: 168.2,  floor: 1, bedrooms: 3, bathrooms: 3, status: "Sold", price: null, hasBalcony: false, hasDuplex: false, favorite: false },
  { id: 5, building: "Al Baylasan", unit: "299-A5-2-21", size: 170.52, floor: 2, bedrooms: 3, bathrooms: 3, status: "Sold", price: null, hasBalcony: false, hasDuplex: false, favorite: false },
  { id: 6, building: "Al Baylasan", unit: "299-A5-2-22", size: 171.1,  floor: 2, bedrooms: 3, bathrooms: 3, status: "Sold", price: null, hasBalcony: false, hasDuplex: false, favorite: false },
];

/** Full demo inventory — live units first, then deterministic generated rows. */
export const APTS = [
  ...LIVE_APTS,
  ...Array.from({ length: 42 }, (_, j) => {
    const i = j + 6;
    const floor = Math.floor(i / 6) + 1;
    const unit = (i % 6) + 1;
    const bCode = `A${Math.floor(i / 6) + 1}`;
    return {
      id: i + 1,
      building: BUILDINGS[i % BUILDINGS.length],
      unit: `299-${bCode}-${floor}-${10 + unit}`,
      size: parseFloat((155 + ((i * 7.3) % 40)).toFixed(2)),
      floor,
      bedrooms: i % 3 === 0 ? 4 : 3,
      bathrooms: 3,
      status: i < 8 ? "Sold" : i < 40 ? "Available" : "Reserved",
      price: i < 8 ? null : 1_200_000 + i * 83_000,
      hasBalcony: i % 3 === 0,
      hasDuplex: i % 9 === 0,
      favorite: i % 11 === 0,
    };
  }),
];

export const DEFAULT_FILTER = () => ({
  building: "all",
  floor: "all",
  sqMin: "",
  sqMax: "",
  priceMin: "",
  priceMax: "",
  balcony: false,
  duplex: false,
  favorites: false,
  sale: false,
});
