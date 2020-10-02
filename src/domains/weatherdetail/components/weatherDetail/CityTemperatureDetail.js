import React from 'react';
import { useSelector } from 'react-redux';
import {
    cityWeatherDetailsSelector
} from 'domains/weatherdetail/store/cityWeatherDetailPageSelectors';
import styles from './WeatherDetail.module.css';


function CityTemperatureDetail() {
    const cityDetail = useSelector(cityWeatherDetailsSelector);
    return (
        <div className={styles.mainDetails}>
            <div className={styles.cityName}>
                <h1>{cityDetail.name}</h1>
                <h3>{cityDetail.country}</h3>
            </div>
            <div>
                <p className={styles.temperature}>{cityDetail.current.temperature} &#8451;</p>
                <p>{cityDetail.current.weather_descriptions[0]}</p>
            </div>
        </div>
    )
}

export default CityTemperatureDetail;