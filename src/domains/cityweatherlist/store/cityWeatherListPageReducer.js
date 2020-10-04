export const sliceName = "citylist";
const initialState = {
  isLoaded: false,
  isError: false,
  data: [],
  error: "",
};

export const ACTION_TYPES = {
  SET_IS_LOADED: "CITY_LIST_SET_IS_LOADED",
  SET_LIST_DATA: "CITY_LIST_SET_CITY_LIST_DATA",
  SET_ERROR: "CITY_LIST_SET_ERROR",
  ADD_CITY: "CITY_LIST_ADD_CITY",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_LIST_DATA: {
      return {
        ...state,
        isLoaded: true,
        data: action.data,
      };
    }
    case ACTION_TYPES.SET_IS_LOADED: {
      return {
        ...state,
        isLoaded: action.data.isLoaded,
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
    case ACTION_TYPES.ADD_CITY: {
      const { city: newCity } = action.data;
      const currentCities = state.data.filter((city) => city.id !== newCity.id);
      return {
        ...state,
        data: [newCity, ...currentCities],
      };
    }
    default: {
      return state;
    }
  }
}
