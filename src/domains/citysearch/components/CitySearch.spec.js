import React from "react";
import {
  fireEvent,
  waitForDomChange,
  screen,
  cleanup,
} from "@testing-library/react";
import { render } from "common/test-utils";
import CitySearch from "./CitySearch";
import * as weatherStackApi from "services/weatherStackApi";

describe("CitySearch", () => {
  let locationLookupMock;
  beforeAll(() => {
    locationLookupMock = jest
      .spyOn(weatherStackApi, "locationLookup")
      .mockResolvedValue([
        {
          name: "York",
          region: "Lancashire",
          country: "United Kingdom",
          id: "YORK_LANCASHIRE_UNITED KINGDOM",
        },
        {
          name: "Dhaka",
          country: "Bangladesh",
          id: "DHAKA__BANGLADESH",
        },
      ]);
  });
  afterAll(() => {
    locationLookupMock.mockRestore();
  });
  afterEach(() => {
    locationLookupMock.mockClear();
    cleanup();
  });
  test("should renders properly", async () => {
    render(<CitySearch />);
    expect(screen.getByPlaceholderText("Search for cities...")).toBeTruthy();
  });

  test("should renders properly when no search result", async () => {
    jest.spyOn(weatherStackApi, "locationLookup").mockResolvedValueOnce([]);

    render(<CitySearch />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();

    expect(screen.queryByText("No results found")).toBeTruthy();
  });

  test("should renders properly when city found against query", async () => {
    render(<CitySearch />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();

    expect(screen.queryByText("York, Lancashire, United Kingdom")).toBeTruthy();
  });

  test("should renders properly when city don't have region", async () => {
    render(<CitySearch />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "dhaka" } });
    await waitForDomChange();

    expect(screen.queryByText("Dhaka, Bangladesh")).toBeTruthy();
  });

  test("should not call api when searchQuery is blank", async () => {
    render(<CitySearch />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();
    fireEvent.change(searchInput, { target: { value: "" } });
    await waitForDomChange();
    expect(locationLookupMock).toHaveBeenCalledTimes(1);
  });

  test("should clear search on click clear", async () => {
    render(<CitySearch />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();
    expect(screen.queryByText("York, Lancashire, United Kingdom")).toBeTruthy();

    fireEvent.click(screen.getByTestId("searchInputCloseSearchIcon"));
    expect(screen.queryByText("York, Lancashire, United Kingdom")).toBeFalsy();
  });

  test("should not do anything when click on NO_RES item", async () => {
    const onSelectMock = jest.fn();
    jest.spyOn(weatherStackApi, "locationLookup").mockResolvedValueOnce([]);

    render(<CitySearch onSelect={onSelectMock} />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();

    expect(screen.queryByText("No results found")).toBeTruthy();
    fireEvent.click(screen.getByText("No results found"));

    expect(onSelectMock).not.toHaveBeenCalled();
  });

  test("should show proper message when user is offline", async () => {
    jest.spyOn(navigator, "onLine", "get").mockReturnValueOnce(false);
    const onSelectMock = jest.fn();
    render(<CitySearch onSelect={onSelectMock} />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();

    expect(
      screen.queryByText(
        "Seems you are offline. Please connect to internet and try again"
      )
    ).toBeTruthy();
    fireEvent.click(
      screen.getByText(
        "Seems you are offline. Please connect to internet and try again"
      )
    );

    expect(onSelectMock).not.toHaveBeenCalled();
  });

  test("should call onSelect when user selects a city", async () => {
    const onSelectMock = jest.fn();

    render(<CitySearch onSelectCity={onSelectMock} />);

    const searchInput = screen.getByPlaceholderText("Search for cities...");
    fireEvent.change(searchInput, { target: { value: "york" } });
    await waitForDomChange();

    expect(screen.queryByText("York, Lancashire, United Kingdom")).toBeTruthy();
    fireEvent.click(screen.queryByText("York, Lancashire, United Kingdom"));

    expect(onSelectMock).toHaveBeenCalled();
  });
});
