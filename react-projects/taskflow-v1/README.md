# TaskFlow v1

Deuxième étape du projet. On y introduit le **state local** avec `useState`,
on branche les premiers **événements** (`onClick`, `onSubmit`), on apprend à
**dériver** une valeur d'un autre state plutôt que d'en créer un nouveau, et
on construit un premier **formulaire contrôlé** pour permettre à
l'utilisateur d'ajouter ses propres tâches.

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

Règles à connaître sur les hooks :
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

Dans cette version, `App` détient **deux** states :

```jsx
const [tasks, setTasks] = useState(initialTasks);
const [selectedTask, setSelectedTask] = useState(null);
```

- `tasks` : la liste des tâches, modifiée à chaque toggle, ajout, ou reset ;
- `selectedTask` : la tâche affichée dans le panneau de détail (`null` tant
  que l'utilisateur n'a rien sélectionné).

### 5. Pourquoi extraire `initialTasks` hors du composant ?

```js
const initialTasks = [ ... ];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  ...
}
```

Deux raisons :
- la valeur passée à `useState` n'est utilisée **qu'au premier rendu** ;
  inutile de la recréer à chaque appel de `App` ;
- on garde une **référence stable** vers la liste de départ. C'est ce qui
  rend le bouton **Réinitialiser** possible (`setTasks(initialTasks)`).

### 6. State dérivé : ne pas dupliquer ce qui peut être recalculé

Les statistiques (total, terminées, en cours, priorité haute) sont
**entièrement déterminées** par `tasks`. Pas besoin d'un `useState`
supplémentaire pour les stocker — un state séparé créerait deux sources de
vérité qui pourraient diverger.

Règle d'or :

> **Si une valeur peut être recalculée à partir d'un autre state, elle ne
> doit pas être un state.**

On recalcule à la volée à chaque rendu, dans `TaskStats` :

```jsx
function TaskStats({ tasks }) {
  const total = tasks.length;
  const totalDone = tasks.filter((t) => t.status === "done").length;
  const totalPending = total - totalDone;
  const totalHighPriority = tasks.filter((t) => t.priority === "High").length;
  // ... rendu des 4 stat-box ...
}
```

`App` n'a qu'à passer `tasks` ; `TaskStats` est autonome. Quand `tasks`
change, `App` se re-rend, `TaskStats` se re-rend, les compteurs sont à jour
gratuitement.

### 7. Composants présents dans cette version

| Composant | Rôle | Statut |
|---|---|---|
| `Header` | Titre et baseline | inchangé depuis v0 |
| `WelcomeCard` | Message d'accueil personnalisé via props | inchangé |
| `TaskStats` | Compteurs dérivés de `tasks` | recalculé à chaque rendu, pas de state |
| `TaskForm` | Formulaire contrôlé pour ajouter une tâche | nouveau (titre uniquement pour l'instant) |
| `TaskList` | Itère sur `tasks`, ou affiche un message si vide | gère le cas `length === 0` |
| `TaskItem` | Affiche une tâche + boutons **Terminer/Annuler** et **Voir détail** | les deux boutons sont câblés |
| `Badge` / `PriorityBadge` | Petites pastilles réutilisables (statut, priorité, catégorie) | composition simple |
| `SelectedTaskPanel` | Détail de la tâche sélectionnée, ou message d'invitation si `null` | rendu conditionnel |
| `ActionsPanel` | Bouton **Réinitialiser les tâches** | nouveau |
| `Footer` | Pied de page | inchangé |
| `App` | Compose le tout, **détient les states et les handlers** | possède `useState` × 2 |

### 8. Brancher un événement : `onClick` + handler descendu via les props

Le pattern central :

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
- Les enfants ne modifient **jamais** le state directement : ils appellent
  une fonction reçue via les props. C'est le **flux unidirectionnel** : la
  donnée descend, les événements remontent.
- `setTasks(updatedTasks)` reçoit un **nouveau tableau**. On ne mute pas
  `tasks` en place — `.map()` renvoie une nouvelle référence, ce qui permet
  à React de détecter le changement.
- Le bloc `if (selectedTask && selectedTask.id === taskId)` resynchronise la
  tâche affichée dans le panneau de détail après un changement de statut.

### 9. Immutabilité : la règle d'or
Même principe partout où on met à jour `tasks` :

- **`.map()`** crée un nouveau tableau pour modifier une tâche ;
- **`{ ...task, status: ... }`** crée un nouvel objet pour la tâche modifiée
  (les autres tâches gardent leur référence d'origine) ;
- **`[...tasks, newTask]`** ajoute une nouvelle tâche **sans** muter le
  tableau (jamais `.push`).

C'est la condition pour que React déclenche un nouveau rendu et reste
performant.

### 10. Anatomie de `TaskItem`

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

À noter : chaque tâche porte maintenant `description`, `priority` et
`category` en plus de `title`, exploités par les badges et par le panneau
de détail. Le champ `done: true/false` a laissé place à
`status: "pending" | "done"` (plus extensible pour la suite).

### 11. Garde « liste vide »

`TaskList` doit gérer le cas où il n'y a plus aucune tâche (pour l'instant
impossible à atteindre via l'UI, mais préparé pour la suite) :

```jsx
function TaskList({ tasks, onToggle, onSelect }) {
  return (
    <section className="card">
      <h2>Liste des tâches</h2>
      {tasks.length === 0 ? (
        <p>Aucune tâche disponible.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
```

### 12. Formulaire contrôlé : `TaskForm`

Pour ajouter une tâche, on introduit le pattern des **inputs contrôlés** :

```jsx
function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formatedTitle = title.trim();
    if (!formatedTitle) return;
    onAdd({ title: formatedTitle });
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Nouvelle tâche</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
```

Trois points :
- **`value={title}` + `onChange={(e) => setTitle(e.target.value)}`** : la
  paire indissociable d'un input contrôlé. React est la source de vérité,
  le DOM reflète le state.
- **`onSubmit` sur le `<form>` + `e.preventDefault()`** : on intercepte le
  comportement HTML par défaut (qui rechargerait la page). Marche au clic
  ET à `Enter`.
- **Validation simple** : `title.trim()` évite qu'on ajoute une tâche
  composée uniquement d'espaces.

Côté `App`, le handler crée la nouvelle tâche avec des valeurs par défaut
puis l'ajoute **immutablement** :

```jsx
function handleAddTask({ title }) {
  const newTask = {
    id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
    title,
    description: "",
    status: "pending",
    priority: "High",
    category: "React",
  };
  setTasks([...tasks, newTask]);
}
```

Génération d'id : on prend `max(0, ...existing) + 1`. Le `0` initial gère
le cas où `tasks` serait vide (sinon `Math.max()` renvoie `-Infinity`).

### 13. Bouton Réinitialiser

`ActionsPanel` permet de revenir à l'état initial :

```jsx
function ActionsPanel({ onReset }) {
  return (
    <section className="card">
      <h2>Actions</h2>
      <button className="reset-btn" onClick={onReset}>
        Réinitialiser les tâches
      </button>
    </section>
  );
}

// dans App
function handleResetTasks() {
  setTasks(initialTasks);
  setSelectedTask(null);
}
```

`setTasks(initialTasks)` ramène la liste à son état d'origine — possible
uniquement parce que `initialTasks` est défini hors du composant et garde
une référence stable. On désélectionne aussi pour éviter qu'une tâche déjà
modifiée reste affichée dans le panneau de détail.

### 14. Ce qui n'est PAS encore fait
Volontairement laissé pour la suite :
- les champs **priorité** et **catégorie** dans `TaskForm` (pour l'instant,
  toutes les nouvelles tâches sont créées en `priority: "High"` /
  `category: "React"` par défaut) ;
- les **filtres** (par statut, par priorité, par mot-clé) — nécessitera de
  remonter le state au parent commun (pattern *lift state up*) ;
- la **suppression** d'une tâche.

## Lancer cette version

```bash
npm install
npm run dev
```

## Fichiers importants

- `index.html` : page hôte avec `<div id="root">`
- `src/main.jsx` : point d'entrée, monte `<App />` dans le DOM
- `src/App.jsx` : tous les composants de la v1 + les `useState` et handlers de `App`
- `src/App.css` : styles (`.task-actions`, `.action-btn`, `.secondary-btn`, `.reset-btn`, `.stats-grid`, badges, `form.card` et `.details-box`)
