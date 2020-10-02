import { sliceName } from './cityWeatherListPageReducer';


export const cityListSelector = (state) => state[sliceName].data;
export const isCityListLoadedSelector = (state) => state[sliceName].isLoaded;