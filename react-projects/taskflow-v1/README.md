# TaskFlow v1 (en cours)

Deuxième étape du projet : on introduit le **state local** avec `useState`,
puis on **branche** un premier événement (`onClick`) et on fait **descendre
des fonctions via les props** pour que les enfants demandent au parent de
modifier le state. Ce snapshot reflète l'état de l'application après
l'ajout du **changement de statut** et du **panneau de détail**.

> ⚠️ Le composant `TaskStats` est affiché mais **alimenté par un state vide**
> (`statsSummary` initialisé à zéro). Le calcul dérivé du state `tasks` (via
> `filter`/`reduce`) sera vu juste après — c'est le prochain palier.

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
- `setTasks` : la fonction pour le **modifier**.

À chaque appel à `setTasks(...)`, React :
1. mémorise la nouvelle valeur,
2. **ré-exécute la fonction `App`**,
3. récupère le nouveau JSX et met à jour le DOM.

Dans cette version, `App` détient **trois** states :

```jsx
const [tasks, setTasks] = useState(initialTasks);
const [selectedTask, setSelectedTask] = useState(null);
const [statsSummary, setStatsSummary] = useState({
  total: 0, total_done: 0, total_highPriority: 0, total_pending: 0
});
```

- `tasks` : la liste des tâches, modifiée quand on bascule un statut ;
- `selectedTask` : la tâche affichée dans le panneau de détail (`null` tant
  que l'utilisateur n'a rien sélectionné) ;
- `statsSummary` : agrégat affiché par `TaskStats`. Pour l'instant, il reste
  figé à zéro — on le calculera à partir de `tasks` dans la suite.

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
| `TaskStats` | Affiche les compteurs (total, terminées, en cours, priorité haute) | branché, mais alimenté par un state vide |
| `TaskList` | Itère sur `tasks` et rend un `TaskItem` | passe `onToggle` et `onSelect` aux enfants |
| `TaskItem` | Affiche une tâche + boutons **Terminer/Annuler** et **Voir détail** | les deux boutons sont câblés |
| `Badge` / `PriorityBadge` | Petites pastilles réutilisables (statut, priorité, catégorie) | nouveaux, illustrent la composition |
| `SelectedTaskPanel` | Détail de la tâche sélectionnée, ou message d'invitation si `null` | nouveau, rendu conditionnel |
| `Footer` | Pied de page | inchangé |
| `App` | Compose le tout, **détient les states et les handlers** | possède `useState` × 3 |

> Le composant `ActionsPanel` (bouton de réinitialisation global) sera
> introduit plus tard.

### 7. Brancher un événement : `onClick` + handler descendu via les props

Le pattern central de la v1 :

```jsx
// dans App
function handleToggleTask(taskId) {
  const updatedTasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, status: task.status === "pending" ? "done" : "pending" }
      : task
  );
  setTasks(updatedTasks);
  if (selectedTask && selectedTask.id === taskId) {
    setSelectedTask(updatedTasks.find((t) => t.id === taskId));
  }
}

<TaskList tasks={tasks} onToggle={handleToggleTask} onSelect={handleSelectTask} />
```

```jsx
// dans TaskItem
<button className="action-btn" onClick={() => onToggle(task.id)}>
  {task.status === "done" ? "Annuler" : "Terminer"}
</button>
```

Points à retenir :
- `onClick={() => onToggle(task.id)}` → on passe une **fonction** à `onClick`,
  pas le résultat d'un appel. Si on écrivait `onClick={onToggle(task.id)}`,
  React appellerait la fonction **pendant le rendu**.
- Les enfants ne modifient **jamais** le state directement : ils appellent une
  fonction reçue via les props. C'est le **flux unidirectionnel** : la donnée
  descend, les événements remontent.
- `setTasks(updatedTasks)` reçoit un **nouveau tableau**. On ne mute pas
  `tasks` en place — `.map()` renvoie une nouvelle référence, ce qui permet à
  React de détecter le changement.
- Le bloc `if (selectedTask && selectedTask.id === taskId)` resynchronise la
  tâche affichée dans le panneau de détail après un changement de statut,
  pour que les deux states restent cohérents.

### 8. Immutabilité : la règle d'or
On retrouve le même principe dans `handleToggleTask` :

- **`.map()`** crée un nouveau tableau (on ne touche pas à l'ancien) ;
- **`{ ...task, status: ... }`** crée un nouvel objet pour la tâche modifiée
  (les autres tâches gardent leur référence d'origine).

C'est la condition pour que React déclenche un nouveau rendu et reste
performant.

### 9. Anatomie de `TaskItem` en v1
La structure visuelle évolue par rapport à v0 : deux boutons, et trois
badges (statut, priorité, catégorie) qui réutilisent le même composant
`Badge` via `PriorityBadge` et un usage direct.

```jsx
function TaskItem({ task, onToggle, onSelect }) {
  return (
    <li className="task-item">
      <div>
        <span className={task.status === "done" ? "done" : "not-done"}>
          {task.title}
        </span>
      </div>

      <div className="task-actions">
        <span className={task.status === "done" ? "badge success" : "badge pending"}>
          {task.status === "done" ? "Terminée" : "En cours"}
        </span>

        <PriorityBadge priority={task.priority} />
        <Badge text={task.category} type="dark" />

        <button className="action-btn" onClick={() => onToggle(task.id)}>
          {task.status === "done" ? "Annuler" : "Terminer"}
        </button>
        <button className="secondary-btn" onClick={() => onSelect(task.id)}>
          Voir détail
        </button>
      </div>
    </li>
  );
}
```

À noter : la donnée d'une tâche s'est **enrichie** depuis la v0 — chaque
tâche porte maintenant `description`, `priority` et `category`, exploitées
par les badges et par le panneau de détail. Le champ `done: true/false` a
laissé place à `status: "pending" | "done"` (plus extensible).

### 10. Ce qui n'est PAS encore branché
Volontairement laissé pour la suite du cours :
- le **calcul** de `statsSummary` à partir de `tasks` (via `filter`/`reduce`
  ou plus simplement directement dans le rendu sans state dédié) ;
- le bouton **Réinitialiser** et le composant `ActionsPanel` ;
- la discussion sur le « state dérivé » : faut-il vraiment un `useState`
  pour `statsSummary` ou peut-on le recalculer à chaque rendu ?

## Lancer cette version

```bash
npm install
npm run dev
```

## Fichiers importants

- `index.html` : page hôte avec `<div id="root">`
- `src/main.jsx` : point d'entrée, monte `<App />` dans le DOM
- `src/App.jsx` : tous les composants de la v1 + les `useState` et handlers de `App`
- `src/App.css` : styles (`.task-actions`, `.action-btn`, `.secondary-btn`, `.stats-grid`, badges...)
