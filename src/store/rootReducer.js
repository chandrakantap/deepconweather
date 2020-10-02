import { combineReducers } from 'redux';
import cityWeatherListPageReducer, {
    sliceName as cityListSliceName
} from 'domains/cityweatherlist/store/cityWeatherListPageReducer';


export default combineReducers({
    [cityListSliceName]: cityWeatherListPageReducer
})