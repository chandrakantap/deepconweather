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
});
