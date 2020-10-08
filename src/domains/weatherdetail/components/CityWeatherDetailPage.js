import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdHome } from "react-icons/md";
import IconButton from "common/ui/IconButton";
import Throbber from "common/ui/Throbber";
import {
  loadCityWeatherDetailAction,
  clearStateAction,
} from "domains/weatherdetail/store/cityWeatherDetailPageActions";
import CityTemperatureDetail from "./CityTemperatureDetail";
import WeatherAttributes from "./WeatherAttributes";
import UserNotes from "domains/userNotes/components/UserNotes";
import { isDetailsLoadedSelector } from "domains/weatherdetail/store/cityWeatherDetailPageSelectors";
import { getQueryParams } from "common/urlUtils";
import styles from "./CityWeatherDetailPage.module.css";

function CityWeatherDetailPage(props) {
  const dispatch = useDispatch();
  const isLoaded = useSelector(isDetailsLoadedSelector);

  useEffect(() => {
    const { cityId, cityName, region, country } = getQueryParams(
      decodeURI(props.location.search)
    );
    dispatch(
      loadCityWeatherDetailAction({ cityId, cityName, region, country })
    );
    return () => dispatch(clearStateAction());
  }, [dispatch, props.location.search]);

  const onClickBack = () => {
    props.history.push("/list");
  };
  if (!isLoaded) {
    return (
      <section className={styles.detailPageRoot}>
        <Throbber />
      </section>
    );
  }
  return (
    <section className={styles.detailPageRoot}>
      <div className={styles.backButton}>
        <IconButton onClick={onClickBack}>
          <MdHome /> &nbsp;&nbsp;Home
        </IconButton>
      </div>
      <CityTemperatureDetail />
      <div className={styles.lowerSection}>
        <WeatherAttributes />
        <div />
        <UserNotes />
      </div>
    </section>
  );
}

export default CityWeatherDetailPage;
