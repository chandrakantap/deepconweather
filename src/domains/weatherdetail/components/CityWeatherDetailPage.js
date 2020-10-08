import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { MdHome, MdArrowBack } from "react-icons/md";
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
import { isCityListLoadedSelector } from "domains/cityweatherlist/store/cityWeatherListPageSelectors";
import { getQueryParams } from "common/urlUtils";
import styles from "./CityWeatherDetailPage.module.css";

const combinedSelecttor = createSelector(
  isDetailsLoadedSelector,
  isCityListLoadedSelector,
  (isLoaded, isListPageLoaded) => ({ isLoaded, isListPageLoaded })
);

function CityWeatherDetailPage(props) {
  const dispatch = useDispatch();
  const { isLoaded, isListPageLoaded } = useSelector(combinedSelecttor);

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
    if (isListPageLoaded) {
      props.history.goBack();
    }
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
          {isListPageLoaded ? (
            <>
              <MdArrowBack />
              &nbsp;&nbsp; Back
            </>
          ) : (
            <>
              <MdHome /> &nbsp;&nbsp;Home
            </>
          )}
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
