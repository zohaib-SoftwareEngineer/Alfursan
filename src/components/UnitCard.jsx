import React, { useState } from 'react';
import styles from './UnitCard.module.css';
import { getThumbnail, formatPrice } from '../data';

export default function UnitCard({ unit, onOpen, favorited, onFavorite }) {
  const [imgError, setImgError] = useState(false);
  const thumb = getThumbnail(unit.type);

  // Show real price if available, fall back to status label
  const priceDisplay = unit.price
    ? formatPrice(unit.price)
    : unit.status === 'sold'
    ? 'Sold'
    : 'Contact for price';
  const isSold = unit.status === 'sold';

  const stop = (e) => e.stopPropagation();

  return (
    <article
      className={`${styles.card} ${styles.group}`}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(unit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(unit);
        }
      }}
    >
      <div className={styles.imageBlock}>
        <p className={styles.imageTag}>{unit.label}</p>
        {!imgError ? (
          <img
            src={thumb}
            alt=""
            className={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.imageFallback}>{unit.type}</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.unitId}>‎{unit.id}</p>
          <div className={styles.actions} onClick={stop}>
            <button type="button" className={styles.iconBtn} aria-label="Compare (demo)" title="Compare">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden>
                <rect x="10" y="10" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
                <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.iconBtn} ${favorited ? styles.iconBtnOn : ''}`}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              title="Favorites"
              onClick={(e) => {
                stop(e);
                onFavorite(unit.id);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden>
                <path
                  d="M19.104 4.226a7.791 7.791 0 0 0-11.133 0L11 5.197l1.029-1.029a7.791 7.791 0 0 0-11.029 11.029l1.029 1.029L11 19.461l9.971-10.235 1.029-1.029a7.791 7.791 0 0 0 0-10.971Z"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.5"
                  fill={favorited ? 'rgba(9,111,106,0.9)' : 'none'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.fields}>
          <p className={styles.field}>
            <span className={styles.fieldLab}>Unit size:</span>
            <span className={styles.fieldVal}>
              {unit.size} <span className={styles.unitSq}>m²</span>
            </span>
          </p>
          <p className={styles.field}>
            <span className={styles.fieldLab}>Floor:</span>
            <span className={styles.fieldVal}>{unit.floor}</span>
          </p>
          <p className={styles.field}>
            <span className={styles.fieldLab}>Bedrooms:</span>
            <span className={styles.fieldVal}>{unit.bedrooms}</span>
          </p>
          <p className={styles.field}>
            <span className={styles.fieldLab}>Bathrooms:</span>
            <span className={styles.fieldVal}>{unit.bathrooms}</span>
          </p>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.priceLab}>Price:</span>
          <span
            className={`${styles.priceVal} ${isSold ? styles.priceSold : styles.priceAvail}`}
          >
            {priceDisplay}
          </span>
        </div>
      </div>
    </article>
  );
}
