import React, { useState, useMemo, useEffect } from 'react';
import Filters from './components/Filters';
import UnitCard from './components/UnitCard';
import UnitDetail from './components/UnitDetail';
import SceneBackdrop from './components/SceneBackdrop';
import FloatingCompass from './components/FloatingCompass';
import DisclaimerBar from './components/DisclaimerBar';
import MobileBar from './components/MobileBar';
import Gallery from './components/Gallery';
import {
  UNITS,
  BUILDING,
  SIZE_MIN,
  SIZE_MAX,
  AVAILABLE_COUNT,
} from './data';
import styles from './App.module.css';

const SORT_OPTIONS = [
  { value: 'id-asc', label: 'number: 0–9' },
  { value: 'id-desc', label: 'number: 9–0' },
  { value: 'floor-asc', label: 'Floor ↑' },
  { value: 'floor-desc', label: 'Floor ↓' },
  { value: 'size-asc', label: 'Size ↑' },
  { value: 'size-desc', label: 'Size ↓' },
];

function readSideFromUrl() {
  if (typeof window === 'undefined') return 'east';
  return new URLSearchParams(window.location.search).get('side') || 'east';
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem('alfursan-favorites');
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export default function App() {
  const [filters, setFilters] = useState({
    withBalcony: false,
    duplex: false,
    favorites: false,
    forSale: false,
    floor: 'all',
    sizeMin: SIZE_MIN,
    sizeMax: SIZE_MAX,
  });

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [sortBy, setSortBy] = useState('id-asc');
  const [favoriteIds, setFavoriteIds] = useState(loadFavorites);
  const [disclaimerOpen, setDisclaimerOpen] = useState(() => {
    try {
      return localStorage.getItem('alfursan-disclaimer-dismissed') !== '1';
    } catch {
      return true;
    }
  });
  const [sideQuery, setSideQuery] = useState(readSideFromUrl);

  useEffect(() => {
    const onPop = () => setSideQuery(readSideFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('alfursan-favorites', JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const dismissDisclaimer = () => {
    setDisclaimerOpen(false);
    try {
      localStorage.setItem('alfursan-disclaimer-dismissed', '1');
    } catch {
      /* ignore */
    }
  };

  const filtered = useMemo(() => {
    let result = [...UNITS];

    if (filters.floor !== 'all') {
      result = result.filter((u) => u.floor === Number(filters.floor));
    }
    if (filters.withBalcony) {
      result = result.filter((u) => u.hasBalcony);
    }
    if (filters.duplex) {
      result = result.filter((u) => u.isDuplex);
    }
    if (filters.forSale) {
      result = result.filter((u) => u.status === 'available');
    }
    if (filters.favorites) {
      result = result.filter((u) => favoriteIds.has(u.id));
    }
    result = result.filter(
      (u) => u.size >= filters.sizeMin && u.size <= filters.sizeMax,
    );

    const cmpId = (a, b) => a.id.localeCompare(b.id, undefined, { numeric: true });

    switch (sortBy) {
      case 'id-asc':
        result.sort(cmpId);
        break;
      case 'id-desc':
        result.sort((a, b) => cmpId(b, a));
        break;
      case 'floor-asc':
        result.sort((a, b) => a.floor - b.floor);
        break;
      case 'floor-desc':
        result.sort((a, b) => b.floor - a.floor);
        break;
      case 'size-asc':
        result.sort((a, b) => a.size - b.size);
        break;
      case 'size-desc':
        result.sort((a, b) => b.size - a.size);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy, favoriteIds]);

  const filteredAvailable = useMemo(
    () => filtered.filter((u) => u.status === 'available').length,
    [filtered],
  );

  return (
    <>
      <SceneBackdrop />
      <FloatingCompass />
      {disclaimerOpen && <DisclaimerBar onDismiss={dismissDisclaimer} />}
      <MobileBar />

      <div className={styles.shell}>
        <div className={styles.sceneZone} aria-hidden />

        <div className={styles.panel}>
          <div className={styles.panelInner}>
            <a
              href="https://safaalfursan.sa/"
              target="_blank"
              rel="noreferrer"
              className={styles.selectBuilding}
            >
              <span className={styles.backIcon} aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 25" fill="none">
                  <path d="M22 13H3L10.3548 4.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 13H3L10.3548 21.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>Select building</span>
            </a>

            <Filters
              filters={filters}
              onChange={setFilters}
              favoriteIds={favoriteIds}
              sizeBounds={{ min: SIZE_MIN, max: SIZE_MAX }}
            />

            <div className={styles.resultsRow}>
              <div className={styles.availableBlock}>
                <div className={styles.availableHeading}>
                  <span className={styles.avBadge}>
                    <span className={styles.avBadgeNum}>{AVAILABLE_COUNT}</span>
                  </span>
                  <h2 className={styles.availableTitle}>available</h2>
                </div>
                <span className={styles.filteredHint}>
                  {filteredAvailable} of {AVAILABLE_COUNT} available units match filters
                </span>
              </div>
              <label className={styles.sortWrap}>
                <span className={styles.visuallyHidden}>Sort</span>
                <select
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={styles.listScroll}>
              {filtered.map((unit) => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  onOpen={setSelectedUnit}
                  favorited={favoriteIds.has(unit.id)}
                  onFavorite={toggleFavorite}
                />
              ))}
              {filtered.length === 0 && (
                <div className={styles.empty}>
                  <p>No units match your filters.</p>
                  <button
                    type="button"
                    className={styles.emptyBtn}
                    onClick={() =>
                      setFilters({
                        withBalcony: false,
                        duplex: false,
                        favorites: false,
                        forSale: false,
                        floor: 'all',
                        sizeMin: SIZE_MIN,
                        sizeMax: SIZE_MAX,
                      })
                    }
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <footer className={styles.miniFooter}>
              <a href="https://safaalfursan.sa/" target="_blank" rel="noreferrer" className={styles.footerLink}>
                safaalfursan.sa
              </a>
              <span className={styles.footerSep}>·</span>
              <span>{BUILDING.project} – {BUILDING.zone} – {BUILDING.name}</span>
              <span className={styles.footerSep}>·</span>
              <button
                type="button"
                className={styles.galleryTrigger}
                onClick={() => setGalleryOpen(true)}
              >
                📷 Images
              </button>
            </footer>
          </div>
        </div>
      </div>

      {selectedUnit && (
        <UnitDetail
          unit={selectedUnit}
          side={sideQuery}
          onClose={() => setSelectedUnit(null)}
        />
      )}

      {galleryOpen && <Gallery onClose={() => setGalleryOpen(false)} />}
    </>
  );
}
