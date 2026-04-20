import { lazy, Suspense, useEffect, useMemo, useState } from "react";

import { APTS, DEFAULT_FILTER } from "./data/apartments.js";
import { AMENITIES } from "./data/amenities.js";
import { pageWrap } from "./lib/layout.js";

import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { Ticker } from "./components/Ticker.jsx";
import { StatsBar } from "./components/StatsBar.jsx";
import { SectionHeader } from "./components/SectionHeader.jsx";
import { FilterBar } from "./components/FilterBar.jsx";
import { AptCard } from "./components/AptCard.jsx";
import { Marquee } from "./components/Marquee.jsx";
import { AmenityCard } from "./components/AmenityCard.jsx";
import { Footer } from "./components/Footer.jsx";
import { RegisterInterestModal } from "./components/RegisterInterestModal.jsx";

// MapLibre weighs ~1.2 MB minified — load it only when the user scrolls in.
const LocationSection = lazy(() =>
  import("./components/LocationSection.jsx").then((m) => ({ default: m.LocationSection }))
);

const parseNum = (v) => {
  const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
};

function applyFilter(apartments, filter) {
  return apartments.filter((a) => {
    if (filter.building !== "all" && a.building !== filter.building) return false;
    if (filter.floor !== "all" && a.floor !== +filter.floor) return false;
    if (filter.balcony && !a.hasBalcony) return false;
    if (filter.duplex && !a.hasDuplex) return false;
    if (filter.favorites && !a.favorite) return false;
    if (filter.sale && a.status !== "Available") return false;

    const mn = parseNum(filter.sqMin);
    const mx = parseNum(filter.sqMax);
    if (mn !== null && a.size < mn) return false;
    if (mx !== null && a.size > mx) return false;

    const pMn = parseNum(filter.priceMin);
    const pMx = parseNum(filter.priceMax);
    if (a.price != null) {
      if (pMn !== null && a.price < pMn) return false;
      if (pMx !== null && a.price > pMx) return false;
    } else if (pMn !== null || pMx !== null) {
      // Hide sold units when any price range is set — matches the live "filter by price" behaviour.
      return false;
    }

    return true;
  });
}

export default function App() {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [activeLoc, setActiveLoc] = useState(0);
  const [ready, setReady] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 180);
    return () => clearTimeout(t);
  }, []);

  const floors = useMemo(() => [...new Set(APTS.map((a) => a.floor))].sort((a, b) => a - b), []);
  const filtered = useMemo(() => applyFilter(APTS, filter), [filter]);
  const availableCount = useMemo(() => APTS.filter((a) => a.status === "Available").length, []);

  const openRegister = () => setRegisterOpen(true);
  const closeRegister = () => setRegisterOpen(false);

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: "#0F1F17", color: "#E8EDE6", overflowX: "hidden" }}>
      <Navbar onOpenRegister={openRegister} />
      <RegisterInterestModal open={registerOpen} onClose={closeRegister} />

      <section id="home">
        <Hero ready={ready} />
      </section>

      <Ticker />
      <StatsBar availableCount={availableCount} />

      {/* Apartments — structure aligned with Zone_All filters + grid */}
      <section id="apartments" style={{ padding: "80px 0", background: "#0F1F17" }}>
        <div style={pageWrap()}>
          <SectionHeader title="Available units" minimal />
        </div>
        <div style={pageWrap({ marginBottom: 20 })}>
          <FilterBar filter={filter} setFilter={setFilter} floors={floors} />
        </div>
        <div
          style={pageWrap({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          })}
        >
          <div style={{ fontSize: 13, color: "#9DB89F", display: "flex", alignItems: "baseline", gap: 10 }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 32,
                color: "#4A8C5C",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {filtered.length}
            </span>
            <span style={{ letterSpacing: 0.4 }}>units match</span>
          </div>
          <button
            type="button"
            onClick={() => setFilter(DEFAULT_FILTER())}
            style={{
              background: "none",
              border: "none",
              color: "#4A8C5C",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: 0.5,
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 600,
            }}
          >
            Clear filters
          </button>
        </div>
        <div
          style={{
            ...pageWrap(),
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: 18,
          }}
        >
          {filtered.map((apt, i) => (
            <AptCard key={apt.id} apt={apt} idx={i} />
          ))}
        </div>
      </section>

      <section id="amenities" style={{ background: "#0A1610", padding: "80px 0" }}>
        <div style={pageWrap()}>
          <SectionHeader title="Project amenities" minimal />
        </div>
        <Marquee />
        <div
          style={{
            ...pageWrap(),
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: 14,
          }}
        >
          {AMENITIES.map((a, i) => (
            <AmenityCard key={a.key} item={a} idx={i} />
          ))}
        </div>
      </section>

      <section id="localization" style={{ background: "#0F1F17", padding: "80px 0" }}>
        <div style={pageWrap()}>
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: 560,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9DB89F",
                  fontSize: 12,
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Loading 3D map…
              </div>
            }
          >
            <LocationSection activeLoc={activeLoc} setActiveLoc={setActiveLoc} />
          </Suspense>
        </div>
      </section>

      <Footer onOpenRegister={openRegister} />
    </div>
  );
}
