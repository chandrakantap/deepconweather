import React from "react";
import { useSelector } from "react-redux";
import { cityWeatherDetailsSelector } from "domains/weatherdetail/store/cityWeatherDetailPageSelectors";
import styles from "./WeatherDetail.module.css";

function CityTemperatureDetail() {
  const city = useSelector(cityWeatherDetailsSelector);
  return (
    <div className={styles.mainDetails}>
      <div className={styles.cityName}>
        <h1>{city.name}</h1>
        <h3>
          {city.region ? `${city.region}, ${city.country}` : city.country}
        </h3>
      </div>
      <div className={styles.temperatureBlock}>
        <p className={styles.temperature}>{city.current.temperature} &#8451;</p>
        <p>{city.current.weather_descriptions[0]}</p>
      </div>
    </div>
  );
}

export default CityTemperatureDetail;
