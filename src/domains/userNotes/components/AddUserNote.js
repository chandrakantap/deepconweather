import React from 'react';
import styles from './UserNotes.module.css';


function AddUserNote() {
    return (
        <div className={styles.addUserNote}>
            <textarea placeholder="add note .." rows="2"></textarea>
            <button>Add</button>
        </div>
    )
}

export default AddUserNote;