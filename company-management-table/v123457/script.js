// Tableau principal contenant les entreprises déjà disponibles au chargement de la page.
// Chaque élément du tableau est un objet qui représente une entreprise.
const companies = [
  {
    id: "001",
    createdAt: "2026-03-28",
    company: "Alfreds Futterkiste",
    contact: "Maria Anders",
    email: "maria@alfreds.com",
    country: "Germany",
    revenue: 100,
    status: true
  },
  {
    id: "002",
    createdAt: "2026-03-29",
    company: "Centro comercial Moctezuma",
    contact: "Francisco Chang",
    email: "francisco@moctezuma.com",
    country: "Mexico",
    revenue: 200,
    status: false
  },
  {
    id: "003",
    createdAt: "2026-03-30",
    company: "Attijari",
    contact: "Stephane Algo",
    email: "stephane@attijari.com",
    country: "Cameroon",
    revenue: 50,
    status: true
  }
];


// Références aux deux boutons du formulaire.
// submitButton sert à la fois pour "Add" et pour "Edit" (son texte change selon le mode).
// cancelButton permet d'annuler une modification en cours.
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");

// Identifiant de l'entreprise en cours d'édition.
// Vaut null quand on est en mode "ajout", et contient l'id de l'entreprise
// quand on est en mode "édition".
let currentEditId = null;



// Partie 2 : recherche d'une entreprise par son identifiant.
function findCompanyById(id) {
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === id) {
      return companies[i]
    }
  }
  return
}

// Partie 2 : recherche d'une entreprise par son email.
function findCompanyByEmail(email) {
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].email === email) {
      return companies[i]
    }
  }
  return
}

// Helper interne : retrouve l'index d'une entreprise à partir de son id.
function getCompanyIndexById(id) {
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === id) {
      return i
    }
  }
  return
}

// Partie 2 : affiche toutes les entreprises dans la console.
function displayCompanies() {
  console.log(companies)
}

// Partie 3 : vérifie si un email existe déjà dans le tableau,
// de manière insensible à la casse.
function emailExists(email) {
  const normalized = email.toLowerCase()
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].email.toLowerCase() === normalized) {
      return true
    }
  }
  return false
}

// Partie 4 : génère le prochain identifiant à partir du dernier id du tableau.
// Ex : "003" -> "004", "009" -> "010".
function generateNextId() {
  if (companies.length === 0) {
    return "001"
  }
  const lastId = companies[companies.length - 1].id
  const nextNumber = Number(lastId) + 1
  return String(nextNumber).padStart(3, "0")
}

// Partie 2 + 3 + 4 : ajoute une nouvelle entreprise dans le tableau companies.
// - refuse l'ajout si l'email existe déjà (Partie 3)
// - génère automatiquement l'identifiant (Partie 4)
function addCompany(newCompany) {
  if (emailExists(newCompany.email)) {
    console.error("Email déjà utilisé : " + newCompany.email)
    return false
  }
  newCompany.id = generateNextId()
  companies.push(newCompany)
  return true
}

// Partie 2 : supprime l'entreprise correspondant à l'identifiant donné.
function deleteCompanyById(id) {
  const index = getCompanyIndexById(id)
  if (index === undefined) {
    return
  }
  companies.splice(index, 1)
}


// Remplit les champs du formulaire avec les données d'une entreprise existante,
// afin que l'utilisateur puisse les modifier. On mémorise aussi l'id de
// l'entreprise éditée dans currentEditId pour savoir que l'on est en mode édition.
function fillFormForEdit(company) {

  document.getElementById("createdAt").value = company.createdAt;
  document.getElementById("company").value = company.company;
  document.getElementById("contact").value = company.contact;
  document.getElementById("email").value = company.email;
  document.getElementById("country").value = company.country;
  document.getElementById("revenue").value = company.revenue;
  document.getElementById("status").checked = company.status;

  currentEditId = company.id

}

// Partie 5 : retourne uniquement les entreprises actives (status === true).
function getActiveCompanies() {
  return companies.filter((company) => company.status === true)
}

// Partie 5 : retourne uniquement les entreprises inactives (status === false).
function getInactiveCompanies() {
  return companies.filter((company) => company.status === false)
}

// Partie 5 : retourne les entreprises appartenant au pays donné.
function getCompaniesByCountry(country) {
  return companies.filter((company) => company.country === country)
}

// Partie 5 : recherche les entreprises pour lesquelles le mot-clé apparaît
// dans company, contact, email ou country. Recherche insensible à la casse.
function searchCompanies(keyword) {
  const normalized = keyword.toLowerCase()
  return companies.filter((company) => {
    return (
      company.company.toLowerCase().includes(normalized) ||
      company.contact.toLowerCase().includes(normalized) ||
      company.email.toLowerCase().includes(normalized) ||
      company.country.toLowerCase().includes(normalized)
    )
  })
}

// Partie 7 : met à jour une entreprise existante.
// Recherche l'entreprise par son id puis fusionne les anciennes données
// avec updatedData via l'opérateur spread. Seuls les champs présents dans
// updatedData sont modifiés, les autres restent inchangés.
function updateCompanyById(id, updatedData) {
  const index = getCompanyIndexById(id)
  if (index === undefined) {
    return
  }
  companies[index] = { ...companies[index], ...updatedData }
}
// Liste des pays qui vont alimenter la liste déroulante <select> du formulaire.
// L'utilisateur choisira un pays parmi ces valeurs.
const countries = [
  "Algeria",
  "Belgium",
  "Benin",
  "Burkina Faso",
  "Cameroon",
  "Canada",
  "Chad",
  "China",
  "Côte d’Ivoire",
  "Egypt",
  "France",
  "Germany",
  "Ghana",
  "India",
  "Italy",
  "Japan",
  "Kenya",
  "Mali",
  "Mexico",
  "Morocco",
  "Niger",
  "Nigeria",
  "Senegal",
  "South Africa",
  "Spain",
  "Switzerland",
  "Togo",
  "Tunisia",
  "United Kingdom",
  "United States"
];

// On récupère dans le HTML l'élément <select> ayant l'id "country".
// C'est dans cette liste déroulante que nous allons insérer les options de pays.
const countrySelect = document.getElementById("country");

// On trie d'abord les pays par ordre alphabétique avec sort().
// Ensuite, pour chaque pays, on crée dynamiquement une balise <option>
// qu'on ajoute dans la liste déroulante.
countries.sort().forEach((country) => {
  // Création d'une nouvelle balise <option>
  const option = document.createElement("option");

  // Valeur interne de l'option (celle qui sera envoyée/stockée)
  option.value = country;

  // Texte visible par l'utilisateur dans la liste déroulante
  option.textContent = country;

  // Ajout de l'option dans le <select>
  countrySelect.appendChild(option);
});

// On récupère le corps du tableau (<tbody>) dans lequel
// les lignes des entreprises seront affichées.
const tableBody = document.getElementById("companyTableBody");

// On récupère le formulaire HTML qui permet d'ajouter une nouvelle entreprise.
const form = document.getElementById("companyForm");

// Fonction chargée d'afficher toutes les entreprises du tableau companies
// dans le <tbody> du tableau HTML.
// On peut passer une liste filtrée (Partie 5) ; sinon on affiche tout.
function renderCompanies(list) {
  const data = list === undefined ? companies : list

  // On vide complètement le contenu actuel du tableau
  // pour éviter les doublons lors du réaffichage.
  tableBody.innerHTML = "";

  // On parcourt toutes les entreprises à afficher.
  data.forEach((company) => {
    // Pour chaque entreprise, on crée une nouvelle ligne <tr>.
    const row = document.createElement("tr");

    // On remplit le contenu HTML de la ligne avec les propriétés de l'objet.
    // Chaque propriété est placée dans une cellule <td>.
    row.innerHTML = `
      <td>${company.createdAt}</td>
      <td>${company.id}</td>
      <td>${company.company}</td>
      <td>${company.contact}</td>
      <td>${company.email}</td>
      <td>${company.country}</td>
      <td>${company.revenue}</td>
      <td>${company.status ? "Active" : "Inactive"}</td>
      <td>
      <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" data-index=${company.id} title="Supprimer" aria-label="Supprimer"><i class="bi bi-trash"></i></button>
       <button type="button" class="btn btn-sm btn-outline-orange" data-action="edit" data-index=${company.id} title="Modifier" aria-label="Modifier"><i class="bi bi-pencil"></i></button>
      </td>
    `;

    // On ajoute la ligne construite dans le corps du tableau.
    tableBody.appendChild(row);
  });
}

// On écoute l'événement "submit" du formulaire.
// Cela se déclenche quand l'utilisateur clique sur le bouton d'envoi.
form.addEventListener("submit", function (event) {
  // Empêche le comportement par défaut du formulaire,
  // c'est-à-dire le rechargement de la page.
  event.preventDefault();

  // Création d'un nouvel objet entreprise à partir des valeurs saisies
  // par l'utilisateur dans les champs du formulaire.
  const newCompany = {
    createdAt: document.getElementById("createdAt").value,
    company: document.getElementById("company").value,
    contact: document.getElementById("contact").value,
    email: document.getElementById("email").value,
    country: document.getElementById("country").value,
    revenue: Number(document.getElementById("revenue").value),
    status: document.getElementById("status").checked
  };

  // Si currentEditId est défini, on est en mode édition : on met à jour
  // l'entreprise existante au lieu d'en ajouter une nouvelle.
  // On remet ensuite l'interface dans son état "ajout" :
  //   - on efface l'id d'édition
  //   - on remet le texte du bouton principal à "Add"
  //   - on redésactive le bouton Cancel
  if (currentEditId) {
    updateCompanyById(currentEditId, newCompany)
    currentEditId = null
    submitButton.textContent = "Add"
    cancelButton.disabled = true
  } else {
    const added = addCompany(newCompany)
    if (!added) {
      window.alert("Email déjà utilisé. Impossible d'ajouter cette entreprise.")
      return
    }
  }

  // On réaffiche le tableau pour inclure la nouvelle ligne.
  renderCompanies();

  // On vide les champs du formulaire après l'ajout
  // pour permettre une nouvelle saisie propre.
  form.reset();
});

// Clic sur le bouton Cancel : on quitte le mode édition sans enregistrer.
// On remet donc l'état initial : pas d'id édité, bouton principal en "Add",
// Cancel redésactivé et formulaire vidé.
cancelButton.addEventListener("click", function () {
  currentEditId = null
  submitButton.textContent = "Add"
  cancelButton.disabled = true
  form.reset()
});

// Le bouton Cancel reste visible en permanence mais il est désactivé tant
// que l'utilisateur n'a pas modifié un champ pendant une édition.
// Dès qu'un champ change et qu'on est bien en mode édition, on l'active.
function enableCancel() {
  cancelButton.disabled = false
}

form.addEventListener("input", enableCancel);
form.addEventListener("change", enableCancel);


tableBody.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]")
  if (!button) {
    return;
  }

  const action = button.dataset.action
  const index = button.dataset.index

  // Clic sur le bouton "Modifier" d'une ligne :
  //   - on remplit le formulaire avec les valeurs de l'entreprise
  //   - on change le texte du bouton principal en "Edit"
  //   - on laisse Cancel désactivé : il s'activera seulement quand
  //     l'utilisateur aura vraiment modifié au moins un champ.
  if (action === "edit") {
    const company = findCompanyById(index)
    fillFormForEdit(company)
    submitButton.textContent = "Edit"
    cancelButton.disabled = true
  }


  if (action === "delete") {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette entreprise ?")
    if (confirmed) {
      deleteCompanyById(index)
      renderCompanies()
    }

  }
})
// Partie 5 : branchement du champ de recherche sur searchCompanies().
// À chaque frappe, on filtre le tableau et on ré-affiche uniquement les
// entreprises correspondantes. Si le champ est vide, on réaffiche tout.
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.trim()
  if (keyword === "") {
    renderCompanies()
  } else {
    renderCompanies(searchCompanies(keyword))
  }
});

// Premier affichage du tableau au chargement de la page.
// Sans cet appel, les entreprises initiales ne seraient pas visibles.
renderCompanies();

// On vide explicitement le formulaire au chargement de la page.
// Sinon, après un refresh pendant une édition, le navigateur peut
// restaurer automatiquement les valeurs saisies, ce qui donne
// l'impression d'être encore en mode édition alors que currentEditId
// est remis à null.
form.reset();


