// Tableau principal contenant les entreprises déjà disponibles au chargement de la page.
// Chaque élément du tableau est un objet qui représente une entreprise.
// Le champ `status` est un booléen : true = active, false = inactive.
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
  },
  {
    id: "004",
    createdAt: "2026-02-14",
    company: "Nordwind Traders",
    contact: "Lena Schmidt",
    email: "lena@nordwind.com",
    country: "Germany",
    revenue: 320,
    status: true
  },
  {
    id: "005",
    createdAt: "2026-01-07",
    company: "OceanFresh SA",
    contact: "Koffi Mensah",
    email: "koffi@oceanfresh.com",
    country: "Ghana",
    revenue: 75,
    status: false
  },
  {
    id: "006",
    createdAt: "2026-04-02",
    company: "SolarWave Energy",
    contact: "Aïcha Diallo",
    email: "aicha@solarwave.com",
    country: "Senegal",
    revenue: 410,
    status: true
  },
  {
    id: "007",
    createdAt: "2025-12-18",
    company: "Maple & Pine",
    contact: "Louis Tremblay",
    email: "louis@maplepine.ca",
    country: "Canada",
    revenue: 180,
    status: true
  },
  {
    id: "008",
    createdAt: "2025-11-30",
    company: "ByteForge",
    contact: "Priya Nair",
    email: "priya@byteforge.in",
    country: "India",
    revenue: 260,
    status: false
  },
  {
    id: "009",
    createdAt: "2026-03-11",
    company: "Atlas Logistica",
    contact: "Diego Ramos",
    email: "diego@atlaslog.mx",
    country: "Mexico",
    revenue: 140,
    status: true
  },
  {
    id: "010",
    createdAt: "2026-04-10",
    company: "Sahara Spices",
    contact: "Youssef Amrani",
    email: "youssef@saharaspices.ma",
    country: "Morocco",
    revenue: 90,
    status: true
  },
  {
    id: "011",
    createdAt: "2026-02-28",
    company: "Highland Dairy",
    contact: "Iain MacLeod",
    email: "iain@highlanddairy.uk",
    country: "United Kingdom",
    revenue: 210,
    status: false
  },
  {
    id: "012",
    createdAt: "2026-03-22",
    company: "Savanna Textiles",
    contact: "Zanele Nkosi",
    email: "zanele@savanna.co.za",
    country: "South Africa",
    revenue: 155,
    status: true
  }
];

/* =============================================================================
   Partie 2 — Fonctions de base
============================================================================= */

function displayCompanies() {
  console.log(companies)
}

function findCompanyById(id) {
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === id) {
      return companies[i]
    }
  }
  return
}

function findCompanyByEmail(email) {
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].email === email) {
      return companies[i]
    }
  }
  return
}

function getCompanyIndexById(id) {
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === id) {
      return i
    }
  }
  return
}

function deleteCompanyById(id) {
  const index = getCompanyIndexById(id)
  if (index === undefined) {
    return
  }
  companies.splice(index, 1)
}

/* =============================================================================
   Partie 3 — Unicité de l'email
============================================================================= */

function emailExists(email) {
  const normalized = email.toLowerCase()
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].email.toLowerCase() === normalized) {
      return true
    }
  }
  return false
}

/* =============================================================================
   Partie 4 — Génération automatique de l'identifiant
============================================================================= */

function generateNextId() {
  if (companies.length === 0) {
    return "001"
  }
  let max = 0
  for (let i = 0; i < companies.length; i++) {
    const value = Number(companies[i].id)
    if (value > max) {
      max = value
    }
  }
  return String(max + 1).padStart(3, "0")
}

function addCompany(newCompany) {
  if (emailExists(newCompany.email)) {
    console.error("Email déjà utilisé : " + newCompany.email)
    return false
  }
  newCompany.id = generateNextId()
  companies.push(newCompany)
  return true
}

/* =============================================================================
   Partie 5 — Filtrage
============================================================================= */

function getActiveCompanies() {
  return companies.filter((company) => company.status === true)
}

function getInactiveCompanies() {
  return companies.filter((company) => company.status === false)
}

function getCompaniesByCountry(country) {
  return companies.filter((company) => company.country === country)
}

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

/* =============================================================================
   Partie 6 — Tri
============================================================================= */

function sortByName() {
  companies.sort((a, b) => a.company.localeCompare(b.company))
}

function sortByRevenueAsc() {
  companies.sort((a, b) => a.revenue - b.revenue)
}

function sortByRevenueDesc() {
  companies.sort((a, b) => b.revenue - a.revenue)
}

function sortByCreatedAt() {
  companies.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

/* =============================================================================
   Partie 7 — Mise à jour
============================================================================= */

function updateCompanyById(id, updatedData) {
  const index = getCompanyIndexById(id)
  if (index === undefined) {
    return
  }
  companies[index] = { ...companies[index], ...updatedData }
}

/* =============================================================================
   Partie 8 — Statistiques
============================================================================= */

function getTotalRevenue() {
  return companies.reduce((total, company) => total + company.revenue, 0)
}

function getAverageRevenue() {
  if (companies.length === 0) {
    return 0
  }
  return getTotalRevenue() / companies.length
}

function countActiveCompanies() {
  return getActiveCompanies().length
}

function countCompaniesByCountry(country) {
  return getCompaniesByCountry(country).length
}

/* =============================================================================
   Liste des pays du formulaire
============================================================================= */

const countries = [
  "Algeria", "Belgium", "Benin", "Burkina Faso", "Cameroon", "Canada", "Chad",
  "China", "Côte d’Ivoire", "Egypt", "France", "Germany", "Ghana", "India",
  "Italy", "Japan", "Kenya", "Mali", "Mexico", "Morocco", "Niger", "Nigeria",
  "Senegal", "South Africa", "Spain", "Switzerland", "Togo", "Tunisia",
  "United Kingdom", "United States"
];

const countrySelect = document.getElementById("country");
countries.sort().forEach((country) => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});

/* =============================================================================
   État de la vue : recherche + pagination
============================================================================= */

// Liste courante après filtrage : pilote l'affichage du tableau.
let currentView = companies.slice()
let currentPage = 1
let pageSize = 10

// Références aux contrôles utilisés par refreshView().
const searchInput = document.getElementById("searchInput")
const pageSizeSelect = document.getElementById("pageSizeSelect")

// Quand les données ou le filtre changent, on re-calcule la vue.
function refreshView() {
  const keyword = searchInput.value.trim()
  if (keyword === "") {
    currentView = companies.slice()
  } else {
    currentView = searchCompanies(keyword)
  }
  // On borne currentPage au nombre de pages disponibles pour éviter
  // d'afficher une page vide après une suppression ou un filtrage.
  const totalPages = Math.max(1, Math.ceil(currentView.length / pageSize))
  if (currentPage > totalPages) {
    currentPage = totalPages
  }
  renderTable()
}

/* =============================================================================
   Rendu du tableau, stats et pagination
============================================================================= */

const tableBody = document.getElementById("companyTableBody");
const paginationInfo = document.getElementById("paginationInfo");
const paginationNav = document.getElementById("paginationNav");

// Rendu HTML du statut sous forme de pastille. Lit le booléen directement.
function renderStatusPill(status) {
  if (status === true) {
    return `<span class="status-pill status-pill--on">On</span>`
  }
  return `<span class="status-pill status-pill--off">Off</span>`
}

// Construit une ligne du tableau à partir d'un objet entreprise.
function buildRowHtml(company) {
  return `
    <td>${company.createdAt}</td>
    <td><span class="text-muted">#${company.id}</span></td>
    <td><strong>${company.company}</strong></td>
    <td>${company.contact}</td>
    <td>${company.email}</td>
    <td>${company.country}</td>
    <td class="text-end">${company.revenue} <small class="text-muted">M$</small></td>
    <td>${renderStatusPill(company.status)}</td>
    <td class="text-end">
      <div class="row-actions">
        <button type="button" class="icon-btn" data-action="edit" data-id="${company.id}" title="Modifier" aria-label="Modifier"><i class="bi bi-pencil"></i></button>
        <button type="button" class="icon-btn icon-btn--danger" data-action="delete" data-id="${company.id}" title="Supprimer" aria-label="Supprimer"><i class="bi bi-trash"></i></button>
      </div>
    </td>
  `
}

function renderTable() {
  tableBody.innerHTML = ""

  if (currentView.length === 0) {
    tableBody.innerHTML = `<tr class="empty-row"><td colspan="9">Aucune entreprise à afficher.</td></tr>`
    renderPagination()
    renderStats()
    return
  }

  const start = (currentPage - 1) * pageSize
  const pageItems = currentView.slice(start, start + pageSize)

  pageItems.forEach((company) => {
    const row = document.createElement("tr")
    row.innerHTML = buildRowHtml(company)
    tableBody.appendChild(row)
  })

  renderPagination()
  renderStats()
}

function renderStats() {
  document.getElementById("statTotalRevenue").textContent = getTotalRevenue()
  document.getElementById("statAverageRevenue").textContent = getAverageRevenue().toFixed(2)
  document.getElementById("statActiveCount").textContent = countActiveCompanies()
  document.getElementById("statTotalCount").textContent = companies.length
}

// Construit une barre de pagination compacte (première, précédent, pages, suivant, dernière).
function renderPagination() {
  paginationNav.innerHTML = ""

  const total = currentView.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, total)
  paginationInfo.textContent = total === 0
    ? "0 result"
    : `Showing ${start}–${end} of ${total}`

  const makeBtn = (label, page, { disabled = false, active = false } = {}) => {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = "page-btn" + (active ? " is-active" : "")
    btn.innerHTML = label
    btn.disabled = disabled
    if (!disabled && !active) {
      btn.addEventListener("click", () => {
        currentPage = page
        renderTable()
      })
    }
    return btn
  }

  paginationNav.appendChild(makeBtn(`<i class="bi bi-chevron-double-left"></i>`, 1, { disabled: currentPage === 1 }))
  paginationNav.appendChild(makeBtn(`<i class="bi bi-chevron-left"></i>`, currentPage - 1, { disabled: currentPage === 1 }))

  // Fenêtre glissante de pages autour de la page courante (max ~5 numéros).
  const windowSize = 5
  let from = Math.max(1, currentPage - Math.floor(windowSize / 2))
  let to = Math.min(totalPages, from + windowSize - 1)
  from = Math.max(1, to - windowSize + 1)

  for (let p = from; p <= to; p++) {
    paginationNav.appendChild(makeBtn(String(p), p, { active: p === currentPage }))
  }

  paginationNav.appendChild(makeBtn(`<i class="bi bi-chevron-right"></i>`, currentPage + 1, { disabled: currentPage === totalPages }))
  paginationNav.appendChild(makeBtn(`<i class="bi bi-chevron-double-right"></i>`, totalPages, { disabled: currentPage === totalPages }))
}

/* =============================================================================
   Drawer (formulaire latéral) — ajout / édition
============================================================================= */

const drawer = document.getElementById("formDrawer")
const drawerTitle = document.getElementById("drawerTitle")
const form = document.getElementById("companyForm")
const submitButton = document.getElementById("submitButton")
const cancelButton = document.getElementById("cancelButton")
const openFormButton = document.getElementById("openFormButton")
let currentEditId = null

function openDrawer(mode) {
  drawerTitle.textContent = mode === "edit" ? "Edit company" : "New company"
  submitButton.textContent = mode === "edit" ? "Save" : "Add"
  drawer.classList.add("is-open")
  drawer.setAttribute("aria-hidden", "false")
}

function closeDrawer() {
  drawer.classList.remove("is-open")
  drawer.setAttribute("aria-hidden", "true")
  currentEditId = null
  cancelButton.disabled = true
  form.reset()
}

openFormButton.addEventListener("click", () => {
  form.reset()
  currentEditId = null
  cancelButton.disabled = true
  openDrawer("add")
});

drawer.querySelectorAll("[data-drawer-close]").forEach((el) => {
  el.addEventListener("click", closeDrawer)
});

cancelButton.addEventListener("click", closeDrawer);

function fillFormForEdit(company) {
  document.getElementById("createdAt").value = company.createdAt
  document.getElementById("company").value = company.company
  document.getElementById("contact").value = company.contact
  document.getElementById("email").value = company.email
  document.getElementById("country").value = company.country
  document.getElementById("revenue").value = company.revenue
  // status est un booléen → alimenté directement dans le switch.
  document.getElementById("status").checked = company.status === true
  currentEditId = company.id
}

form.addEventListener("submit", function (event) {
  event.preventDefault()

  const newCompany = {
    createdAt: document.getElementById("createdAt").value,
    company: document.getElementById("company").value,
    contact: document.getElementById("contact").value,
    email: document.getElementById("email").value,
    country: document.getElementById("country").value,
    revenue: Number(document.getElementById("revenue").value),
    // status reste un booléen dans tout le programme.
    status: document.getElementById("status").checked
  }

  if (currentEditId) {
    updateCompanyById(currentEditId, newCompany)
  } else {
    const added = addCompany(newCompany)
    if (!added) {
      window.alert("Email déjà utilisé. Impossible d'ajouter cette entreprise.")
      return
    }
  }

  closeDrawer()
  refreshView()
});

function enableCancel() {
  if (currentEditId) {
    cancelButton.disabled = false
  }
}
form.addEventListener("input", enableCancel);
form.addEventListener("change", enableCancel);

/* =============================================================================
   Interactions du tableau : édition + suppression
============================================================================= */

tableBody.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]")
  if (!button) {
    return
  }
  const action = button.dataset.action
  const id = button.dataset.id

  if (action === "edit") {
    const company = findCompanyById(id)
    if (!company) {
      return
    }
    fillFormForEdit(company)
    openDrawer("edit")
  }

  if (action === "delete") {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette entreprise ?")
    if (confirmed) {
      deleteCompanyById(id)
      refreshView()
    }
  }
});

/* =============================================================================
   Barre d'outils : recherche, tri, pagination
============================================================================= */

searchInput.addEventListener("input", function () {
  currentPage = 1
  refreshView()
});

pageSizeSelect.addEventListener("change", function () {
  pageSize = Number(pageSizeSelect.value)
  currentPage = 1
  refreshView()
});

// Tri : clic sur les en-têtes. Revenue alterne croissant / décroissant.
let revenueSortDesc = false
document.querySelectorAll("th.sortable").forEach((th) => {
  th.addEventListener("click", function () {
    const key = th.dataset.sort
    if (key === "createdAt") {
      sortByCreatedAt()
    } else if (key === "name") {
      sortByName()
    } else if (key === "revenue") {
      if (revenueSortDesc) {
        sortByRevenueAsc()
      } else {
        sortByRevenueDesc()
      }
      revenueSortDesc = !revenueSortDesc
    }
    refreshView()
  })
});

/* =============================================================================
   Amorçage
============================================================================= */

refreshView()
