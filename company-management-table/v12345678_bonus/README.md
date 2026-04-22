# v12345678_bonus

Version bonus de l'exercice : toutes les parties 1 à 8 de [`../exo.md`](../exo.md)
plus une refonte *dashboard-like* de l'interface et la pagination du tableau.

## Ce qui change par rapport à `v12345678`

### Design dashboard
- Nouvelle mise en page en deux colonnes : sidebar (navigation) + zone de contenu.
- En-tête de page avec titre + sous-titre + bouton principal *New company*.
- Quatre *stat cards* colorées en haut de page : Total revenue, Average revenue, Active companies, Total companies (nouvelle métrique).
- Tableau placé dans un *panel* avec header (recherche + sélecteur de taille de page) et footer (info de pagination + navigation).
- Palette personnalisée définie via des variables CSS (`:root`), polices et ombrages revus, plus de dépendance au style Bootstrap par défaut pour les cartes.
- Formulaire déplacé dans une **modale Bootstrap** qui s'ouvre depuis le bouton *New company* ou le bouton *Modifier* d'une ligne. Pilotée programmatiquement via `bootstrap.Modal`, remise à zéro à chaque fermeture (`hidden.bs.modal`).
- Sidebar **repliable** via un bouton dédié dans la topbar (`#sidebarToggle`) : les libellés disparaissent, la colonne passe de 240px à 72px. Sur petit écran la sidebar est repliée par défaut.
- Statut affiché sous forme de pastille colorée (pill) : vert `On` ou rouge `Off`.

### Statut booléen
- `status` reste un booléen dans toute la logique : stocké en `true` / `false` dans les objets, lu/écrit directement depuis le switch du formulaire (`form-switch`).
- Plus de chaînes `"Active"` / `"Inactive"` ni de conversion côté UI : `renderStatusPill(status)` reçoit le booléen et rend la pastille correspondante.

### Pagination
- Nouvelle logique d'affichage dans `renderTable()` : on affiche uniquement `currentView.slice(start, start + pageSize)`.
- Navigation compacte `renderPagination()` : boutons *première*, *précédent*, fenêtre glissante de 5 numéros de page autour de la page courante, *suivant*, *dernière*.
- Sélecteur *rows per page* (5 / 10 / 20 / 50).
- Info de pagination dynamique (`Showing 1–10 of 12`).
- La page courante est automatiquement bornée après un filtrage ou une suppression pour ne jamais afficher une page vide.

### Recherche et tri
- La recherche utilise toujours `searchCompanies()` (Partie 5), mais alimente désormais `currentView` puis la pagination.
- Le tri (Partie 6) reste branché sur les en-têtes cliquables *Created*, *Company* et *Revenue* ; après un tri on ré-affiche via `refreshView()` pour rester sur une page cohérente.

### Jeu de données
- Étendu à 12 entreprises pour rendre la pagination visible et éprouver les filtres.

## Parties de l'exercice couvertes
Toutes les fonctions exigées par `exo.md` sont présentes et inchangées dans leur signature :

- **Partie 2** : `displayCompanies`, `addCompany`, `findCompanyById`, `findCompanyByEmail`, `deleteCompanyById`.
- **Partie 3** : `emailExists` (insensible à la casse).
- **Partie 4** : `generateNextId` (prend le max des ids existants pour éviter toute collision après suppression).
- **Partie 5** : `getActiveCompanies`, `getInactiveCompanies`, `getCompaniesByCountry`, `searchCompanies`.
- **Partie 6** : `sortByName`, `sortByRevenueAsc`, `sortByRevenueDesc`, `sortByCreatedAt`.
- **Partie 7** : `updateCompanyById`.
- **Partie 8** : `getTotalRevenue`, `getAverageRevenue`, `countActiveCompanies`, `countCompaniesByCountry`.
