import React from 'react';
import styles from './WeatherDetail.module.css';



function CityTemperatureDetail() {
    return (
        <div className={styles.mainDetails}>
            <div className={styles.cityName}>
                <h1>Higashi-Osaka</h1>
                <h3>Japan</h3>
            </div>
            <div>
                <p className={styles.temperature}>18 &#8451;</p>
                <p>Partly Cloudy</p>
            </div>
        </div>
    )
}

export default CityTemperatureDetail;