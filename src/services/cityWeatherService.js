import { getCityWeather } from "./weatherStackApi";
import userNoteService from "./userNoteService";
import topCitiesByPopulation from "./topCitiesByPopulation";

const LIST_PAGE_CITIES_SK = "LIST_PAGE_CITIES_SK";
function getCityList() {
  const listPageCitiesString = localStorage.getItem(LIST_PAGE_CITIES_SK);
  let listPageCities;

  if (!listPageCitiesString) {
    listPageCities = topCitiesByPopulation.slice(0, 1).map((city) => ({
      ...city,
      isFavourite: false,
      id: `${city.name}_${city.region}_${city.country}`.toLocaleUpperCase(),
    }));
    localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(listPageCities));
  } else {
    listPageCities = JSON.parse(listPageCitiesString);
  }
  return listPageCities;
}

async function getCityWeatherDetail(city) {
  const query = `${city.name},${city.region},${city.country}`;
  const { current } = await getCityWeather(query);
  return { ...city, current };
}

async function getListPageCitiesData() {
  const listPageCities = getCityList();
  return await Promise.all(
    listPageCities.map((city) => getCityWeatherDetail(city))
  );
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
  const listPageCities = getCityList();
  const cityToAdd = { ...newCity };
  if (!cityToAdd.id || cityToAdd.id === "undefined") {
    cityToAdd.id = `${newCity.name}_${newCity.region}_${newCity.country}`.toLocaleUpperCase();
  }
  const existing = listPageCities.find((city) => city.id === cityToAdd.id);
  if (!existing) {
    const updatedCityData = [...listPageCities, cityToAdd];
    localStorage.setItem(LIST_PAGE_CITIES_SK, JSON.stringify(updatedCityData));
  }
}

export default {
  getCityWeatherDetail,
  getListPageCitiesData,
  toggleFavourite,
  addCity,
  removeCity,
};
