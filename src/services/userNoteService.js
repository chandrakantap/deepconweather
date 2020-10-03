function getUserNotes({ name, country }) {
    const cityNameCountry = `${name}_${country}`.toLocaleUpperCase();
    const userNotesStr = localStorage.getItem(cityNameCountry);
    if (userNotesStr) {
        return JSON.parse(userNotesStr);
    } else {
        return [];
    }
}

function addUserNote({ name, country, note }) {
    const cityNameCountry = `${name}_${country}`.toLocaleUpperCase();
    const userNotesStr = localStorage.getItem(cityNameCountry);
    const userNotes = userNotesStr ? JSON.parse(userNotesStr) : [];

    userNotes.push(note);
    localStorage.setItem(cityNameCountry, JSON.stringify(userNotes));
}

function removeUserNoteForCity({ name, country }) {
    const cityNameCountry = `${name}_${country}`.toLocaleUpperCase();
    localStorage.removeItem(cityNameCountry);
}

export default { getUserNotes, addUserNote, removeUserNoteForCity }