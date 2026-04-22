# v12345678

Snapshot couvrant **toutes les parties (1 à 8)** de [`../exo.md`](../exo.md).

## Parties couvertes

### Partie 1 — Découverte des objets et du tableau
Les données suivent la forme définie dans l'énoncé (`id`, `createdAt`, `company`, `contact`, `email`, `country`, `revenue`, `status`).

### Partie 2 — Fonctions simples
- `displayCompanies()` — affiche toutes les entreprises dans la console.
- `addCompany(newCompany)` — ajoute une entreprise (voir parties 3 et 4 pour les contrôles ajoutés).
- `findCompanyById(id)` — retourne l'entreprise correspondant à l'identifiant.
- `findCompanyByEmail(email)` — retourne l'entreprise correspondant à l'email.
- `deleteCompanyById(id)` — supprime l'entreprise correspondant à l'identifiant.

### Partie 3 — Contrôle d'unicité de l'email
- `emailExists(email)` — vérifie si l'email existe déjà, de façon insensible à la casse.
- `addCompany(newCompany)` refuse l'ajout si l'email est déjà utilisé et affiche un message d'erreur (console + alerte).

### Partie 4 — Génération automatique de l'identifiant
- `generateNextId()` — génère le prochain identifiant au format `"004"`, `"010"`, etc.
- `addCompany(newCompany)` n'exige plus d'`id` dans l'objet reçu : il est généré automatiquement.
- Le champ *ID* a été retiré du formulaire HTML.

### Partie 5 — Filtrage des entreprises
- `getActiveCompanies()` — retourne uniquement les entreprises avec `status === true`.
- `getInactiveCompanies()` — retourne uniquement les entreprises avec `status === false`.
- `getCompaniesByCountry(country)` — retourne les entreprises du pays donné.
- `searchCompanies(keyword)` — retourne les entreprises dont `company`, `contact`, `email` ou `country` contient le mot-clé (insensible à la casse).
- Le champ de recherche de la toolbar est branché sur `searchCompanies()` : `renderCompanies()` accepte désormais une liste optionnelle pour afficher un résultat filtré.

### Partie 6 — Tri des entreprises
- `sortByName()` — trie par ordre alphabétique sur le nom de l'entreprise (`localeCompare`).
- `sortByRevenueAsc()` — trie par revenu croissant.
- `sortByRevenueDesc()` — trie par revenu décroissant.
- `sortByCreatedAt()` — trie par date de création (ordre chronologique).
- Les en-têtes *Created At*, *Company* et *Revenue (in M$)* sont cliquables pour déclencher le tri correspondant. Le clic sur *Revenue* alterne croissant / décroissant.

### Partie 7 — Mise à jour d'une entreprise
- `updateCompanyById(id, updatedData)` — fusionne les champs fournis dans `updatedData` avec ceux déjà présents, les autres restent inchangés.

### Partie 8 — Statistiques simples
- `getTotalRevenue()` — somme totale des revenus (`reduce`).
- `getAverageRevenue()` — moyenne des revenus (retourne `0` si le tableau est vide).
- `countActiveCompanies()` — nombre d'entreprises actives.
- `countCompaniesByCountry(country)` — nombre d'entreprises d'un pays donné.
- Section *Statistiques* dans l'interface : revenu total, revenu moyen, et nombre d'entreprises actives, mis à jour automatiquement via `renderStats()` appelée depuis `renderCompanies()`.

## Interface
- Interface stylée uniquement avec Bootstrap 5.3 (card, form-control, form-select, form-check, table-bordered, table-hover).
- Boutons d'action du tableau en icônes Bootstrap Icons : `bi-trash` (outline-danger) et `bi-pencil` (outline-orange).
- Variante personnalisée `.btn-outline-orange` définie via les variables `--bs-btn-*` de Bootstrap dans `style.css`.
- Bouton *Cancel* activé dès qu'un champ est modifié.
