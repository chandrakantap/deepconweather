import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdHome } from 'react-icons/md'
import IconButton from 'common/ui/IconButton';
import Throbber from 'common/ui/Throbber'
import {
    loadCityWeatherDetailAction,
    clearStateAction
} from 'domains/weatherdetail/store/cityWeatherDetailPageActions';
import CityTemperatureDetail from './weatherDetail/CityTemperatureDetail';
import WeatherAttributes from './weatherDetail/WeatherAttributes';
import UserNotes from 'domains/userNotes/components/UserNotes';
import {
    isDetailsLoadedSelector
} from 'domains/weatherdetail/store/cityWeatherDetailPageSelectors';
import styles from './CityWeatherDetailPage.module.css';

function CityWeatherDetailPage(props) {
    const { cityname, country } = props.match.params;
    const dispatch = useDispatch();
    const isLoaded = useSelector(isDetailsLoadedSelector);

    useEffect(() => {
        dispatch(loadCityWeatherDetailAction({ name: cityname, country }));
        return () => { dispatch(clearStateAction()) }
    }, [dispatch, cityname, country])

    const onClickBack = () => {
        props.history.push('/list');
    }
    if (!isLoaded) {
        return (<section className={styles.detailPageRoot}>
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
                <UserNotes cityName={cityname} country={country} />
            </div>
        </section>
    )
}

export default CityWeatherDetailPage;