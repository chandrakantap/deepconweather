export const sliceName = "cityDetail";
const initialState = {
  isLoaded: false,
  isError: false,
  data: {},
  error: "",
};

export const ACTION_TYPES = {
  SET_IS_LOADED: "CITY_DETAIL_SET_IS_LOADED",
  TOGGLE_FAVOURITE: "CITY_DETAIL_TOGGLE_FAVOURITE",
  SET_DATA: "CITY_DETAIL_SET_DATA",
  SET_ERROR: "CITY_DETAIL_SET_ERROR",
  CLEAR: "CITY_DETAIL_CLEAR_STATE",
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
    case ACTION_TYPES.TOGGLE_FAVOURITE: {
      return {
        ...state,
        data: {
          ...state.data,
          isFavourite: !state.data.isFavourite,
        },
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
