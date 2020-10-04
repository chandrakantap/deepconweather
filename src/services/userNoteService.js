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
function editUserNote({ name, country, note }) {
  const cityNameCountry = `${name}_${country}`.toLocaleUpperCase();
  const userNotesStr = localStorage.getItem(cityNameCountry);
  const userNotes = userNotesStr ? JSON.parse(userNotesStr) : [];

  const updatedUserNotes = userNotes.map((item) =>
    item.uniqueKey === note.uniqueKey ? note : item
  );
  localStorage.setItem(cityNameCountry, JSON.stringify(updatedUserNotes));
}
function removeUserNote({ name, country, uniqueKey }) {
  const cityNameCountry = `${name}_${country}`.toLocaleUpperCase();
  const userNotesStr = localStorage.getItem(cityNameCountry);
  const userNotes = userNotesStr ? JSON.parse(userNotesStr) : [];

  const updatedUserNotes = userNotes.filter(
    (note) => note.uniqueKey !== uniqueKey
  );
  localStorage.setItem(cityNameCountry, JSON.stringify(updatedUserNotes));
}

function removeUserNoteForCity({ name, country }) {
  const cityNameCountry = `${name}_${country}`.toLocaleUpperCase();
  localStorage.removeItem(cityNameCountry);
}

export default {
  getUserNotes,
  addUserNote,
  editUserNote,
  removeUserNote,
  removeUserNoteForCity,
};
