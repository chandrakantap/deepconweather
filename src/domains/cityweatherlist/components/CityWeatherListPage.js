import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import Throbber from "common/ui/Throbber";
import SingleCityInfo from "domains/cityweatherlist/components/singlecityInfo/SingleCityInfo";
import CitySearch from "domains/citysearch/components/CitySearch";
import {
  loadCityListAction,
  toggleFavouriteAction,
  removeCityAction,
} from "domains/cityweatherlist/store/cityWeatherListPageActions";
import {
  cityListSelector,
  isCityListLoadedSelector,
} from "domains/cityweatherlist/store/cityWeatherListPageSelectors";
import OnlineIndicator from "common/ui/OnlineIndicator";
import styles from "./CityWeatherListPage.module.css";

const selector = createSelector(
  cityListSelector,
  isCityListLoadedSelector,
  (cityList, isCityListLoaded) => ({
    cityList,
    isCityListLoaded,
  })
);

function CityWeatherListPage({ history }) {
  const dispatch = useDispatch();
  const { cityList, isCityListLoaded } = useSelector(selector);

  useEffect(() => {
    dispatch(loadCityListAction());
  }, [dispatch]);

  const onClickFavourite = (city) => {
    dispatch(toggleFavouriteAction(city.id));
  };
  const onClickRemove = (city) => {
    dispatch(removeCityAction(city.id));
  };
  const onSelectCity = (city) => {
    history.push(
      `/detail?cityId=${city.id}&cityName=${city.name}&region=${city.region}&country=${city.country}`
    );
  };

  if (!isCityListLoaded) {
    return (
      <section>
        <Throbber />
      </section>
    );
  }

  return (
    <section>
      <header className={styles.header}>
        <h1>City Weather Info</h1>
        <OnlineIndicator />
      </header>
      <main className={styles.cityList}>
        <div className={styles.citySearchContainer}>
          <CitySearch onSelectCity={onSelectCity} />
        </div>
        {cityList.map((city) => (
          <SingleCityInfo
            key={city.id}
            city={city}
            onClickFavourite={onClickFavourite}
            onClickRemove={onClickRemove}
          />
        ))}
      </main>
    </section>
  );
}

export default CityWeatherListPage;
