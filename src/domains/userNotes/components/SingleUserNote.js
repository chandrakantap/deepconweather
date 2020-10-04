import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdClear } from "react-icons/md";
import { removeUserNoteAction } from "domains/userNotes/store/userNotesActions";
import IconButton from "common/ui/IconButton";
import EditUserNote from "./EditUserNote";
import styles from "./SingleUserNote.module.css";

function SingleUserNote({ name, country, note }) {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("view");
  const deleteNote = () => {
    dispatch(
      removeUserNoteAction({ name, country, uniqueKey: note.uniqueKey })
    );
  };
  const switchToEditMode = () => {
    setMode("edit");
  };
  const switchToViewMode = () => {
    setMode("view");
  };

  if (mode === "edit") {
    return (
      <div className={styles.root}>
        <EditUserNote
          note={note}
          name={name}
          country={country}
          onEditDone={switchToViewMode}
        />
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <div className={styles.noteBody}>
        <p className={styles.noteText}>{note.text}</p>
        <p className={styles.noteDate}>{note.lastUpdatedOn}</p>
      </div>
      <div className={styles.actionControls}>
        <IconButton onClick={deleteNote}>
          <MdClear />
        </IconButton>
        <IconButton onClick={switchToEditMode}>
          <span className={styles.noteDate}>Edit</span>
        </IconButton>
      </div>
    </div>
  );
}

export default SingleUserNote;
