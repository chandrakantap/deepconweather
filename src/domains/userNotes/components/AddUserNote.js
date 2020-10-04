import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserNoteAction } from "domains/userNotes/store/userNotesActions";
import NoteEditor from "./NoteEditor";

function AddUserNote(props) {
  const { cityName, country } = props;
  const [note, setNote] = useState(props.note || "");
  const dispatch = useDispatch();

  const onChangeNote = (e) => {
    setNote(e.target.value);
  };
  const addUserNote = () => {
    if (note.trim().length > 0) {
      const now = new Date();
      const noteObject = {
        text: note,
        uniqueKey: now.getTime(),
        lastUpdatedOn: now.toLocaleString(),
      };
      dispatch(
        addUserNoteAction({
          note: noteObject,
          name: cityName,
          country,
        })
      );
      setNote("");
    }
  };

  return (
    <NoteEditor
      placeholder="add note ..."
      onChangeNote={onChangeNote}
      note={note}
      onClickButton={addUserNote}
    />
  );
}

export default AddUserNote;
