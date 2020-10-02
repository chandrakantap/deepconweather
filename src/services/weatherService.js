const apiBaseURL = 'http://api.weatherstack.com';
const accessKey = process.env.REACT_APP_WS_API_KEY;

async function getCityWeather(cityName) {
    const response = await fetch(`${apiBaseURL}/current?access_key=${accessKey}&query=${cityName}`);
    const { location: { name, country }, current } = await response.json();
    return {
        name,
        country,
        current
    }
}

export default { getCityWeather }