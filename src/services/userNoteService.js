function getUserNotes(cityId) {
  const userNotesStr = localStorage.getItem(cityId);
  if (userNotesStr) {
    return JSON.parse(userNotesStr);
  } else {
    return [];
  }
}

function addUserNote({ cityId, note }) {
  const userNotes = getUserNotes(cityId);

  userNotes.push(note);
  localStorage.setItem(cityId, JSON.stringify(userNotes));
}
function editUserNote({ cityId, note }) {
  const userNotes = getUserNotes(cityId);

  const updatedUserNotes = userNotes.map((item) =>
    item.uniqueKey === note.uniqueKey ? note : item
  );
  localStorage.setItem(cityId, JSON.stringify(updatedUserNotes));
}
function removeUserNote({ cityId, uniqueKey }) {
  const userNotes = getUserNotes(cityId);

  const updatedUserNotes = userNotes.filter(
    (note) => note.uniqueKey !== uniqueKey
  );
  localStorage.setItem(cityId, JSON.stringify(updatedUserNotes));
}

function removeUserNoteForCity(cityId) {
  localStorage.removeItem(cityId);
}

export default {
  getUserNotes,
  addUserNote,
  editUserNote,
  removeUserNote,
  removeUserNoteForCity,
};
