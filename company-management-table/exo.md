# Exercice JavaScript : tableaux et objets

## Gestion simplifiée d’entreprises

## Contexte

On souhaite construire en JavaScript la logique de base d’un mini gestionnaire d’entreprises.

Chaque entreprise sera représentée par un **objet JavaScript**, et toutes les entreprises seront stockées dans un **tableau**.

L’objectif de cet exercice est de manipuler :

* les tableaux
* les objets
* les boucles
* les fonctions
* les méthodes usuelles de tableaux

Le travail se fait **en JavaScript uniquement**, sans HTML dans un premier temps.

---

## Données de départ

Vous disposez du tableau suivant :

```javascript
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
```

---

# Travail demandé

## Partie 1 : découverte des objets et du tableau

À partir du tableau `companies` :

1. Afficher dans la console le tableau complet.
2. Afficher le nom de la première entreprise.
3. Afficher l’email de la deuxième entreprise.
4. Afficher le statut de la troisième entreprise.
5. Parcourir le tableau et afficher pour chaque entreprise :

   * son nom
   * son pays
   * son revenu

---

## Partie 2 : création de fonctions simples

Créer les fonctions suivantes :

1. `displayCompanies()`

   * Affiche toutes les entreprises dans la console.

2. `addCompany(newCompany)`

   * Ajoute une nouvelle entreprise dans le tableau `companies`.

3. `findCompanyById(id)`

   * Retourne l’entreprise correspondant à l’identifiant donné.

4. `findCompanyByEmail(email)`

   * Retourne l’entreprise correspondant à l’email donné.

5. `deleteCompanyById(id)`

   * Supprime l’entreprise correspondant à l’identifiant donné.

---

## Partie 3 : contrôle d’unicité de l’email

Créer une fonction :

### `emailExists(email)`

Cette fonction doit :

* retourner `true` si l’email existe déjà dans le tableau
* retourner `false` sinon

La vérification doit être **insensible à la casse**.
Par exemple, `MARIA@alfreds.com` et `maria@alfreds.com` doivent être considérés comme identiques.

Ensuite, modifier la fonction `addCompany(newCompany)` pour :

* vérifier si l’email existe déjà
* empêcher l’ajout si l’email est déjà utilisé
* afficher un message d’erreur dans la console en cas de doublon

---

## Partie 4 : génération automatique de l’identifiant

Créer une fonction :

### `generateNextId()`

Cette fonction doit générer automatiquement le prochain identifiant.

Exemples :

* si le dernier identifiant est `"003"`, la fonction retourne `"004"`
* si le dernier identifiant est `"009"`, la fonction retourne `"010"`

Ensuite, modifier `addCompany(newCompany)` pour :

* ne plus demander d’identifiant dans l’objet à ajouter
* générer automatiquement l’identifiant avec `generateNextId()`

---

## Partie 5 : filtrage des entreprises

Créer les fonctions suivantes :

1. `getActiveCompanies()`

   * Retourne uniquement les entreprises actives (`status === true`)

2. `getInactiveCompanies()`

   * Retourne uniquement les entreprises inactives (`status === false`)

3. `getCompaniesByCountry(country)`

   * Retourne les entreprises appartenant au pays donné

4. `searchCompanies(keyword)`

   * Retourne les entreprises pour lesquelles le mot-clé apparaît dans au moins un des champs suivants :

     * `company`
     * `contact`
     * `email`
     * `country`

La recherche doit être insensible à la casse.

---

## Partie 6 : tri des entreprises

Créer les fonctions suivantes :

1. `sortByName()`

   * Trie les entreprises par ordre alphabétique sur le nom de l’entreprise

2. `sortByRevenueAsc()`

   * Trie les entreprises par revenu croissant

3. `sortByRevenueDesc()`

   * Trie les entreprises par revenu décroissant

4. `sortByCreatedAt()`

   * Trie les entreprises par date de création

---

## Partie 7 : mise à jour d’une entreprise

Créer une fonction :

### `updateCompanyById(id, updatedData)`

Cette fonction doit :

* rechercher l’entreprise correspondant à l’identifiant donné
* modifier uniquement les champs présents dans `updatedData`
* conserver les autres champs inchangés

Exemple d’utilisation :

```javascript
updateCompanyById("002", {
  contact: "Nouveau Contact",
  revenue: 250,
  status: true
});
```

---

## Partie 8 : statistiques simples

Créer les fonctions suivantes :

1. `getTotalRevenue()`

   * Retourne la somme totale des revenus de toutes les entreprises

2. `getAverageRevenue()`

   * Retourne la moyenne des revenus

3. `countActiveCompanies()`

   * Retourne le nombre d’entreprises actives

4. `countCompaniesByCountry(country)`

   * Retourne le nombre d’entreprises appartenant au pays donné

---

# Consignes

* Utiliser uniquement **JavaScript**
* Travailler d’abord dans un fichier `.js`
* Tester chaque fonction avec `console.log(...)`
* Organiser le code proprement
* Utiliser des noms de variables explicites
* Éviter de dupliquer inutilement le code

---

# Résultat attendu

À la fin de l’exercice, le programme doit permettre de :

* lire et parcourir un tableau d’objets
* ajouter une entreprise
* vérifier qu’un email est unique
* générer automatiquement un identifiant
* rechercher, filtrer et trier les données
* mettre à jour une entreprise
* calculer quelques statistiques simples

---

# Conseil de méthode

Il est conseillé de traiter les parties dans l’ordre, car chaque partie prépare la suivante :

1. lecture des données
2. ajout et suppression
3. validation
4. génération d’identifiant
5. filtrage
6. tri
7. mise à jour
8. statistiques

---
