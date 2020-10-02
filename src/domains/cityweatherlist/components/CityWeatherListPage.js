import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import Throbber from 'common/ui/Throbber'
import SingleCityInfo from 'domains/cityweatherlist/components/singlecityInfo/SingleCityInfo';
import {
    loadCityListAction,
    toggleFavouriteAction,
    removeCityAction
} from 'domains/cityweatherlist/store/cityWeatherListPageActions';
import {
    cityListSelector,
    isCityListLoadedSelector
} from 'domains/cityweatherlist/store/cityWeatherListPageSelectors';
import styles from './CityWeatherListPage.module.css';


const selector = createSelector(
    cityListSelector,
    isCityListLoadedSelector,
    (cityList, isCityListLoaded) => ({
        cityList,
        isCityListLoaded
    })
);


function CityWeatherListPage() {
    const dispatch = useDispatch();
    const { cityList, isCityListLoaded } = useSelector(selector);

    useEffect(() => {
        dispatch(loadCityListAction());
    }, [dispatch])

    const onClickFavourite = (city) => {
        dispatch(toggleFavouriteAction(city));
    }
    const onClickRemove = (city) => {
        dispatch(removeCityAction(city));
    }
    if (!isCityListLoaded) {
        return <section>
            <Throbber />
        </section>
    }

    return (<section>
        <header className={styles.header}>
            <h1>City Weather Info</h1>
        </header>
        <main className={styles.cityList}>
            {cityList.map(city => <Link to={`/detail/${city.name}/${city.country}`} key={city.name + city.country}>
                <SingleCityInfo city={city}
                    onClickFavourite={onClickFavourite}
                    onClickRemove={onClickRemove} />
            </Link>)}
        </main>
    </section>)
};

export default CityWeatherListPage;