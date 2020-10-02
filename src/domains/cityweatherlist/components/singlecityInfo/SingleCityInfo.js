import React from 'react';
import styles from './SingleCityInfo.module.css';


export default function ({ city }) {
    return (<section className={styles.root}>
        <h1 className={styles.cityName}>{city}</h1>
        <h2 className={styles.temperature}>25&#8451;</h2>
    </section>);
}