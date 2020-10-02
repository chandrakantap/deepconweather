import topCitiesByPopulation from './topCitiesByPopulation';

const LIST_PAGE_CITIES_SK = 'LIST_PAGE_CITIES_SK';
export function getListPageCities() {
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

export function toggleFavourite({ name, country }) {
    const listPageCities = getListPageCities();
    const cityNameCountry = `${name},${country}`;
    const updatedCityData = listPageCities.map(cityData => {
        return cityData.name === cityNameCountry
            ? ({ ...cityData, isFavourite: !cityData.isFavourite })
            : cityData
    });
    localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(updatedCityData));
}

export function removeCity({ name, country }) {
    const listPageCities = getListPageCities();
    const cityNameCountry = `${name},${country}`;
    const updatedCityData = listPageCities.filter(cityData => cityData.name !== cityNameCountry);
    localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(updatedCityData));
}