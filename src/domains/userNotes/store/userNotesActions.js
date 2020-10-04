import { ACTION_TYPES } from "./userNotesReducer";
import userNoteService from "services/userNoteService";

export function loadUserNotesAction({ name, country }) {
  return async (dispatch) => {
    try {
      const userNotes = userNoteService.getUserNotes({ name, country });
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

export function addUserNoteAction({ name, country, note }) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ADD_NOTE,
      data: { note },
    });
    userNoteService.addUserNote({ name, country, note });
  };
}
export function editUserNoteAction({ name, country, note }) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.EDIT_NOTE,
      data: { note },
    });
    userNoteService.editUserNote({ name, country, note });
  };
}
export function removeUserNoteAction({ name, country, uniqueKey }) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_NOTE,
      data: { uniqueKey },
    });
    userNoteService.removeUserNote({ name, country, uniqueKey });
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
