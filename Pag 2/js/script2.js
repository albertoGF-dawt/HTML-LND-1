let suggestion = [
  { username: "Rodrigo", suggestion: "Agregar más opciones de personalización" },
  { username: "estudiante", suggestion: "Añadir modo oscuro" },
  { username: "docente", suggestion: "Incluir más categorías" },
  { name: "Developer", suggestion: "Añadir una calculadora" },
];

function listenToEvents() {
  const form = document.getElementById("suggestion-box");
  form.addEventListener("submit", adduser);
}

function adduser(event) {
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
    suggestion: userSuggestion
  };

  suggestion.push(newSuggestion);


  showsuggestion();

  event.target.reset();
}

function showsuggestion() {
  const allsugestion = document.getElementById("suggestions-list");
  let aux = "";

  for (let i = 0; i < suggestion.length; i++) {
    const user = suggestion[i].username || suggestion[i].name;
    const text = suggestion[i].suggestion;
    aux += `<li><strong>${user}:</strong> ${text}</li>`;
  }

  allsugestion.innerHTML = aux;
}

listenToEvents();
showsuggestion();
