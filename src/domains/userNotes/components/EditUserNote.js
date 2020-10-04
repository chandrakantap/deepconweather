import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editUserNoteAction,
  removeUserNoteAction,
} from "domains/userNotes/store/userNotesActions";
import NoteEditor from "./NoteEditor";

function EditUserNote(props) {
  const { city, note, onEditDone } = props;
  const [updatednote, setNote] = useState(props.note.text || "");
  const dispatch = useDispatch();

  const onChangeNote = (e) => {
    setNote(e.target.value);
  };

  const editUserNote = () => {
    if (updatednote.trim().length > 0) {
      const now = new Date();
      const noteObject = {
        ...note,
        text: updatednote,
        lastUpdatedOn: now.toLocaleString(),
      };
      dispatch(editUserNoteAction(city.id, noteObject));
      setNote("");
    } else {
      dispatch(removeUserNoteAction(city.id, note.uniqueKey));
    }
    onEditDone();
  };

  return (
    <NoteEditor
      placeholder="update note ..."
      onChangeNote={onChangeNote}
      note={updatednote}
      buttonLbl="Update"
      onClickButton={editUserNote}
    />
  );
}

export default EditUserNote;
