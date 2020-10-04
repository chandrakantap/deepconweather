import React from "react";
import PropTypes from "prop-types";
import styles from "./NoteEditor.module.css";

function NoteEditor(props) {
  const {
    placeholder,
    onChangeNote,
    onClickButton,
    note = "",
    buttonLbl = "Add",
  } = props;
  return (
    <div className={styles.root}>
      <textarea
        placeholder={placeholder}
        rows="2"
        value={note}
        onChange={onChangeNote}
      ></textarea>
      <button onClick={onClickButton}>{buttonLbl}</button>
    </div>
  );
}
NoteEditor.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeNote: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
  note: PropTypes.string,
  buttonLbl: PropTypes.string,
};
export default NoteEditor;
