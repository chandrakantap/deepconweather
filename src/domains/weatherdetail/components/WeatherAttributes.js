import React from "react";
import { useSelector } from "react-redux";
import { cityWeatherDetailsSelector } from "domains/weatherdetail/store/cityWeatherDetailPageSelectors";
import styles from "./WeatherDetail.module.css";

function WeatherAttributes() {
  const cityDetail = useSelector(cityWeatherDetailsSelector);
  return (
    <div className={styles.waRoot}>
      <div className={styles.waTile}>
        <h3>{cityDetail.current.wind_speed}</h3>
        <p>Wind Speed</p>
      </div>
      <div className={styles.waTile}>
        <h3>{cityDetail.current.pressure}</h3>
        <p>Pressure</p>
      </div>
      <div className={styles.waTile}>
        <h3>{cityDetail.current.precip}</h3>
        <p>Precipitation</p>
      </div>
      <div className={styles.waTile}>
        <h3>{cityDetail.current.humidity}</h3>
        <p>Humidity</p>
      </div>
      <div className={styles.waTile}>
        <h3>{cityDetail.current.cloudcover}</h3>
        <p>Cloud Cover</p>
      </div>
      <div className={styles.waTile}>
        <h3>{cityDetail.current.visibility}</h3>
        <p>Visibility</p>
      </div>
    </div>
  );
}
export default WeatherAttributes;
