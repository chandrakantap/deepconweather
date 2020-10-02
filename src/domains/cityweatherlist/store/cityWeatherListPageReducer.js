export const sliceName = 'citylist';
const initialState = {
    isLoaded: false,
    isError: false,
    data: [],
    error: ''
}

export const ACTION_TYPES = {
    SET_LIST_DATA: 'CITY_LIST_SET_CITY_LIST_DATA',
    SET_ERROR: 'CITY_LIST_SET_ERROR',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_LIST_DATA: {
            return {
                ...state,
                isLoaded: true,
                data: action.data
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