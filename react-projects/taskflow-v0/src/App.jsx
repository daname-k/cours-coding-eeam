// App.jsx
// Version v0
// Objectif : découvrir React avec JSX, composants et props

import "./App.css";

/*
  Données statiques pour commencer.
  Ici, on ne gère pas encore d'état avec useState.
  On veut juste apprendre à afficher des données dans des composants.
*/
const tasks = [
  { id: 1, title: "Réviser JSX", done: false },
  { id: 2, title: "Comprendre les props", done: true },
  { id: 3, title: "Créer des composants", done: false },
];

/*
  Composant Header
  Rôle : afficher le titre principal de l'application
*/
function Header() {
  return (
    <header className="header">
      <h1>TaskFlow</h1>
      <p>Mon premier projet React évolutif</p>
    </header>
  );
}

/*
  Composant WelcomeCard
  Rôle : afficher un petit message d'introduction
  On reçoit des informations via les props
*/
function WelcomeCard({ studentName, courseName }) {
  return (
    <section className="card">
      <h2>Bienvenue {studentName} 👋</h2>
      <p>
        Tu commences maintenant le module <strong>{courseName}</strong>.
      </p>
      <p>
        Cette version v0 sert à comprendre comment découper une interface en
        composants React simples.
      </p>
    </section>
  );
}

/*
  Composant TaskItem
  Rôle : afficher une tâche unique
  On reçoit une tâche via la prop "task"
*/
function TaskItem({ task }) {
  return (
    <li className="task-item">
      <span className={task.done ? "done" : "not-done"}>{task.title}</span>
      <span className={task.done ? "badge success" : "badge pending"}>
        {task.done ? "Terminée" : "En cours"}
      </span>
    </li>
  );
}

/*
  Composant TaskList
  Rôle : afficher toute la liste des tâches
  On reçoit un tableau de tâches via les props
*/
function TaskList({ tasks }) {
  return (
    <section className="card">
      <h2>Liste des tâches</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}

/*
  Composant Footer
  Rôle : terminer proprement la page
*/
function Footer() {
  return (
    <footer className="footer">
      <p>v0 — JSX, composants, props</p>
    </footer>
  );
}

/*
  Composant principal App
  C'est lui qui assemble toute l'interface
*/
function App() {
  return (
    <main className="container">
      <Header />

      <WelcomeCard
        studentName="Daname"
        courseName="Frontend moderne avec React.js"
      />

      <TaskList tasks={tasks} />

      <Footer />
    </main>
  );
}

export default App;
