import weatherService from './weatherService';
import topCitiesByPopulation from './topCitiesByPopulation';

const LIST_PAGE_CITIES_SK = 'LIST_PAGE_CITIES_SK';
function getCityList() {
    const listPageCitiesString = localStorage.getItem(LIST_PAGE_CITIES_SK);
    let listPageCities;

    if (!listPageCitiesString) {
        listPageCities = topCitiesByPopulation.slice(0, 15);
        localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(listPageCities));
    } else {
        listPageCities = JSON.parse(listPageCitiesString);
    }
    return listPageCities;
}

const cityDataSortFunction = (a, b) => {
    if (a.isFavourite !== b.isFavourite) {
        return a.isFavourite ? -1 : 1;
    } else {
        return a.name.localeCompare(b.name);
    }
};

async function getCityDetail(city) {
    const { name, country, current } = await weatherService.getCityWeather(city.name);
    return { name, country, current, isFavourite: city.isFavourite }
}

async function getListPageCitiesData() {
    const listPageCities = getCityList();
    const listPageCitiesData = await Promise.all(
        listPageCities.map(city => getCityDetail(city))
    );
    return listPageCitiesData.sort(cityDataSortFunction);
}

function toggleFavourite({ name, country }) {
    const listPageCities = getCityList();
    const cityNameCountry = `${name},${country}`;
    const updatedCityData = listPageCities.map(cityData => {
        return cityData.name === cityNameCountry
            ? ({ ...cityData, isFavourite: !cityData.isFavourite })
            : cityData
    });
    localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(updatedCityData));
}

function removeCity({ name, country }) {
    const listPageCities = getCityList();
    const cityNameCountry = `${name},${country}`;
    const updatedCityData = listPageCities.filter(cityData => cityData.name !== cityNameCountry);
    localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(updatedCityData));
}

export default { getListPageCitiesData, toggleFavourite, removeCity }