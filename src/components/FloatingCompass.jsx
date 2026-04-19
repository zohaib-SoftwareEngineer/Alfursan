import React from 'react';
import styles from './FloatingCompass.module.css';
import { BUILDING } from '../data';

export default function FloatingCompass() {
  return (
    <div className={styles.wrap}>
      <img
        src={BUILDING.compassIcon}
        alt=""
        className={styles.img}
        width={100}
        height={100}
      />
    </div>
  );
}
