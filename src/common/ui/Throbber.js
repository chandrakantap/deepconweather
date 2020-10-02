import React from 'react';
import styles from './CommonUI.module.css';

export default function Throbber() {
    return (<div className={styles.throbber}>
        <div className={styles.throbberMask}></div>
        <div className={styles.loaderContainer}>
            <div className={styles.loader} />
        </div>
    </div>
    );
}