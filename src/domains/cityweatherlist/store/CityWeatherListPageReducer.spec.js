import CityWeatherListPageReducer from './CityWeatherListPageReducer';
import * as actions from './CityWeatherListPageActions';

describe('CityWeatherListPageReducer properly returns next state on', () => {
    const initialState = {
        isLoading: undefined,
        isError: false,
        data: [],
        error: ''
    }
    test('default action', () => {
        expect(CityWeatherListPageReducer(initialState, { type: 'DIFF_ACTTION' })).toBe(initialState)
    });

    test('set loading action', () => {
        const nextState = CityWeatherListPageReducer(
            initialState,
            actions.setCitListLoadingAction(true)
        );
        expect(nextState.isLoading).toBe(true);
    });

    test('set data action', () => {
        const cityData = [
            {
                "temperature": 29,
                "weather_code": 116,
                "wind_speed": 0,
                "wind_degree": 43
            }
        ];
        const nextState = CityWeatherListPageReducer(
            initialState,
            actions.setCitListDataAction(cityData)
        );
        expect(nextState.data.length).toBe(1);
        expect(nextState.isLoading).toBe(false);
        expect(nextState.data[0].temperature).toBe(29);
    });

    test('set list load error action', () => {
        const nextState = CityWeatherListPageReducer(
            initialState,
            actions.setCitListLoadErrorAction("Some error occured")
        );
        expect(nextState.isLoading).toBe(false);
        expect(nextState.isError).toBe(true);
    });
})