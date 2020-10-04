import React from "react";
import { useSelector } from "react-redux";
import {
  isLoadedSelector,
  userNotesSelector,
} from "domains/userNotes/store/userNotesSelector";
import { cityWeatherDetailsSelector } from "domains/weatherdetail/store/cityWeatherDetailPageSelectors";
import { createSelector } from "reselect";
import SingleUserNote from "./SingleUserNote";

const selector = createSelector(
  userNotesSelector,
  isLoadedSelector,
  cityWeatherDetailsSelector,
  (userNotes, isLoaded, city) => ({
    userNotes,
    isLoaded,
    city,
  })
);

function UserNoteList() {
  const { isLoaded, city, userNotes = [] } = useSelector(selector);
  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      {userNotes.map((note) => (
        <SingleUserNote
          note={note}
          key={note.uniqueKey}
          name={city.name}
          country={city.country}
        />
      ))}
    </div>
  );
}

export default UserNoteList;
