import { getCityWeather } from "./weatherStackApi";
import userNoteService from "./userNoteService";
import topCitiesByPopulation from "./topCitiesByPopulation";

export const LIST_PAGE_CITIES_SK = "SK_LIST_PAGE_CITIES";

function getCityList() {
  const listPageCitiesString = localStorage.getItem(LIST_PAGE_CITIES_SK);
  let listPageCities;

  if (!listPageCitiesString) {
    listPageCities = topCitiesByPopulation.slice(0, 15).map((city) => ({
      ...city,
      isFavourite: false,
      current: { weather_descriptions: ["-"] },
      id: `${city.name}_${city.region}_${city.country}`
        .toLocaleUpperCase()
        .replace(/[ ]*/g, ""),
    }));
    localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(listPageCities));
  } else {
    listPageCities = JSON.parse(listPageCitiesString);
  }
  return listPageCities;
}

async function refreshCityListWeather() {
  const cities = getCityList();
  const refreshedCityList = await Promise.all(
    cities.map((city) => getCityWeatherDetail(city))
  );
  localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(refreshedCityList));
  return refreshedCityList;
}

async function getCityWeatherDetail(city) {
  const query = `${city.name},${city.region},${city.country}`;
  const { current } = await getCityWeather(query);
  return { ...city, current };
}

function toggleFavourite(cityId) {
  const listPageCities = getCityList();
  const updatedCityData = listPageCities.map((city) => {
    return city.id === cityId
      ? { ...city, isFavourite: !city.isFavourite }
      : city;
  });
  localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(updatedCityData));
}

function removeCity(cityId) {
  const listPageCities = getCityList();
  const updatedCityData = listPageCities.filter((city) => city.id !== cityId);
  localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(updatedCityData));
  userNoteService.removeUserNoteForCity(cityId);
}

function addCity(newCity) {
  const currentCities = getCityList().filter((city) => city.id !== newCity.id);
  localStorage.setItem(
    LIST_PAGE_CITIES_SK,
    JSON.stringify([...currentCities, newCity])
  );
}

export default {
  getCityList,
  refreshCityListWeather,
  getCityWeatherDetail,
  toggleFavourite,
  addCity,
  removeCity,
};
