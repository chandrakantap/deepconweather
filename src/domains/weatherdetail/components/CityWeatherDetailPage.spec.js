import React from "react";
import {
  fireEvent,
  waitForDomChange,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import { render } from "common/test-utils";
import cityWeatherService from "services/cityWeatherService";
import CityWeatherDetailPage from "./CityWeatherDetailPage";

const cityData = {
  name: "Lobong",
  region: "Pangasinan",
  country: "Philippines",
  id: "LOBONG_PANGASINAN_PHILIPPINES",
  isFavourite: true,
  current: {
    temperature: 24,
    weather_descriptions: ["Moderate or heavy rain shower"],
    wind_dir: "E",
    pressure: 1006,
    precip: 0.9,
    humidity: 89,
    cloudcover: 37,
    feelslike: 26,
    uv_index: 1,
    visibility: 9,
    is_day: "no",
  },
};

describe("CityWeatherDetailPage", () => {
  test("should renders properly when loading", async () => {
    const location = {
      search:
        "?cityId=LOBONG_PANGASINAN_PHILIPPINES&cityName=Lobong&region=Pangasinan&country=Philippines",
    };
    const { container } = render(<CityWeatherDetailPage location={location} />);
    expect(container).toMatchSnapshot();
  });
  test("should renders properly after data loaded", async () => {
    const location = {
      search:
        "?cityId=LOBONG_PANGASINAN_PHILIPPINES&cityName=Lobong&region=Pangasinan&country=Philippines",
    };
    jest
      .spyOn(cityWeatherService, "getCityWeatherDetail")
      .mockResolvedValueOnce(cityData);
    render(<CityWeatherDetailPage location={location} />);
    await waitForDomChange();
    expect(screen.getByText("Pangasinan, Philippines")).toBeTruthy();
  });
  test("should toggle city as favourite", async () => {
    const location = {
      search:
        "?cityId=LOBONG_PANGASINAN_PHILIPPINES&cityName=Lobong&region=Pangasinan&country=Philippines",
    };
    jest
      .spyOn(cityWeatherService, "getCityWeatherDetail")
      .mockResolvedValueOnce(cityData);
    const { container } = render(<CityWeatherDetailPage location={location} />);
    await waitForDomChange();
    fireEvent.click(screen.getByTestId("DetailPage_favBtn"));
    expect(container).toMatchSnapshot();
  });
});
