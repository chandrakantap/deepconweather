import React from "react";
import { waitForDomChange, screen } from "@testing-library/react";
import { render } from "common/test-utils";
import GeoLocationAwareRedirector from "./GeoLocationAwareRedirector";
import * as weatherStackApi from "services/weatherStackApi";

describe("GeoLocationAwareRedirector", () => {
  test("should renders properly", async () => {
    global.navigator.permissions.query.mockResolvedValueOnce({
      state: "",
      addEventListener: jest.fn(),
    });
    render(<GeoLocationAwareRedirector />);
    expect(screen.queryByText("Searching for current location..")).toBeTruthy();
  });
  test("should display list page of browser do not support geolocation", async () => {
    const navigatorGeo = global.navigator.geolocation;
    global.navigator.geolocation = false;
    const historyMock = {
      replace: jest.fn(),
    };
    render(<GeoLocationAwareRedirector history={historyMock} />);
    expect(historyMock.replace).toHaveBeenCalledWith("/list");
    global.navigator.geolocation = navigatorGeo;
  });
  test("should prompt for permission", async () => {
    global.navigator.permissions.query.mockResolvedValueOnce({
      state: "prompt",
      addEventListener: jest.fn(),
    });
    render(<GeoLocationAwareRedirector />);
    await waitForDomChange();
    expect(
      screen.queryByText(
        "Please allow location permission to view weather details in your city."
      )
    ).toBeTruthy();
  });
  test("should go to detail page if permission allowed", async () => {
    const historyMock = {
      replace: jest.fn(),
    };
    const dispatchMock = (fn) => (typeof fn === "function" ? fn() : null);
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
    });
    render(
      <GeoLocationAwareRedirector
        history={historyMock}
        dispatch={dispatchMock}
      />
    );
    await waitForDomChange();
    expect(historyMock.replace).toHaveBeenCalledWith(
      "/detail?cityId=TOKYO_TOKYO_JAPAN&cityName=Tokyo&region=Tokyo&country=Japan"
    );
  });
});
