import React from "react";
import {
  fireEvent,
  waitForDomChange,
  screen,
  cleanup,
} from "@testing-library/react";
import { render } from "common/test-utils";
import CityWeatherListPage from "./CityWeatherListPage";
import * as weatherStackApi from "services/weatherStackApi";

describe("CityWeatherListPage", () => {
  let getCityWeatherSpy;
  beforeAll(() => {
    getCityWeatherSpy = jest
      .spyOn(weatherStackApi, "getCityWeather")
      .mockImplementation((cityName) => {
        const cityData = cityName.split("_");
        return Promise.resolve({
          name: cityData[0],
          region: cityData[1],
          country: cityData[2],
          current: {
            observation_time: "02:21 PM",
            temperature: 32,
            weather_code: 113,
            weather_icons: [
              "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
            ],
            weather_descriptions: ["Sunny"],
            wind_speed: 17,
            wind_degree: 250,
            wind_dir: "WSW",
            pressure: 1006,
            precip: 0,
            humidity: 75,
            cloudcover: 0,
            feelslike: 31,
            uv_index: 8,
            visibility: 6,
            is_day: "yes",
          },
        });
      });
  });
  afterEach(() => {
    cleanup();
  });
  afterAll(() => {
    getCityWeatherSpy.restore();
  });

  test("should display 15 cities by default", async () => {
    const { container } = render(<CityWeatherListPage />);
    await waitForDomChange();
    expect(
      container.querySelectorAll("main.cityList section.root").length
    ).toBe(15);
  });

  test("should display cities from localStorage if present default", async () => {
    window.localStorage.setItem(
      "LIST_PAGE_CITIES_SK",
      '[\
        {"name":"Tokyo","country":"Japan","region":"Tokyo","isFavourite":true,"id":"TOKYO_TOKYO_JAPAN","current":{}},\
        {"id":"KAGLIPUR_KARNATAKA_INDIA","name":"Kaglipur","region":"Karnataka","country":"India","current":{}}\
       ]'
    );
    const { container } = render(<CityWeatherListPage />);
    await waitForDomChange();
    expect(
      container.querySelectorAll("main.cityList section.root").length
    ).toBe(2);
  });

  test("should delete cities on click delete icon", async () => {
    window.localStorage.setItem(
      "LIST_PAGE_CITIES_SK",
      '[\
        {"name":"Tokyo","country":"Japan","region":"Tokyo","isFavourite":true,"id":"TOKYO_TOKYO_JAPAN","current":{}},\
        {"id":"KAGLIPUR_KARNATAKA_INDIA","name":"Kaglipur","region":"Karnataka","country":"India","current":{}}\
       ]'
    );
    const { container } = render(<CityWeatherListPage />);
    await waitForDomChange();
    fireEvent.click(screen.queryByTestId("TOKYO_TOKYO_JAPAN_deleteBtn"));
    expect(
      container.querySelectorAll("main.cityList section.root").length
    ).toBe(1);
  });

  test("should set favourite on click favourite icon", async () => {
    window.localStorage.setItem(
      "LIST_PAGE_CITIES_SK",
      '[\
          {"name":"Tokyo","country":"Japan","region":"Tokyo","isFavourite":true,"id":"TOKYO_TOKYO_JAPAN","current":{}}\
      ]'
    );
    const { container } = render(<CityWeatherListPage />);
    await waitForDomChange();
    fireEvent.click(screen.queryByTestId("TOKYO_TOKYO_JAPAN_favBtn"));
    expect(container).toMatchSnapshot();
  });
  test("should add new city to list", async () => {
    window.localStorage.setItem(
      "LIST_PAGE_CITIES_SK",
      '[\
          {"name":"Tokyo","country":"Japan","region":"Tokyo","isFavourite":true,"id":"TOKYO_TOKYO_JAPAN","current":{}}\
      ]'
    );
    jest.spyOn(weatherStackApi, "locationLookup").mockResolvedValueOnce([
      {
        name: "York",
        region: "Lancashire",
        country: "United Kingdom",
        id: "YORK_LANCASHIRE_UNITED KINGDOM",
      },
    ]);
    const { container } = render(<CityWeatherListPage />);
    await waitForDomChange();
    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();

    expect(screen.queryByText("York, Lancashire, United Kingdom")).toBeTruthy();
    fireEvent.click(screen.queryByText("York, Lancashire, United Kingdom"));

    await waitForDomChange();
    expect(
      container.querySelectorAll("main.cityList section.root").length
    ).toBe(2);
  });
});
