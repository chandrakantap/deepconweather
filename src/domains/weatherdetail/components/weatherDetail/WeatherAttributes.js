import React from 'react';
import styles from './WeatherDetail.module.css';


function WeatherAttributes() {
    return (
        <div className={styles.waRoot}>
            <div className={styles.waTile}>
                <h3>7</h3>
                <p>Wind Speed</p>
            </div>
            <div className={styles.waTile}>
                <h3>989</h3>
                <p>Pressure</p>
            </div>
            <div className={styles.waTile}>
                <h3>60</h3>
                <p>Precipitation</p>
            </div>
            <div className={styles.waTile}>
                <h3>200</h3>
                <p>Humidity</p>
            </div>
            <div className={styles.waTile}>
                <h3>100</h3>
                <p>Cloud Cover</p>
            </div>
            <div className={styles.waTile}>
                <h3>5</h3>
                <p>Visibility</p>
            </div>
        </div>
    )
}
export default WeatherAttributes;