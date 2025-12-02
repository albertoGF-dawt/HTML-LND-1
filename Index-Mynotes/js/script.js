document.addEventListener('DOMContentLoaded', function () {
  const agendaIcon = document.getElementById('agendaIcon');
  const noteInput = document.getElementById('note');
  const houseIcon = document.getElementById('house');
  const mainH1 = document.querySelector('#main_content h1');
  const oldNotesIcon = document.getElementById('old-notesIcon');
  const oldNotesH2 = document.querySelector('#old-notes-text');
  const loginBtn = document.getElementById("login-button");
  const loginInputs = document.getElementById("login-inputs");

  // scroll al input
  agendaIcon.addEventListener('click', () => {
    noteInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    noteInput.focus();
  });

  // scroll al h1
  houseIcon.addEventListener('click', () => {
    mainH1.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // scroll a notas anteriores
  oldNotesIcon.addEventListener('click', () => {
    oldNotesH2.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // login toggle
  if (loginBtn && loginInputs) {
    loginBtn.addEventListener("click", () => {
      loginInputs.classList.toggle("mostrar");
    });
  }
});



// Clave del almacenamiento
const NOTES_KEY = "notes_list";

//  Obtener notas guardadas 
function getNotes() {
  const saved = localStorage.getItem(NOTES_KEY);
  return saved ? JSON.parse(saved) : [];
}

//  Guardar notas 
function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

//  Renderizar notas 
function renderNotes() {
  const notesContainer = document.querySelector(".old-notes");

  if (!notesContainer) return;

  const notes = getNotes();

  let html = `<h2 id="old-notes-text">Notas anteriores</h2>`;

  notes.forEach(note => {
    html += `
      <div class="note-item" style="margin-top:10px; background:rgba(255,255,255,0.6); border:2px solid darkcyan; border-radius:10px; padding:10px;">
        <p>${note.text}</p>
        <button class="btn-edit" onclick="editNote(${note.id})"
          style="margin-right:10px; border:2px solid darkcyan; border-radius:8px; cursor:pointer;">Editar</button>
        <button class="btn-delete" onclick="deleteNote(${note.id})"
          style="border:2px solid darkcyan; border-radius:8px; cursor:pointer;">Eliminar</button>
      </div>
    `;
  });

  notesContainer.innerHTML = html;
}

// Agregar nota 
function addNote() {
  const input = document.getElementById("note");
  const text = input.value.trim();

  if (text === "") return;

  const notes = getNotes();

  const newNote = {
    id: Date.now(),
    text: text
  };

  notes.push(newNote);
  saveNotes(notes);

  input.value = "";
  renderNotes();
}

//Editar nota 
function editNote(id) {
  const notes = getNotes();
  const note = notes.find(n => n.id === id);
  if (!note) return;

  // Poner la nota en el input principal
  const input = document.getElementById("note");
  input.value = note.text;

  // Quitarla temporalmente de la lista
  const filtered = notes.filter(n => n.id !== id);
  saveNotes(filtered);

  renderNotes();

  // Enfocar
  input.scrollIntoView({ behavior: "smooth", block: "center" });
  input.focus();
}

//  Eliminar nota 
function deleteNote(id) {
  const notes = getNotes();
  const filtered = notes.filter(n => n.id !== id);
  saveNotes(filtered);
  renderNotes();
}

document.addEventListener("DOMContentLoaded", () => {
  const addNoteBtn = document.getElementById("addNote");

  if (addNoteBtn) {
    addNoteBtn.addEventListener("click", addNote);
  }

  renderNotes();
});