import { sliceName } from './cityWeatherDetailPageReducer';


export const cityWeatherDetailsSelector = (state) => state[sliceName].data;
export const isDetailsLoadedSelector = (state) => state[sliceName].isLoaded;