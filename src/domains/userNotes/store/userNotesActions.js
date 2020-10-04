import { ACTION_TYPES } from "./userNotesReducer";
import userNoteService from "services/userNoteService";

export function loadUserNotesAction(cityId) {
  return async (dispatch) => {
    try {
      const userNotes = userNoteService.getUserNotes(cityId);
      const sortedUserNotes = userNotes.sort((a, b) =>
        a.timestamp > b.timestamp ? -1 : 1
      );
      dispatch(setUserNoteDataAction(sortedUserNotes));
    } catch (e) {
      console.error(e);
      dispatch(setUserNoteLoadErrorAction("Unable to load user note"));
    }
  };
}

export function addUserNoteAction(cityId, note) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ADD_NOTE,
      data: { note },
    });
    userNoteService.addUserNote({ cityId, note });
  };
}
export function editUserNoteAction(cityId, note) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.EDIT_NOTE,
      data: { note },
    });
    userNoteService.editUserNote({ cityId, note });
  };
}
export function removeUserNoteAction(cityId, uniqueKey) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_NOTE,
      data: { uniqueKey },
    });
    userNoteService.removeUserNote({ cityId, uniqueKey });
  };
}
export function clearStateAction() {
  return {
    type: ACTION_TYPES.CLEAR,
  };
}
export function setUserNoteDataAction(data) {
  return {
    type: ACTION_TYPES.SET_DATA,
    data,
  };
}

export function setUserNoteLoadErrorAction(error) {
  return {
    type: ACTION_TYPES.SET_ERROR,
    data: { error },
  };
}
