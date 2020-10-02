import React from 'react';
import {
    fireEvent,
    waitForDomChange,
    screen, cleanup
} from '@testing-library/react';
import { render } from 'common/test-utils';
import CityWeatherListPage from './CityWeatherListPage';
import App from 'App';
import weatherService from 'services/weatherService';

describe('CityWeatherListPage', () => {
    let getCityWeatherSpy;
    beforeAll(() => {
        getCityWeatherSpy = jest.spyOn(weatherService, 'getCityWeather').mockImplementation((cityName) => {
            const cityData = cityName.split(',');
            return Promise.resolve({
                "name": cityData[0],
                "country": cityData[1],
                "current": {
                    "observation_time": "02:21 PM",
                    "temperature": 32,
                    "weather_code": 113,
                    "weather_icons": [
                        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
                    ],
                    "weather_descriptions": [
                        "Sunny"
                    ],
                    "wind_speed": 17,
                    "wind_degree": 250,
                    "wind_dir": "WSW",
                    "pressure": 1006,
                    "precip": 0,
                    "humidity": 75,
                    "cloudcover": 0,
                    "feelslike": 31,
                    "uv_index": 8,
                    "visibility": 6,
                    "is_day": "yes"
                }
            });
        })
    });
    afterEach(() => {
        cleanup();
    });
    afterAll(() => {
        getCityWeatherSpy.restore();
    })

    test('should display 15 cities by default', async () => {
        const { container } = render(<CityWeatherListPage />);
        await waitForDomChange();
        expect(container.querySelectorAll('main.cityList section.root').length).toBe(15);
    });

    test('should display cities from localStorage if present default', async () => {
        window.localStorage.setItem(
            'LIST_PAGE_CITIES_SK',
            '[\
                {"name":"Tokyo,Japan","isFavourite":false},\
                {"name":"Delhi,India","isFavourite":true}\
            ]'
        );
        const { container } = render(<CityWeatherListPage />);
        await waitForDomChange();
        expect(container.querySelectorAll('main.cityList section.root').length).toBe(2);
    });

    test('should delete cities on click delete icon', async () => {
        window.localStorage.setItem(
            'LIST_PAGE_CITIES_SK',
            '[\
                {"name":"Tokyo,Japan","isFavourite":false},\
                {"name":"Delhi,India","isFavourite":true},\
                {"name":"Shanghai,China","isFavourite":false},\
                {"name": "Mexico City,Mexico", "isFavourite": false}\
            ]'
        );
        const { container } = render(<CityWeatherListPage />);
        await waitForDomChange();
        fireEvent.click(screen.queryByTestId('Tokyo_Japan_deleteBtn'));
        expect(container.querySelectorAll('main.cityList section.root').length).toBe(3);
    });

    test('should set favourite on click favourite icon', async () => {
        window.localStorage.setItem(
            'LIST_PAGE_CITIES_SK',
            '[\
                {"name":"Tokyo,Japan","isFavourite":false}\
            ]'
        );
        const { container } = render(<CityWeatherListPage />);
        await waitForDomChange();
        fireEvent.click(screen.queryByTestId('Tokyo_Japan_favBtn'));
        expect(container).toMatchSnapshot();
    });
})