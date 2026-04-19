import React from 'react';
import styles from './MobileBar.module.css';
import { assetUrl } from '../assetPaths';

export default function MobileBar() {
  const pattern = assetUrl('assets/icons/header_pattern.svg');

  return (
    <header className={styles.bar}>
      <span className={styles.title}>Alfursan</span>
      <div
        className={styles.pattern}
        style={{ backgroundImage: `url(${pattern})` }}
        aria-hidden
      />
    </header>
  );
}
