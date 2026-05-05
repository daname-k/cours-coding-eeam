# TaskFlow v1 (en cours)

Deuxième étape du projet : on introduit le **state local** avec `useState`. Le
cours n'est pas terminé sur cette version — les **événements** et les
**modifications du state** seront vus dans la suite. Ce snapshot reflète l'état
de l'application au point où nous nous sommes arrêtés.

> ⚠️ Le bouton **Terminer / Annuler** est déjà visible sur chaque tâche, mais
> il n'est **pas encore branché**. Cliquer dessus déclenche une erreur en
> console : c'est normal, c'est le point de départ de la prochaine séance.

## Mini résumé de cours

### 1. Rappel du chemin parcouru
La v0 nous a permis de poser :
- le point d'entrée React (`createRoot`, `<React.StrictMode>`),
- le JSX,
- les **composants fonctionnels**,
- les **props**,
- le rendu de liste avec `.map()` et la prop `key`,
- le rendu conditionnel via le ternaire.

Tout cela reste vrai en v1 — on s'appuie dessus.

### 2. Le problème que `useState` vient résoudre
En v0, le tableau `tasks` était une simple `const` déclarée en dehors du
composant. Si on essayait de le modifier, **rien ne se passait à l'écran** :
React n'a aucun moyen de savoir que la donnée a changé, donc il ne re-rend
pas. On a besoin d'un mécanisme pour :
1. **mémoriser** une valeur entre les rendus,
2. **prévenir React** quand cette valeur change, pour qu'il refasse le rendu.

C'est exactement ce que fournit `useState`.

### 3. Importer `useState`
`useState` est un **hook** fourni par React. On l'importe nommément :

```js
import { useState } from "react";
```

Règles à connaître sur les hooks (on en verra d'autres plus tard) :
- on les appelle uniquement **à l'intérieur d'un composant** (ou d'un autre
  hook) ;
- on les appelle **au tout début du corps du composant**, jamais dans un `if`,
  une boucle, ou après un `return`.

### 4. Déclarer un state
`useState(valeurInitiale)` renvoie un **tableau de deux éléments** :

```jsx
const [tasks, setTasks] = useState(initialTasks);
```

On le **déstructure** systématiquement :
- `tasks` : la valeur courante du state à ce rendu ;
- `setTasks` : la fonction pour le **modifier** (on l'utilisera plus tard).

À chaque appel à `setTasks(...)`, React :
1. mémorise la nouvelle valeur,
2. **ré-exécute la fonction `App`**,
3. récupère le nouveau JSX et met à jour le DOM.

> Pour l'instant, dans ce snapshot, on a juste **lu** `tasks`. On déclenchera
> les mises à jour quand on branchera les boutons.

### 5. Pourquoi extraire `initialTasks` hors du composant ?

```js
const initialTasks = [ ... ];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  ...
}
```

Deux raisons pédagogiques :
- la valeur passée à `useState` n'est utilisée **qu'au premier rendu** ;
  inutile de la recréer à chaque appel de `App` ;
- on garde une **référence stable** vers la liste de départ pour pouvoir
  proposer plus tard une fonction *Réinitialiser* qui remet `tasks` à
  `initialTasks`.

### 6. Composants présents dans cette version

| Composant | Rôle | Statut |
|---|---|---|
| `Header` | Titre et baseline | inchangé depuis v0 |
| `WelcomeCard` | Message d'accueil personnalisé via props | inchangé |
| `TaskList` | Itère sur `tasks` et rend un `TaskItem` | inchangé |
| `TaskItem` | Affichage d'une tâche **+ bouton Terminer / Annuler** | bouton non câblé |
| `Footer` | Pied de page | inchangé |
| `App` | Compose le tout, **détient le state `tasks`** | nouveau : `useState` |

> Les composants `TaskStats` et `ActionsPanel` (statistiques, bouton de reset)
> seront introduits plus tard, en même temps que les actions qui leur donnent
> du sens.

### 7. Anatomie de `TaskItem` en v1
La structure visuelle évolue légèrement par rapport à v0 : on prépare la place
pour le bouton qu'on branchera ensuite.

```jsx
function TaskItem({ task, onToggle }) {
  return (
    <li className="task-item">
      <div>
        <span className={task.done ? "done" : "not-done"}>{task.title}</span>
      </div>

      <div className="task-actions">
        <span className={task.done ? "badge success" : "badge pending"}>
          {task.done ? "Terminée" : "En cours"}
        </span>

        <button className="action-btn" onClick={() => onToggle(task.id)}>
          {task.done ? "Annuler" : "Terminer"}
        </button>
      </div>
    </li>
  );
}
```

Points à retenir :
- `TaskItem` reçoit désormais **deux props** : `task` (la donnée) et
  `onToggle` (la **fonction** à appeler au clic).
- `onClick={() => onToggle(task.id)}` → on passe une **fonction** à `onClick`,
  pas le résultat d'un appel. C'est le pattern qu'on étudiera quand on verra
  les événements.
- La donnée descend du parent (`tasks` dans `App`) vers les enfants via les
  props : c'est le **flux unidirectionnel** typique de React.

### 8. Ce qui n'est PAS encore branché
Volontairement laissé pour la suite du cours :
- le **handler `handleToggle`** dans `App` qui modifiera `tasks` via
  `setTasks` (immutabilité, `.map()` qui renvoie un nouveau tableau...) ;
- les statistiques dérivées du state (`tasks.filter(...).length`) et le
  composant `TaskStats` ;
- le bouton **Réinitialiser** et le composant `ActionsPanel` ;
- la règle d'or de React : **ne jamais muter** le tableau ou l'objet en place,
  toujours en produire une nouvelle version.

## Lancer cette version

```bash
npm install
npm run dev
```

## Fichiers importants

- `index.html` : page hôte avec `<div id="root">`
- `src/main.jsx` : point d'entrée, monte `<App />` dans le DOM
- `src/App.jsx` : tous les composants de la v1 + le `useState` de `App`
- `src/App.css` : styles (nouveaux : `.task-actions`, `.action-btn`, `.reset-btn`)
