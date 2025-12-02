let suggestion = [{
  username: "Juan",
  suggestion: "Me encanta este sitio web!",
  email: ".",
  password: "."
},
];

function listenToEvents() {
  const form = document.getElementById("suggestion-box");
  form.addEventListener("submit", add_user);
}

function add_user(event) {
  event.preventDefault();

  const userName = document.getElementById("username").value.trim();
  const userSuggestion = document.getElementById("suggestion").value.trim();
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  const userError = document.getElementById("error-username-required");
  const suggestionError = document.getElementById("error-suggestion-required");
  const emailError = document.getElementById("error-email-invalid");
  const passwordError = document.getElementById("error-password-required");

  userError.style.display = "none";
  suggestionError.style.display = "none";
  emailError.style.display = "none";
  passwordError.style.display = "none";

  let isValid = true;

  if (userName === "") {
    userError.style.display = "block";
    isValid = false;
  }
  if (userSuggestion === "") {
    suggestionError.style.display = "block";
    isValid = false;
  }
  if (emailInput === "") {
    emailError.style.display = "block";
    isValid = false;
  }
  if (passwordInput === "") {
    passwordError.style.display = "block";
    isValid = false;
  }

  if (!isValid) return;


  const newSuggestion = {
    username: userName,
    suggestion: userSuggestion,
    email: emailInput,
    password: passwordInput
  };

 
  suggestion.push(newSuggestion);


  show_suggestion();

 
  event.target.reset();
}

function show_suggestion() {
  const allsugestion = document.getElementById("suggestions-list");
  let aux = "";

  for (let i = 0; i < suggestion.length; i++) {
    const item = suggestion[i];

    aux += `
      <li>
        <strong>${item.username}:</strong> ${item.suggestion}
        <button id="Btn-edit"onclick="editSuggestion(${i})">Editar</button>
        <button id="Btn-Delete"onclick="deleteSuggestion(${i})">Eliminar</button>
      </li>
    `;
  }

  allsugestion.innerHTML = aux;
}


function editSuggestion(index) {
  const item = suggestion[index];

  document.getElementById("username").value = item.username;
  document.getElementById("suggestion").value = item.suggestion;
  document.getElementById("email").value = item.email;
  document.getElementById("password").value = item.password;


  suggestion.splice(index, 1);

 
  show_suggestion();
}


function deleteSuggestion(index) {
  suggestion.splice(index, 1);
  show_suggestion();
}

listenToEvents();
show_suggestion();


