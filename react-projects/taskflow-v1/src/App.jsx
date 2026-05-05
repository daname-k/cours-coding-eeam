// App.jsx
// Version v1 (en cours)
// Objectif : découvrir useState. Les événements seront branchés ensuite.
// Note : le bouton "Terminer / Annuler" est déjà visible mais pas encore
// fonctionnel — on le câblera dans la suite du cours.

import { useState } from "react";
import "./App.css";

/*
  Données initiales.
  On les place dans une constante pour pouvoir réutiliser
  la version de départ au moment du reset.
*/
const initialTasks = [
  { id: 1, title: "Réviser JSX", done: false },
  { id: 2, title: "Comprendre les props", done: true },
  { id: 3, title: "Créer des composants", done: false },
];

function Header() {
  return (
    <header className="header">
      <h1>TaskFlow</h1>
      <p>Mon premier projet React évolutif</p>
    </header>
  );
}

function WelcomeCard({ studentName, courseName }) {
  return (
    <section className="card">
      <h2>Bienvenue {studentName} 👋</h2>
      <p>
        Tu progresses maintenant dans le module <strong>{courseName}</strong>.
      </p>
      <p>
        En v1, nous découvrons comment React met à jour automatiquement
        l'interface grâce au state.
      </p>
    </section>
  );
}

/*
  Statistiques simples.
  Ce composant reçoit les valeurs déjà calculées par le parent.
*/
function TaskStats({ total, completed }) {
  return (
    <section className="card">
      <h2>Statistiques</h2>
      <p>Total des tâches : {total}</p>
      <p>Tâches terminées : {completed}</p>
      <p>Tâches restantes : {total - completed}</p>
    </section>
  );
}

/*
  Une tâche unitaire.
  Quand on clique sur le bouton, on appelle la fonction reçue via props.
*/
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

function TaskList({ tasks, onToggle }) {
  return (
    <section className="card">
      <h2>Liste des tâches</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} />
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>v1 (en cours) — useState introduit, événements à venir</p>
    </footer>
  );
}

function App() {
  /*
    useState permet à React de mémoriser une valeur.
    tasks représente l'état courant de nos tâches.
    setTasks permet de modifier cet état.
  */
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <main className="container">
      <Header />

      <WelcomeCard
        studentName="Daname"
        courseName="Frontend moderne avec React.js"
      />

      <TaskList tasks={tasks} onToggle={true} />

      <Footer />
    </main>
  );
}

export default App;
