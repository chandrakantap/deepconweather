import { ACTION_TYPES } from './cityWeatherListPageReducer';
import { cityListSelector } from './cityWeatherListPageSelectors';
import * as weatherService from 'services/weatherService';
import * as userPreferenceService from 'services/userPreferenceService';

export function loadCityListAction() {
    return async (dispatch) => {
        try {
            const listPageCitiesData = await weatherService.getListPageCitiesData();
            dispatch(setCityListDataAction(listPageCitiesData));
        } catch (e) {
            console.error(e);
            dispatch(setCityListLoadErrorAction("Unable to load listPageCitiesData"));
        }
    }
}

export function setCityListDataAction(data) {
    return {
        type: ACTION_TYPES.SET_LIST_DATA,
        data
    }
}

export function setCityListLoadErrorAction(error) {
    return {
        type: ACTION_TYPES.SET_ERROR,
        data: { error }
    }
}

export function toggleFavouriteAction({ name, country }) {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const listPageCitiesData = cityListSelector(state);
            const updatedCityData = listPageCitiesData.map(cityData => {
                return cityData.name === name && cityData.country === country
                    ? ({ ...cityData, isFavourite: !cityData.isFavourite })
                    : cityData
            });
            dispatch(setCityListDataAction(updatedCityData));
            userPreferenceService.toggleFavourite({ name, country });
        } catch (e) {
            console.error(e);

        }
    }
}

export function removeCityAction({ name, country }) {
    return async (dispatch, getState) => {
        try {
            userPreferenceService.removeCity({ name, country });
            const state = getState();
            const listPageCitiesData = cityListSelector(state);
            const updatedCityData = listPageCitiesData.filter(cityData => !(cityData.name === name
                && cityData.country === country));
            dispatch(setCityListDataAction(updatedCityData));
        } catch (e) {
            console.error(e);
        }
    }
}
