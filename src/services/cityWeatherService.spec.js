import cityWeatherService from "./cityWeatherService";
import * as weatherStackApi from "./weatherStackApi";

describe("cityWeatherService", () => {
  test("should not add city if existing", () => {
    window.localStorage.setItem(
      "LIST_PAGE_CITIES_SK",
      '[\
        {"name":"Tokyo","country":"Japan","region":"Tokyo","isFavourite":true,"id":"TOKYO_TOKYO_JAPAN"},\
        {"id":"KAGLIPUR_KARNATAKA_INDIA","name":"Kaglipur","region":"Karnataka","country":"India"},\
        {"name":"Lobong","region":"Pangasinan","country":"Philippines","id":"LOBONG_PANGASINAN_PHILIPPINES","isFavourite":true}\
      ]'
    );
    cityWeatherService.addCity({
      name: "TokYo",
      region: "Tokyo",
      country: "Japan",
    });

    const updatedItems = JSON.parse(
      window.localStorage.getItem("LIST_PAGE_CITIES_SK")
    );
    expect(updatedItems.length).toBe(3);
  });
  test("shout return weather details of a city", () => {
    const getCityWeatherMock = jest
      .spyOn(weatherStackApi, "getCityWeather")
      .mockResolvedValueOnce({ current: {} });
    expect(
      cityWeatherService.getCityWeatherDetail({
        name: "name",
        region: "region",
        country: "country",
      })
    );
    expect(getCityWeatherMock).toHaveBeenCalled();
  });
});
