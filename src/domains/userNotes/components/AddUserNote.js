import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    addUserNoteAction
} from 'domains/userNotes/store/userNotesActions';
import styles from './UserNotes.module.css';


function AddUserNote(props) {
    const { cityName, country } = props;
    const [note, setNote] = useState('');
    const dispatch = useDispatch();

    const onChangeNote = (e) => {
        setNote(e.target.value);
    }
    const addUserNote = (e) => {
        e.preventDefault();
        if (note.trim().length > 0) {
            const now = new Date();
            const noteObject = {
                text: note,
                timestamp: now.getTime(),
                createdOn: now.toLocaleString()
            };
            dispatch(addUserNoteAction({
                note: noteObject,
                name: cityName,
                country
            }));
            setNote('');
        }
    }
    const isBtnDisabled = note.trim().length === 0;
    return (
        <div className={styles.addUserNote}>
            <textarea placeholder="add note .."
                rows="2" value={note}
                onChange={onChangeNote}
            ></textarea>
            <button onClick={addUserNote} disabled={isBtnDisabled}>Add</button>
        </div>
    )
}

export default AddUserNote;