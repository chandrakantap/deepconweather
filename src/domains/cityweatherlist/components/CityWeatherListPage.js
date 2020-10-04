import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import Throbber from "common/ui/Throbber";
import SingleCityInfo from "domains/cityweatherlist/components/singlecityInfo/SingleCityInfo";
import CitySearch from "domains/citysearch/components/CitySearch";
import {
  loadCityListAction,
  toggleFavouriteAction,
  removeCityAction,
  addCityToListAction,
} from "domains/cityweatherlist/store/cityWeatherListPageActions";
import {
  cityListSelector,
  isCityListLoadedSelector,
} from "domains/cityweatherlist/store/cityWeatherListPageSelectors";
import styles from "./CityWeatherListPage.module.css";

const selector = createSelector(
  cityListSelector,
  isCityListLoadedSelector,
  (cityList, isCityListLoaded) => ({
    cityList,
    isCityListLoaded,
  })
);

function CityWeatherListPage() {
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
  const addNewCityToList = (city) => {
    dispatch(addCityToListAction(city));
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
      </header>
      <main className={styles.cityList}>
        <div className={styles.citySearchContainer}>
          <CitySearch onSelect={addNewCityToList} />
        </div>
        {cityList.map((city) => (
          <Link
            to={`/detail?cityId=${city.id}&cityName=${city.name}&region=${city.region}&country=${city.country}`}
            key={city.id}
          >
            <SingleCityInfo
              city={city}
              onClickFavourite={onClickFavourite}
              onClickRemove={onClickRemove}
            />
          </Link>
        ))}
      </main>
    </section>
  );
}

export default CityWeatherListPage;
