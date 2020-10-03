import { combineReducers } from 'redux';
import cityWeatherListPageReducer, {
    sliceName as cityListSliceName
} from 'domains/cityweatherlist/store/cityWeatherListPageReducer';
import cityWeatherDetailPageReducer, {
    sliceName as cityWeatherDetailSliceName
} from 'domains/weatherdetail/store/cityWeatherDetailPageReducer';
import userNoteReducer, {
    sliceName as userNoteSliceName
} from 'domains/userNotes/store/userNotesReducer';


export default combineReducers({
    [cityListSliceName]: cityWeatherListPageReducer,
    [cityWeatherDetailSliceName]: cityWeatherDetailPageReducer,
    [userNoteSliceName]: userNoteReducer
})