const firebaseConfig = {
  apiKey: "AIzaSyAGn_wiybXFz5L_6bnpNXePBquS38JnsnA",
  authDomain: "quiero-aprobar-programacion.firebaseapp.com",
  databaseURL: "https://quiero-aprobar-programacion-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quiero-aprobar-programacion",
  storageBucket: "quiero-aprobar-programacion.firebasestorage.app",
  messagingSenderId: "987163590288",
  appId: "1:987163590288:web:46333d1e79d417f2662215",
  measurementId: "G-9J615QQRZ8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const notesRef = db.ref("Notes");

const usernameInput = document.getElementById("Username");
const noteInput = document.getElementById("note");
const addNoteBtn = document.getElementById("addNote");
const oldNotesContainer = document.querySelector(".old-notes");
const errorMessage = document.getElementById("error-message");

addNoteBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const noteText = noteInput.value.trim();

  if (username === "" || noteText === "") {
    errorMessage.textContent = "Por favor rellene los dos campos.";
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";

  notesRef.push({
    username: username,
    text: noteText
  })
  .then(() => {
    noteInput.value = "";
  })
  .catch((error) => {
    alert("Error: " + error.message);
  });
});

notesRef.on("value", (snapshot) => {
  oldNotesContainer.innerHTML = "<h2 id='old-notes-text'>Notas de otros usuarios</h2>";

  if (!snapshot.exists()) {
    oldNotesContainer.innerHTML += "<p>No hay notas todavía. ¡Sé el primero!</p>";
    return;
  }

  snapshot.forEach(child => {
    const note = child.val();
    const id = child.key;

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note-item");
    noteDiv.style.cssText = `
      margin-top:10px;
      background:rgba(255,255,255,0.6);
      border:2px solid darkcyan;
      border-radius:10px;
      padding:10px;
    `;

    noteDiv.innerHTML = `
      <p><strong>${note.username}</strong>: ${note.text}</p>
    `;

    oldNotesContainer.appendChild(noteDiv);
  });
});