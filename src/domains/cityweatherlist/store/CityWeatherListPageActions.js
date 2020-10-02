import { ACTION_TYPES } from './CityWeatherListPageReducer';

export function loadCityListAction() {

}

export function setCitListLoadingAction(isLoading) {
    return {
        type: ACTION_TYPES.SET_LOADING,
        data: { isLoading }
    }
}

export function setCitListDataAction(data) {
    return {
        type: ACTION_TYPES.SET_LIST_DATA,
        data
    }
}

export function setCitListLoadErrorAction(error) {
    return {
        type: ACTION_TYPES.SET_ERROR,
        data: { error }
    }
}