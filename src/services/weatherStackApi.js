const apiBaseURL = "https://api.weatherstack.com";
const accessKey = process.env.REACT_APP_WS_API_KEY;

export async function getCityWeather(query) {
  const response = await fetch(
    `${apiBaseURL}/current?access_key=${accessKey}&query=${query}`
  );
  const { current } = await response.json();
  return { current };
}

export async function locationLookup(query) {
  const response = await fetch(
    `${apiBaseURL}/autocomplete?access_key=${accessKey}&query=${query}`
  );
  const { results = [] } = await response.json();
  return results.map(({ name, region, country }) => ({
    name,
    region,
    country,
    id: `${name}_${region}_${country}`.toLocaleUpperCase(),
  }));
}
