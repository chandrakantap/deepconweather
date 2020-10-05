import React from "react";
import {
  fireEvent,
  waitForDomChange,
  screen,
  render,
  cleanup,
} from "@testing-library/react";
import * as weatherStackApi from "services/weatherStackApi";
import App from "./App";

describe("index", () => {
  let getCityWeatherSpy;
  beforeAll(() => {
    window.localStorage.setItem(
      "LIST_PAGE_CITIES_SK",
      '[\
              {"name":"Tokyo","country":"Japan","region":"Tokyo","isFavourite":true,"id":"TOKYO_TOKYO_JAPAN","current":{}},\
              {"id":"KAGLIPUR_KARNATAKA_INDIA","name":"Kaglipur","region":"Karnataka","country":"India","current":{}}\
             ]'
    );
    getCityWeatherSpy = jest
      .spyOn(weatherStackApi, "getCityWeather")
      .mockImplementation((cityName) => {
        const cityData = cityName.split("_");
        return Promise.resolve({
          name: cityData[0],
          region: cityData[1],
          country: cityData[2],
          current: {
            temperature: 32,
            weather_descriptions: ["Cloudy"],
          },
        });
      });
  });
  afterEach(cleanup);
  afterAll(() => {
    getCityWeatherSpy.restore();
    window.localStorage.removeItem("LIST_PAGE_CITIES_SK");
  });
  test("should renders properly", async () => {
    const navigatorGeo = global.navigator.geolocation;
    global.navigator.geolocation = false;
    const { container } = render(<App />);
    await waitForDomChange();
    expect(
      container.querySelectorAll("main.cityList section.root").length
    ).toBe(2);
    global.navigator.geolocation = navigatorGeo;
  });
  test("should load detail if geo location found", async () => {
    global.navigator.permissions.query.mockResolvedValueOnce({
      state: "prompt",
      addEventListener: jest.fn(),
    });
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce(
      (geoSuccess) => {
        geoSuccess({ coords: { latitude: 13.0154496, longitude: 77.6175616 } });
      }
    );
    jest.spyOn(weatherStackApi, "getCityWeather").mockResolvedValueOnce({
      id: "TOKYO_TOKYO_JAPAN",
      name: "Tokyo",
      region: "Tokyo",
      country: "Japan",
      current: { weather_descriptions: ["Sunny"] },
    });
    render(<App />);
    expect(screen.getByText("Tokyo, Japan")).toBeTruthy();
  });
  test("should load detail on click", async () => {
    const navigatorGeo = global.navigator.geolocation;
    global.navigator.geolocation = false;
    render(<App />);
    fireEvent.click(screen.getByText("Tokyo, Japan"));
    expect(screen.getByText("Precipitation")).toBeTruthy();
    expect(screen.getByText("Cloudy")).toBeTruthy();
    expect(screen.getByText("Wind Speed")).toBeTruthy();
    global.navigator.geolocation = navigatorGeo;
  });
});
