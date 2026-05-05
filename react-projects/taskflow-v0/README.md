# TaskFlow v0

Première étape du projet : on découvre les **briques de base de React** sans
encore toucher à la notion d'état (`useState`) ni aux événements. L'application
affiche un en-tête, une carte de bienvenue et une liste de tâches statiques.

## Mini résumé de cours

### 1. Point d'entrée et arbre de composants
- `index.html` contient juste une balise `<div id="root"></div>` et charge
  `src/main.jsx` en module ES.
- `src/main.jsx` utilise `createRoot(...).render(<App />)` : c'est React qui
  prend le contrôle du DOM à partir de cette racine.
- `<React.StrictMode>` enveloppe l'app pour activer des vérifications
  supplémentaires en développement.

### 2. JSX
- Le JSX, c'est du HTML directement écrit dans du JavaScript. Le bundler (Vite)
  le transforme en appels `React.createElement` au build.
- Différences à retenir par rapport au HTML :
  - `class` → `className`
  - les expressions JS s'écrivent entre accolades : `{task.title}`
  - tout attribut dynamique se calcule en JS : `className={task.done ? "done" : "not-done"}`

### 3. Composants fonctionnels
La v0 introduit cinq composants, chacun étant une simple fonction qui renvoie
du JSX :

| Composant | Rôle |
|---|---|
| `Header` | Titre principal de l'application |
| `WelcomeCard` | Message d'accueil personnalisé |
| `TaskItem` | Affichage d'**une** tâche |
| `TaskList` | Itère sur les tâches et rend un `TaskItem` par élément |
| `Footer` | Pied de page |
| `App` | Compose tous les composants ci-dessus |

Un composant React = une fonction qui commence par une **majuscule** et
retourne du JSX.

### 4. Props
Les props sont les "paramètres" d'un composant. On les passe comme des
attributs JSX et on les récupère par déstructuration :

```jsx
<WelcomeCard studentName="Daname" courseName="Frontend moderne avec React.js" />

function WelcomeCard({ studentName, courseName }) { ... }
```

Les props peuvent transporter n'importe quel type : chaînes, nombres, booléens,
objets, **et même des tableaux entiers** (cf. `tasks` passé à `TaskList`).

### 5. Rendu d'une liste avec `.map()`
Pour afficher un tableau on le transforme en tableau de JSX avec `.map()` :

```jsx
{tasks.map((task) => (
  <TaskItem key={task.id} task={task} />
))}
```

Points clés :
- chaque élément rendu dans une liste doit avoir une prop **`key` unique**
  (ici `task.id`) pour aider React à suivre les éléments d'un rendu à l'autre ;
- on choisit une `key` stable (l'index du tableau est à éviter dès que la
  liste peut changer).

### 6. Rendu conditionnel
Pas de `if` dans le JSX, mais on peut utiliser l'opérateur ternaire :

```jsx
<span className={task.done ? "done" : "not-done"}>{task.title}</span>
<span className={task.done ? "badge success" : "badge pending"}>
  {task.done ? "Terminée" : "En cours"}
</span>
```

### 7. Données statiques
Les tâches sont déclarées **en dehors du composant**, en haut du fichier :

```js
const tasks = [
  { id: 1, title: "Réviser JSX", done: false },
  ...
];
```

Pas encore de `useState` : à ce stade l'interface ne change jamais après le
premier rendu. C'est le point de départ qu'on fera évoluer dans les versions
suivantes.

### 8. Styles
Le CSS est importé une seule fois dans `App.jsx` :

```js
import "./App.css";
```

Vite l'injecte dans la page, puis on applique les classes via `className`.

## Ce qui n'est PAS encore abordé en v0
Volontairement laissé pour les prochaines versions :
- `useState` et l'état local
- gestionnaires d'événements (`onClick`, `onChange`...)
- formulaires contrôlés
- `useEffect` et effets de bord
- communication enfant → parent par callbacks
- découpage en plusieurs fichiers / dossier `components/`

## Lancer cette version

```bash
npm install
npm run dev
```

## Fichiers importants

- `index.html` : page hôte avec `<div id="root">`
- `src/main.jsx` : point d'entrée, monte `<App />` dans le DOM
- `src/App.jsx` : tous les composants de la v0
- `src/App.css` : styles
