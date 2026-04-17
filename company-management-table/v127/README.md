# v127

Snapshot couvrant les **parties 1, 2 et 7** de [`../exo.md`](../exo.md).

## Parties couvertes

### Partie 1 — Découverte des objets et du tableau
Les données suivent la forme définie dans l'énoncé (`id`, `createdAt`, `company`, `contact`, `email`, `country`, `revenue`, `status`).

### Partie 2 — Fonctions simples
- `displayCompanies()` — affiche toutes les entreprises dans la console.
- `addCompany(newCompany)` — ajoute une entreprise au tableau.
- `findCompanyById(id)` — retourne l'entreprise correspondant à l'identifiant.
- `findCompanyByEmail(email)` — retourne l'entreprise correspondant à l'email.
- `deleteCompanyById(id)` — supprime l'entreprise correspondant à l'identifiant.

### Partie 7 — Mise à jour d'une entreprise
- `updateCompanyById(id, updatedData)` — fusionne les champs fournis dans `updatedData` avec ceux déjà présents, les autres restent inchangés.

## Interface
- Formulaire d'ajout / édition avec tous les champs (y compris email et status).
- Tableau HTML avec boutons *Modifier* et *Supprimer* par ligne.
- Bouton *Cancel* activé dès qu'un champ est modifié.
