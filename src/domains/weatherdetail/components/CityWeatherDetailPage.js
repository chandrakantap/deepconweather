import React from 'react';
import { MdHome } from 'react-icons/md'
import IconButton from 'common/ui/IconButton';
import CityTemperatureDetail from './weatherDetail/CityTemperatureDetail';
import WeatherAttributes from './weatherDetail/WeatherAttributes';
import UserNotes from './userNotes/UserNotes';
import styles from './CityWeatherDetailPage.module.css';

function CityWeatherDetailPage(props) {
    const onClickBack = () => {
        props.history.push('/list');
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
    )
}

export default CityWeatherDetailPage;