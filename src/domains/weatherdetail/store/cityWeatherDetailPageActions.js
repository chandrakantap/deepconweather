import { ACTION_TYPES } from "./cityWeatherDetailPageReducer";
import { cityListSelector } from "domains/cityweatherlist/store/cityWeatherListPageSelectors";
import cityWeatherService from "services/cityWeatherService";

export function loadCityWeatherDetailAction({
  cityId,
  cityName,
  region,
  country,
}) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const cityList = cityListSelector(state);
      const cityWeatherDetails = cityList.find((city) => city.id === cityId);
      if (cityWeatherDetails) {
        dispatch(setCityWeatherDetailsAction(cityWeatherDetails));
      } else {
        const newCity = {
          id: cityId,
          name: cityName,
          region,
          country,
        };
        cityWeatherService.addCity(newCity);
        const data = await cityWeatherService.getCityWeatherDetail(newCity);
        dispatch(setCityWeatherDetailsAction(data));
      }
    } catch (e) {
      console.error(e);
      dispatch(
        setCityWeatherDetailsLoadErrorAction(
          "Unable to load city weather details"
        )
      );
    }
  };
}

export function clearStateAction() {
  return {
    type: ACTION_TYPES.CLEAR,
  };
}
export function setCityWeatherDetailsAction(data) {
  return {
    type: ACTION_TYPES.SET_DATA,
    data,
  };
}

export function setCityWeatherDetailsLoadErrorAction(error) {
  return {
    type: ACTION_TYPES.SET_ERROR,
    data: { error },
  };
}
