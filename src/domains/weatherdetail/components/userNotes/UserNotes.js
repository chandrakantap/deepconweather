import React from 'react';
import AddUserNote from './AddUserNote';
import styles from './UserNotes.module.css';


function UserNotes() {
    return (
        <div>
            <AddUserNote />
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
            <div className={styles.singleNote}>
                <p className={styles.noteText}>
                    Modules that are mocked with jest.mock are mocked only for the file that calls jest.mock.
                </p>
                <p className={styles.noteDate}>15th Dec 2020</p>
            </div>
        </div>
    )
}

export default UserNotes;