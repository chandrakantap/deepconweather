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
      let listPageCitiesData;
      if (isDataLoaded) {
        listPageCitiesData = [...cityListSelector(state)];
      } else {
        dispatch(setCityLoaded(false));
        listPageCitiesData = await cityWeatherService.getListPageCitiesData();
      }
      dispatch(
        setCityListDataAction(listPageCitiesData.sort(cityDataSortFunction))
      );
    } catch (e) {
      console.error(e);
      dispatch(setCityListLoadErrorAction("Unable to load listPageCitiesData"));
    }
  };
}
export function addCityToListAction({ name, country }) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const cityList = cityListSelector(state);
      const city = cityList.find(
        (city) => city.name === name && city.country === country
      );
      if (city) {
        dispatch({ type: ACTION_TYPES.ADD_CITY, data: { city } });
      } else {
        const cityNameCountry = `${name},${country}`;
        cityWeatherService.addCity({ name, country });
        const result = await cityWeatherService.getCityDetail({
          name: cityNameCountry,
          isFavourite: false,
        });
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

export function toggleFavouriteAction({ name, country }) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const listPageCitiesData = cityListSelector(state);
      const updatedCityData = listPageCitiesData.map((cityData) => {
        return cityData.name === name && cityData.country === country
          ? { ...cityData, isFavourite: !cityData.isFavourite }
          : cityData;
      });
      dispatch(setCityListDataAction(updatedCityData));
      cityWeatherService.toggleFavourite({ name, country });
    } catch (e) {
      console.error(e);
    }
  };
}

export function removeCityAction({ name, country }) {
  return async (dispatch, getState) => {
    try {
      cityWeatherService.removeCity({ name, country });
      const state = getState();
      const listPageCitiesData = cityListSelector(state);
      const updatedCityData = listPageCitiesData.filter(
        (cityData) => !(cityData.name === name && cityData.country === country)
      );
      dispatch(setCityListDataAction(updatedCityData));
    } catch (e) {
      console.error(e);
    }
  };
}
