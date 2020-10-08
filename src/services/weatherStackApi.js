const apiBaseURL = "https://api.weatherstack.com";
const accessKey = process.env.REACT_APP_WS_API_KEY;

export async function getCityWeather(query) {
  const response = await fetch(
    `${apiBaseURL}/current?access_key=${accessKey}&query=${query}`
  );
  const {
    current,
    location: { name, region, country },
  } = await response.json();
  const id = `${name}_${region}_${country}`
    .toLocaleUpperCase()
    .replace(/[ ]*/g, "");
  return { id, name, region, country, current };
}

export async function locationLookup(query) {
  const response = await fetch(
    `${apiBaseURL}/autocomplete?access_key=${accessKey}&query=${query}`
  );
  const { results = [] } = await response.json();
  const uniqueResults = [];
  const uniqueIds = {};

  results.forEach(({ name, region, country }) => {
    const city = {
      name,
      region,
      country,
      id: `${name}_${region}_${country}`
        .toLocaleUpperCase()
        .replace(/[ ]*/g, ""),
    };
    if (!uniqueIds[city.id]) {
      uniqueResults.push(city);
      uniqueIds[city.id] = true;
    }
  });
  return uniqueResults;
}
