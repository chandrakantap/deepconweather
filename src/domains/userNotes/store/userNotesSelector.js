import { sliceName } from './userNotesReducer';


export const userNotesSelector = (state) => state[sliceName].data;
export const isLoadedSelector = (state) => state[sliceName].isLoaded;