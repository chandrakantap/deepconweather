import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserNotesAction,
  clearStateAction,
} from "domains/userNotes/store/userNotesActions";
import { cityWeatherDetailsSelector } from "domains/weatherdetail/store/cityWeatherDetailPageSelectors";
import AddUserNote from "./AddUserNote";
import UserNoteList from "./UserNoteList";

function UserNotes() {
  const city = useSelector(cityWeatherDetailsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserNotesAction(city.id));
    return () => {
      dispatch(clearStateAction());
    };
  }, [dispatch, city]);

  return (
    <div>
      <AddUserNote city={city} />
      <UserNoteList />
    </div>
  );
}

export default UserNotes;
