/** Max content width + gutters — matches typical 1440px marketing layout. */
export const PAGE = { maxW: 1440, pad: 48 };

export const pageWrap = (extra = {}) => ({
  maxWidth: PAGE.maxW,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: PAGE.pad,
  paddingRight: PAGE.pad,
  ...extra,
});

const NAV_TO_ID = {
  Home: "home",
  Apartments: "apartments",
  Amenities: "amenities",
  Localization: "localization",
};

export function scrollToSection(key) {
  const id = NAV_TO_ID[key];
  if (key === "Home" || id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
