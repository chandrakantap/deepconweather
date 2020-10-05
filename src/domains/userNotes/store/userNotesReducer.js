export const sliceName = "userNotes";

const initialState = {
  isLoaded: false,
  isError: false,
  data: [],
  error: "",
};

export const ACTION_TYPES = {
  SET_IS_LOADED: "USER_NOTES_SET_IS_LOADED",
  SET_DATA: "USER_NOTES_SET_DATA",
  SET_ERROR: "USER_NOTES_SET_ERROR",
  CLEAR: "USER_NOTES_CLEAR_STATE",
  ADD_NOTE: "USER_NOTES_ADD",
  EDIT_NOTE: "USER_NOTES_EDIT",
  REMOVE_NOTE: "USER_NOTES_REMOVE",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_DATA: {
      return {
        ...state,
        isLoaded: true,
        data: action.data,
      };
    }
    case ACTION_TYPES.SET_ERROR: {
      return {
        ...state,
        isLoaded: true,
        isError: true,
        error: action.data.error,
      };
    }
    case ACTION_TYPES.ADD_NOTE: {
      return {
        ...state,
        data: [action.data.note, ...state.data],
      };
    }
    case ACTION_TYPES.EDIT_NOTE: {
      const updatedNote = action.data.note;
      return {
        ...state,
        data: state.data.map((note) =>
          note.uniqueKey === updatedNote.uniqueKey ? updatedNote : note
        ),
      };
    }
    case ACTION_TYPES.REMOVE_NOTE: {
      const { uniqueKey } = action.data;
      return {
        ...state,
        data: state.data.filter((note) => note.uniqueKey !== uniqueKey),
      };
    }
    case ACTION_TYPES.CLEAR: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
}
