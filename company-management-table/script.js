// Tableau principal contenant les entreprises déjà disponibles au chargement de la page.
// Chaque élément du tableau est un objet qui représente une entreprise.
const companies = [
  {
    // Date de création ou d'enregistrement de l'entreprise
    createdAt: "2026-03-28",

    // Identifiant unique de l'entreprise
    id: "001",

    // Nom de l'entreprise
    company: "Alfreds Futterkiste",

    // Nom de la personne de contact
    contact: "Maria Anders",

    // Pays de l'entreprise
    country: "Germany",

    // Revenu de l'entreprise (ici en millions)
    revenue: 100
  },
  {
    createdAt: "2026-03-29",
    id: "002",
    company: "Centro comercial Moctezuma",
    contact: "Francisco Chang",
    country: "Mexico",
    revenue: 200
  },
  {
    createdAt: "2026-03-30",
    id: "003",
    company: "Attijari",
    contact: "Stephane Algo",
    country: "Cameroun",
    revenue: 50
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



function getCompanyById(companies, companyId) {

  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === companyId) {
      return companies[i]
    }
  }
  return
}


function getCompanyIndexById(companies, companyId) {

  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === companyId) {
      return i
    }
  }
  return

}


// Remplit les champs du formulaire avec les données d'une entreprise existante,
// afin que l'utilisateur puisse les modifier. On mémorise aussi l'id de
// l'entreprise éditée dans currentEditId pour savoir que l'on est en mode édition.
function fillFormForEdit(company) {

  document.getElementById("createdAt").value = company.createdAt;
  document.getElementById("company").value = company.company;
  document.getElementById("contact").value = company.contact;
  document.getElementById("country").value = company.country;
  document.getElementById("revenue").value = company.revenue;
  document.getElementById("id").value = company.id;

  currentEditId = company.id

}

// Met à jour une entreprise déjà présente dans le tableau.
// On récupère son index grâce à son id, puis on fusionne ses anciennes
// données avec les nouvelles via l'opérateur spread (...).
function updateCompanyById(companies, companyId, editedCompanyData) {
  const index = getCompanyIndexById(companies, companyId)

  companies[index] = { ...companies[index], ...editedCompanyData }
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
function renderCompanies() {
  // On vide complètement le contenu actuel du tableau
  // pour éviter les doublons lors du réaffichage.
  tableBody.innerHTML = "";

  // On parcourt toutes les entreprises du tableau companies.
  companies.forEach((company) => {
    // Pour chaque entreprise, on crée une nouvelle ligne <tr>.
    const row = document.createElement("tr");

    // On remplit le contenu HTML de la ligne avec les propriétés de l'objet.
    // Chaque propriété est placée dans une cellule <td>.
    row.innerHTML = `
      <td>${company.createdAt}</td>
      <td>${company.id}</td>
      <td>${company.company}</td>
      <td>${company.contact}</td>
      <td>${company.country}</td>
      <td>${company.revenue}</td>
      <td>
      <button data-action="delete" data-index=${company.id}>Supprimer</button>
       <button data-action="edit" data-index=${company.id}>Modifier</button>
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
    // Valeur du champ date
    createdAt: document.getElementById("createdAt").value,

    // Valeur du champ identifiant
    id: document.getElementById("id").value,

    // Valeur du champ nom de l'entreprise
    company: document.getElementById("company").value,

    // Valeur du champ contact
    contact: document.getElementById("contact").value,

    // Valeur choisie dans la liste déroulante des pays
    country: document.getElementById("country").value,

    // Valeur du revenu convertie en nombre grâce à Number()
    // pour éviter qu'elle soit stockée comme simple texte.
    revenue: Number(document.getElementById("revenue").value)
  };

  // Si currentEditId est défini, on est en mode édition : on met à jour
  // l'entreprise existante au lieu d'en ajouter une nouvelle.
  // On remet ensuite l'interface dans son état "ajout" :
  //   - on efface l'id d'édition
  //   - on remet le texte du bouton principal à "Add"
  //   - on redésactive le bouton Cancel
  if (currentEditId) {
    updateCompanyById(companies, currentEditId, newCompany)
    currentEditId = null
    submitButton.textContent = "Add"
    cancelButton.disabled = true
  } else {
    // On ajoute la nouvelle entreprise à la fin du tableau companies.
    companies.push(newCompany);
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
    const company = getCompanyById(companies, index)
    fillFormForEdit(company)
    submitButton.textContent = "Edit"
    cancelButton.disabled = true
  }


  if (action === "delete") {
    // mettre la fonction delete
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette entreprise ?")
    if (confirmed) {
      const realIndex = getCompanyIndexById(companies, index)
      companies.splice(realIndex, 1)

      renderCompanies()
    }

  }
})
// Premier affichage du tableau au chargement de la page.
// Sans cet appel, les entreprises initiales ne seraient pas visibles.
renderCompanies();

// On vide explicitement le formulaire au chargement de la page.
// Sinon, après un refresh pendant une édition, le navigateur peut
// restaurer automatiquement les valeurs saisies, ce qui donne
// l'impression d'être encore en mode édition alors que currentEditId
// est remis à null.
form.reset();


