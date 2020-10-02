import cityWeatherService from './cityWeatherService';

describe('cityWeatherService', () => {
    test('should not add city if existing', () => {
        window.localStorage.setItem(
            'LIST_PAGE_CITIES_SK',
            '[\
                {"name":"Tokyo,Japan","isFavourite":false},\
                {"name":"Delhi,India","isFavourite":true},\
                {"name":"Shanghai,China","isFavourite":false},\
                {"name": "Mexico City,Mexico", "isFavourite": false}\
            ]'
        );
        cityWeatherService.addCity({ name: 'TokYo', country: 'Japan' });

        const updatedItems = JSON.parse(window.localStorage.getItem('LIST_PAGE_CITIES_SK'));
        expect(updatedItems.length).toBe(4);
    })
})