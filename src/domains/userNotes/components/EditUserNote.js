import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editUserNoteAction,
  removeUserNoteAction,
} from "domains/userNotes/store/userNotesActions";
import NoteEditor from "./NoteEditor";

function EditUserNote(props) {
  const { name, country, note, onEditDone } = props;
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
      dispatch(
        editUserNoteAction({
          note: noteObject,
          name,
          country,
        })
      );
      setNote("");
    } else {
      dispatch(
        removeUserNoteAction({ name, country, uniqueKey: note.uniqueKey })
      );
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
