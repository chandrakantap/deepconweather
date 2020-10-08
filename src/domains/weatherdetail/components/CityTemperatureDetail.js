import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cityWeatherDetailsSelector } from "domains/weatherdetail/store/cityWeatherDetailPageSelectors";
import { toggleFavouriteAction } from "domains/weatherdetail/store/cityWeatherDetailPageActions";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import IconButton from "common/ui/IconButton";
import styles from "./WeatherDetail.module.css";

function CityTemperatureDetail() {
  const city = useSelector(cityWeatherDetailsSelector);
  const dispatch = useDispatch();

  const onClickFavourite = () => {
    dispatch(toggleFavouriteAction(city.id));
  };

  return (
    <div className={styles.mainDetails}>
      <div className={styles.cityName}>
        <h1>
          {city.name}
          <IconButton
            className={styles.favouriteIcon}
            onClick={onClickFavourite}
            data-testid="DetailPage_favBtn"
          >
            {city.isFavourite ? <MdFavorite /> : <MdFavoriteBorder />}
          </IconButton>
        </h1>
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
