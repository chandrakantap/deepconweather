import * as userPrefService from './userPreferenceService';

const apiBaseURL = 'http://api.weatherstack.com';
const accessKey = process.env.REACT_APP_WS_API_KEY;

const cityDataSortFunction = (a, b) => {

};

export async function getListPageCitiesData() {
    const listPageCities = userPrefService.getListPageCities();
    const listPageCitiesData = await Promise.all(
        listPageCities.map(async city => {
            const { name, country, current } = await getCityWeather(city.name);
            return { name, country, current, isFavourite: city.isFavourite }
        })
    );
    return listPageCitiesData.sort(cityDataSortFunction);
}

export async function getCityWeather(cityName) {
    const response = await fetch(`${apiBaseURL}/current?access_key=${accessKey}&query=${cityName}`);
    const { location: { name, country }, current } = await response.json();
    return {
        name,
        country,
        current
    }
}