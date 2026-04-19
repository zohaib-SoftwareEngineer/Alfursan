import React, { useState } from 'react';
import styles from './Gallery.module.css';
import { GALLERY_IMAGES } from '../data.js';

const TYPE_LABELS = {
  A: 'Type A',
  B: 'Type B',
  C: 'Type C',
  D: 'Type D',
  E: 'Type E',
  icon: 'Icons',
};

export default function Gallery({ onClose }) {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const types = ['all', ...Object.keys(TYPE_LABELS)];

  const images = filter === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.type === filter);

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Image Gallery</h2>
            <p className={styles.subtitle}>
              {GALLERY_IMAGES.length} assets extracted from safaalfursan.sa
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close gallery">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Filter chips */}
        <div className={styles.filters}>
          {types.map((t) => (
            <button
              key={t}
              className={`${styles.chip} ${filter === t ? styles.chipActive : ''}`}
              onClick={() => setFilter(t)}
            >
              {t === 'all' ? 'All' : TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {images.map((img) => (
            <button
              key={img.filename}
              className={styles.card}
              onClick={() => setLightbox(img)}
              aria-label={`View ${img.label}`}
            >
              <div className={styles.imgWrap}>
                <img
                  src={img.local}
                  alt={img.label}
                  className={styles.thumb}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.cardLabel}>{img.label}</p>
                <p className={styles.cardDesc}>{img.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label}
        >
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.lbClose}
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={lightbox.local} alt={lightbox.label} className={styles.lbImg} />
            <div className={styles.lbCaption}>
              <strong>{lightbox.label}</strong>
              <span>{lightbox.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
