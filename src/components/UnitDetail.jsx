import React, { useEffect } from 'react';
import styles from './UnitDetail.module.css';
import { getThumbnail, UNIT_ROOMS, UNIT_VIDEO_URL, formatPrice } from '../data';

export default function UnitDetail({ unit, side, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const thumb = getThumbnail(unit.type);
  const videoUrl = unit.unitNum === '1_02' ? UNIT_VIDEO_URL : null;
  const rooms = UNIT_ROOMS[unit.unitNum] ?? [];

  const originalUrl = `https://safaalfursan.sa/Alfursan/Zone_B/Alfursan_C4V/${unit.unitNum}?side=${encodeURIComponent(side)}&floor=${unit.floor}`;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.panel}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.unitTitle}>‎{unit.id}</h2>
            <p className={styles.unitSub}>{unit.label}</p>
          </div>
          <span className={`${styles.statusTag} ${unit.status === 'sold' ? styles.sold : styles.available}`}>
            {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            <img src={thumb} alt="" className={styles.floorplan} />
            {videoUrl && (
              <video
                src={videoUrl}
                className={styles.video}
                controls
                poster={thumb}
                preload="metadata"
              />
            )}
          </div>

          <div className={styles.infoSection}>
            <div className={styles.statsGrid}>
              {[
                { label: 'Unit Size', value: `${unit.size} m²` },
                { label: 'Floor', value: unit.floor },
                { label: 'Bedrooms', value: unit.bedrooms },
                { label: 'Bathrooms', value: unit.bathrooms },
                { label: 'Apartment Type', value: `${unit.type} (${unit.label})` },
                { label: 'Status', value: unit.status.charAt(0).toUpperCase() + unit.status.slice(1) },
                ...(unit.price ? [{ label: 'Price', value: formatPrice(unit.price) }] : []),
              ].map(({ label, value }) => (
                <div key={label} className={styles.stat}>
                  <span className={styles.statLabel}>{label}</span>
                  <span className={styles.statValue}>{value}</span>
                </div>
              ))}
            </div>

            {rooms.length > 0 && (
              <div className={styles.rooms}>
                <h3 className={styles.roomsTitle}>Room Breakdown</h3>
                <div className={styles.roomList}>
                  {rooms.map((room) => (
                    <div key={room.name} className={styles.roomRow}>
                      <span className={styles.roomName}>{room.name}</span>
                      <span className={styles.roomSize}>{room.size} m²</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.actions}>
              <a href={originalUrl} target="_blank" rel="noreferrer" className={styles.viewOriginal}>
                View on Original Site ↗
              </a>
              {unit.status === 'available' && (
                <button type="button" className={styles.reserveBtn}>
                  Reserve Unit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
