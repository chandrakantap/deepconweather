import { combineReducers } from 'redux';
import cityWeatherListPageReducer, {
    sliceName as cityListSliceName
} from 'domains/cityweatherlist/store/cityWeatherListPageReducer';
import cityWeatherDetailPageReducer, {
    sliceName as cityWeatherDetailSliceName
} from 'domains/weatherdetail/store/cityWeatherDetailPageReducer';


export default combineReducers({
    [cityListSliceName]: cityWeatherListPageReducer,
    [cityWeatherDetailSliceName]: cityWeatherDetailPageReducer
})