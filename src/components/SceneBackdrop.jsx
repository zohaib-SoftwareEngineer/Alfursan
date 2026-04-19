import React from 'react';
import styles from './SceneBackdrop.module.css';
import { assetUrl } from '../assetPaths';

export default function SceneBackdrop() {
  const pattern = assetUrl('assets/icons/header_pattern.svg');

  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.gradient} />
      <div
        className={styles.pattern}
        style={{ backgroundImage: `url(${pattern})` }}
      />
      <div className={styles.vignette} />
    </div>
  );
}
