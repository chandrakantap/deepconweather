import React from 'react';
import SingleCityInfo from 'domains/cityweatherlist/components/singlecityInfo/SingleCityInfo';
import styles from './CityWeatherListPage.module.css';

const cities = [
    'london',
    'pune',
    'noida',
    'delhi',
    'mumbai',
    '123',
    '897',
    '7213',
    '123123',
    '345345'
]
export default function () {
    return (<section>
        <header className={styles.header}>
            <h1>City Weather Info</h1>
        </header>
        <main className={styles.cityList}>
            {cities.map(city => <SingleCityInfo city={city} key={city} />)}
        </main>
    </section>)
}