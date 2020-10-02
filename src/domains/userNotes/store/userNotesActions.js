import { ACTION_TYPES } from './userNotesReducer';
import userNoteService from 'services/userNoteService';


export function loadUserNotesAction({ name, country }) {
    return async (dispatch) => {
        try {

        } catch (e) {
            console.error(e);
            dispatch(setUserNoteLoadErrorAction("Unable to load user note"));
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

export function setUserNoteLoadErrorAction(error) {
    return {
        type: ACTION_TYPES.SET_ERROR,
        data: { error }
    }
}