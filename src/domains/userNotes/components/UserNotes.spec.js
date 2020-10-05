import React from "react";
import {
  fireEvent,
  waitForDomChange,
  screen,
  cleanup,
} from "@testing-library/react";
import { render } from "common/test-utils";
import UserNotes from "./UserNotes";

describe("UserNotes", () => {
  const initialState = {
    cityDetail: {
      isLoaded: true,
      isError: false,
      data: {
        id: "JALAHALLI_KARNATAKA_INDIA",
      },
    },
    userNotes: {
      isLoaded: true,
      isError: false,
      data: [],
    },
  };
  beforeEach(() => {
    const notes = [
      {
        text: "ARIA compliant selectors",
        uniqueKey: 1601855890584,
        lastUpdatedOn: "05/10/2020, 05:28:10",
      },
      {
        text: "When in need to wait for the DOM",
        uniqueKey: 1601855244621,
        lastUpdatedOn: "05/10/2020, 05:17:24",
      },
      {
        text: "addUserNoteAction",
        uniqueKey: 1601856051469,
        lastUpdatedOn: "05/10/2020, 05:30:51",
      },
    ];
    global.localStorage.setItem(
      "JALAHALLI_KARNATAKA_INDIA",
      JSON.stringify(notes)
    );
  });
  test("should renders properly", async () => {
    render(<UserNotes />);
    expect(screen.queryByPlaceholderText("add note ...")).toBeTruthy();
  });
  test("should add user note", async () => {
    render(<UserNotes />);
    const noteInput = screen.getByPlaceholderText("add note ...");
    fireEvent.change(noteInput, { target: { value: "new user note" } });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.queryByText("new user note")).toBeTruthy();
  });
  test("should edit user note", async () => {
    render(<UserNotes />, { initialState });
    expect(screen.queryByText("When in need to wait for the DOM")).toBeTruthy();

    fireEvent.click(screen.getByTestId("1601855244621_edit"));
    fireEvent.change(screen.getByPlaceholderText("update note ..."), {
      target: { value: "Updated Note" },
    });
    fireEvent.click(screen.getByText("Update"));
    expect(screen.getByText("Updated Note")).toBeTruthy();
  });
  test("should delete user note", async () => {
    render(<UserNotes />, { initialState });
    expect(screen.queryByText("When in need to wait for the DOM")).toBeTruthy();

    fireEvent.click(screen.getByTestId("1601855244621_delete"));
    expect(screen.queryByText("When in need to wait for the DOM")).toBeFalsy();
  });
});
