import { ACTION_TYPES } from "./cityWeatherListPageReducer";
import {
  cityListSelector,
  isCityListLoadedSelector,
} from "./cityWeatherListPageSelectors";
import cityWeatherService from "services/cityWeatherService";

const cityDataSortFunction = (a, b) => {
  if (a.isFavourite !== b.isFavourite) {
    return a.isFavourite ? -1 : 1;
  } else {
    return a.name.localeCompare(b.name);
  }
};

export function loadCityListAction() {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const isDataLoaded = isCityListLoadedSelector(state);

      if (isDataLoaded) {
        const listPageCitiesData = [...cityListSelector(state)];
        dispatch(
          setCityListDataAction(listPageCitiesData.sort(cityDataSortFunction))
        );
      } else {
        const cityList = cityWeatherService.getCityList();
        dispatch(setCityListDataAction(cityList.sort(cityDataSortFunction)));
        const cityListWithWeather = await cityWeatherService.getListPageCitiesData();
        dispatch(
          setCityListDataAction(cityListWithWeather.sort(cityDataSortFunction))
        );
      }
    } catch (e) {
      console.error(e);
      dispatch(setCityListLoadErrorAction("Unable to load listPageCitiesData"));
    }
  };
}
export function addCityToListAction(newCity) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const cityList = cityListSelector(state);
      const existingCity = cityList.find((city) => city.id === newCity.id);
      if (existingCity) {
        dispatch({ type: ACTION_TYPES.ADD_CITY, data: { existingCity } });
      } else {
        cityWeatherService.addCity(newCity);
        const result = await cityWeatherService.getCityWeatherDetail(newCity);
        dispatch({ type: ACTION_TYPES.ADD_CITY, data: { city: result } });
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export function setCityListDataAction(data) {
  return {
    type: ACTION_TYPES.SET_LIST_DATA,
    data,
  };
}
export function setCityLoaded(isLoaded) {
  return {
    type: ACTION_TYPES.SET_IS_LOADED,
    data: { isLoaded },
  };
}

export function setCityListLoadErrorAction(error) {
  return {
    type: ACTION_TYPES.SET_ERROR,
    data: { error },
  };
}

export function toggleFavouriteAction(cityId) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const listPageCitiesData = cityListSelector(state);
      const updatedCityData = listPageCitiesData.map((city) => {
        return city.id === cityId
          ? { ...city, isFavourite: !city.isFavourite }
          : city;
      });
      dispatch(setCityListDataAction(updatedCityData));
      cityWeatherService.toggleFavourite(cityId);
    } catch (e) {
      console.error(e);
    }
  };
}

export function removeCityAction(cityId) {
  return async (dispatch, getState) => {
    try {
      cityWeatherService.removeCity(cityId);
      const state = getState();
      const listPageCitiesData = cityListSelector(state);
      const updatedCityData = listPageCitiesData.filter(
        (city) => city.id !== cityId
      );
      dispatch(setCityListDataAction(updatedCityData));
    } catch (e) {
      console.error(e);
    }
  };
}
