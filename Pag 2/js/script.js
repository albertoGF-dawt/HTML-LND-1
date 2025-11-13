document.addEventListener('DOMContentLoaded', function () {

  const nombreInput = document.getElementById('note');
  const addNoteBtn = document.getElementById('addNote');
  const oldNotesContainer = document.querySelector('.old-notes');

  function addNote() {
    const noteText = nombreInput.value.trim();
    if (noteText === "") return;

    const newNote = document.createElement('p');
    newNote.textContent = noteText;
    newNote.style.border = "1px solid darkcyan";
    newNote.style.borderRadius = "10px";
    newNote.style.padding = "5px";
    newNote.style.margin = "5px 0";
    newNote.style.backgroundColor = "rgba(255,255,255,0.7)";

    const h2 = oldNotesContainer.querySelector('h2');
    h2.after(newNote);

    nombreInput.value = "";
  }

  addNoteBtn.addEventListener('click', addNote);
});



const agendaIcon = document.getElementById('agendaIcon');
const nombreInput = document.getElementById('note');

agendaIcon.addEventListener('click', () => {
  nombreInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  nombreInput.focus();
});

const casa = document.getElementById('house');
const mainH1 = document.querySelector('#main_content h1');

casa.addEventListener('click', () => {
  mainH1.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const oldNotes = document.getElementById('old-notesIcon');
const oldNotesH2 = document.querySelector('#old-notes-text');

oldNotes.addEventListener('click', () => {
  oldNotesH2.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const loginBtn = document.getElementById("login-button");
const loginInputs = document.getElementById("login-inputs");

loginBtn.addEventListener("click", () => {
  loginInputs.classList.toggle("mostrar");
});
