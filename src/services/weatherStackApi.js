const apiBaseURL = "https://api.weatherstack.com";
const accessKey = process.env.REACT_APP_WS_API_KEY;

export async function getCityWeather(cityName) {
  const response = await fetch(
    `${apiBaseURL}/current?access_key=${accessKey}&query=${cityName}`
  );
  const {
    location: { name, country },
    current,
  } = await response.json();
  return {
    name,
    country,
    current,
  };
}

export async function locationLookup(query) {
  const response = await fetch(
    `${apiBaseURL}/autocomplete?access_key=${accessKey}&query=${query}`
  );
  const { results = [] } = await response.json();
  return results.map(({ name, country }) => ({
    name,
    country,
    uniqueKey: `${name}_${country}`,
  }));
}
