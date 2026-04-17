# v12347

Snapshot couvrant les **parties 1, 2, 3, 4 et 7** de [`../exo.md`](../exo.md).

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

### Partie 7 — Mise à jour d'une entreprise
- `updateCompanyById(id, updatedData)` — fusionne les champs fournis dans `updatedData` avec ceux déjà présents, les autres restent inchangés.

## Interface
- Interface stylée uniquement avec Bootstrap 5.3 (card, form-control, form-select, form-check, table-bordered, table-hover).
- Boutons d'action du tableau en icônes Bootstrap Icons : `bi-trash` (outline-danger) et `bi-pencil` (outline-orange).
- Variante personnalisée `.btn-outline-orange` définie via les variables `--bs-btn-*` de Bootstrap dans `style.css`.
- Bouton *Cancel* activé dès qu'un champ est modifié.
