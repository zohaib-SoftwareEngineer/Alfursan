import React from 'react';
import styles from './DisclaimerBar.module.css';
import { BUILDING } from '../data';

export default function DisclaimerBar({ onDismiss }) {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <span className={styles.text}>{BUILDING.disclaimer}</span>
        <button type="button" className={styles.close} onClick={onDismiss} aria-label="Dismiss disclaimer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" aria-hidden>
            <path
              fill="#fff"
              d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
