import React from 'react';
import { useSelector } from 'react-redux';
import {
    isLoadedSelector,
    userNotesSelector
} from 'domains/userNotes/store/userNotesSelector';
import { createSelector } from 'reselect';
import styles from './UserNotes.module.css';

const selector = createSelector(
    userNotesSelector,
    isLoadedSelector,
    (userNotes, isLoaded) => ({
        userNotes,
        isLoaded
    })
);

function UserNoteList() {
    const { isLoaded, userNotes = [] } = useSelector(selector);
    if (!isLoaded) {
        return null;
    }

    return (
        <div>
            {userNotes.map(note => (
                <div className={styles.singleNote} key={note.timestamp}>
                    <p className={styles.noteText}>
                        {note.text}
                    </p>
                    <p className={styles.noteDate}>{note.createdOn}</p>
                </div>
            ))}
        </div>
    )
}

export default UserNoteList;