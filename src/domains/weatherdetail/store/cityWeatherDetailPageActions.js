import { ACTION_TYPES } from './cityWeatherDetailPageReducer';
import {
    cityListSelector
} from 'domains/cityweatherlist/store/cityWeatherListPageSelectors';
import cityWeatherService from 'services/cityWeatherService';

export function loadCityWeatherDetailAction({ name, country }) {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const cityList = cityListSelector(state);
            const cityWeatherDetails = cityList.find(city => city.name === name && city.country === country);
            if (cityWeatherDetails) {
                dispatch(setCityWeatherDetailsAction(cityWeatherDetails));
            } else {
                const cityNameCountry = `${name},${country}`;
                cityWeatherService.addCity({ name, country });
                const data = await cityWeatherService.getCityDetail({ name: cityNameCountry, isFavourite: false });
                dispatch(setCityWeatherDetailsAction(data));
            }
        } catch (e) {
            console.error(e);
            dispatch(setCityWeatherDetailsLoadErrorAction("Unable to load city weather details"));
        }
    }
}

export function clearStateAction() {
    return {
        type: ACTION_TYPES.CLEAR
    }
}
export function setCityWeatherDetailsAction(data) {
    return {
        type: ACTION_TYPES.SET_DATA,
        data
    }
}

export function setCityWeatherDetailsLoadErrorAction(error) {
    return {
        type: ACTION_TYPES.SET_ERROR,
        data: { error }
    }
}