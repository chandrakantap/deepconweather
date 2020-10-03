import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    loadUserNotesAction,
    clearStateAction
} from 'domains/userNotes/store/userNotesActions';
import AddUserNote from './AddUserNote';
import UserNoteList from './UserNoteList';

function UserNotes(props) {
    const { cityName, country } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserNotesAction({ name: cityName, country }));
        return () => { dispatch(clearStateAction()) }
    }, [dispatch, cityName, country]);

    return (
        <div>
            <AddUserNote cityName={cityName} country={country} />
            <UserNoteList />
        </div>
    )
}

export default UserNotes;