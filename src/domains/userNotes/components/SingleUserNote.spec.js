import React from "react";
import {
  fireEvent,
  waitForDomChange,
  screen,
  cleanup,
} from "@testing-library/react";
import { render } from "common/test-utils";
import * as userNotesActions from "domains/userNotes/store/userNotesActions";
import SingleUserNote from "./SingleUserNote";

describe("SingleUserNote", () => {
  const city = {
    name: "Tokyo",
    country: "Japan",
    region: "Tokyo",
    isFavourite: true,
    id: "TOKYO_TOKYO_JAPAN",
    current: {},
  };
  const note = {
    text: "New user note",
    uniqueKey: 1601849276347,
    lastUpdatedOn: "05/10/2020, 03:37:56",
  };

  test("should renders properly", async () => {
    render(<SingleUserNote city={city} note={note} />);
    expect(screen.queryByTestId("1601849276347_delete")).toBeTruthy();
  });
  test("should delete note", async () => {
    const removeActionMock = jest
      .spyOn(userNotesActions, "removeUserNoteAction")
      .mockReturnValueOnce({ type: "delete" });
    render(<SingleUserNote city={city} note={note} />);
    fireEvent.click(screen.getByTestId("1601849276347_delete"));
    expect(removeActionMock).toHaveBeenCalled();
  });
  test("should edit note", async () => {
    render(<SingleUserNote city={city} note={note} />);
    fireEvent.click(screen.getByTestId("1601849276347_edit"));
    expect(screen.queryByText("Update")).toBeTruthy();
  });
  test("should display note after edit done", async () => {
    render(<SingleUserNote city={city} note={note} />);
    fireEvent.click(screen.getByTestId("1601849276347_edit"));
    fireEvent.click(screen.getByText("Update"));
    expect(screen.queryByTestId("1601849276347_delete")).toBeTruthy();
  });
});
