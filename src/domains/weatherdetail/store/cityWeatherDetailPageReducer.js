export const sliceName = 'cityDetail';
const initialState = {
    isLoaded: false,
    isError: false,
    data: {},
    error: ''
}

export const ACTION_TYPES = {
    SET_IS_LOADED: 'CITY_DETAIL_SET_IS_LOADED',
    SET_DATA: 'CITY_DETAIL_SET_DATA',
    SET_ERROR: 'CITY_DETAIL_SET_ERROR',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_DATA: {
            return {
                ...state,
                isLoaded: true,
                data: action.data
            }
        }
        case ACTION_TYPES.SET_IS_LOADED: {
            return {
                ...state,
                isLoaded: action.data.isLoaded
            }
        }
        case ACTION_TYPES.SET_ERROR: {
            return {
                ...state,
                isLoaded: true,
                isError: true,
                error: action.data.error
            }
        }
        default: {
            return state;
        }
    }
}