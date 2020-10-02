import { combineReducers } from 'redux';
import CityWeatherListPageReducer,
{ sliceName as cityWeatherListSliceName } from 'domains/cityweatherlist/store/CityWeatherListPageReducer';

export default combineReducers({
    [cityWeatherListSliceName]: CityWeatherListPageReducer
})