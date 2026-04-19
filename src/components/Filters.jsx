import React, { useState } from 'react';
import styles from './Filters.module.css';
import { BUILDING, SIZE_MIN, SIZE_MAX } from '../data';

export default function Filters({
  filters,
  onChange,
  favoriteIds,
  sizeBounds = { min: SIZE_MIN, max: SIZE_MAX },
}) {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = (key) => {
    onChange({ ...filters, [key]: !filters[key] });
  };

  const handleFloor = (floor) => {
    onChange({ ...filters, floor });
  };

  const handleClear = () => {
    onChange({
      withBalcony: false,
      duplex: false,
      favorites: false,
      forSale: false,
      floor: 'all',
      sizeMin: sizeBounds.min,
      sizeMax: sizeBounds.max,
    });
  };

  const activeCount = [
    filters.withBalcony,
    filters.duplex,
    filters.favorites,
    filters.forSale,
    filters.floor !== 'all',
    filters.sizeMin > sizeBounds.min,
    filters.sizeMax < sizeBounds.max,
  ].filter(Boolean).length;

  const floors = [1, 2, 3, 4, 5];

  const setSizeMin = (raw) => {
    let v = Number(raw);
    if (Number.isNaN(v)) return;
    v = Math.min(sizeBounds.max, Math.max(sizeBounds.min, v));
    if (v > filters.sizeMax) v = filters.sizeMax;
    onChange({ ...filters, sizeMin: v });
  };

  const setSizeMax = (raw) => {
    let v = Number(raw);
    if (Number.isNaN(v)) return;
    v = Math.min(sizeBounds.max, Math.max(sizeBounds.min, v));
    if (v < filters.sizeMin) v = filters.sizeMin;
    onChange({ ...filters, sizeMax: v });
  };

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.filterToggle}
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          <span className={styles.filterToggleLabel}>
            filters
            <span className={styles.badge}>
              <span className={styles.badgeNum}>{activeCount}</span>
            </span>
          </span>
          <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" aria-hidden>
              <path stroke="#fff" d="M9.6 8.4 6 4.8 2.4 8.4" />
            </svg>
          </span>
        </button>
        <button type="button" className={styles.clearLink} onClick={handleClear}>
          Clear filters
        </button>
      </div>

      <div className={`${styles.panel} ${expanded ? styles.panelOpen : styles.panelShut}`}>
        <div className={styles.section}>
          <p className={styles.fieldLabel}>Building</p>
          <div className={styles.buildingRow}>
            <span className={styles.buildingValue}>{BUILDING.name}</span>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.fieldLabel}>Floor</p>
          <div className={styles.floorRow}>
            <button
              type="button"
              className={`${styles.floorChip} ${filters.floor === 'all' ? styles.floorChipOn : ''}`}
              onClick={() => handleFloor('all')}
            >
              All
            </button>
            {floors.map((f) => (
              <button
                key={f}
                type="button"
                className={`${styles.floorChip} ${filters.floor === String(f) ? styles.floorChipOn : ''}`}
                onClick={() => handleFloor(String(f))}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.rangeTitle}>Square metrage [m²]</p>
          <div className={styles.rangeInputs}>
            <input
              type="number"
              className={styles.numInput}
              value={Math.round(filters.sizeMin)}
              onChange={(e) => setSizeMin(e.target.value)}
            />
            <span className={styles.rangeDash}>-</span>
            <input
              type="number"
              className={styles.numInput}
              value={Math.round(filters.sizeMax)}
              onChange={(e) => setSizeMax(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.fieldLabel}>Show only</p>
          <div className={styles.checkboxCol}>
            <label className={styles.cb}>
              <input
                type="checkbox"
                checked={filters.withBalcony}
                onChange={() => handleToggle('withBalcony')}
              />
              <span>With balcony</span>
            </label>
            <label className={styles.cb}>
              <input type="checkbox" checked={filters.duplex} onChange={() => handleToggle('duplex')} />
              <span>Duplex</span>
            </label>
            <label className={styles.cb}>
              <input
                type="checkbox"
                checked={filters.favorites}
                onChange={() => handleToggle('favorites')}
                disabled={favoriteIds.size === 0}
              />
              <span>Favorites</span>
            </label>
            <label className={styles.cb}>
              <input type="checkbox" checked={filters.forSale} onChange={() => handleToggle('forSale')} />
              <span>For sale</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
