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
  {
    id: 1,
    title: "Réviser JSX",
    description: "Revoir la syntaxe JSX, l'utilisation des accolades pour les expressions JS, et les attributs comme className et htmlFor.",
    status: "pending",
    priority: "High",
    category: "React"
  },
  {
    id: 2,
    title: "Comprendre les props",
    description: "Apprendre à passer des données d'un composant parent à un composant enfant (read-only).",
    status: "done",
    priority: "Medium",
    category: "React"
  },
  {
    id: 3,
    title: "Créer des composants",
    description: "Mettre en pratique les composants fonctionnels et l'utilisation de hooks de base comme useState.",
    status: "pending",
    priority: "Low",
    category: "React"
  },
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



function SelectedTaskPanel({ selectedTask }) {
  return (
    <section className="card">
      <h2>Détail de la tâche</h2>
      {selectedTask ? (
        <div className="details-box">
          <p><strong>Titre :</strong> {selectedTask.title}</p>
          <p><strong>Statut :</strong> {selectedTask.status === "done" ? "Terminée" : "En cours"}</p>
          <p><strong>Priorité :</strong> {selectedTask.priority}</p>
          <p><strong>Catégorie :</strong> {selectedTask.category}</p>
          <p>{selectedTask.description}</p>
        </div>
      ) : <p>Sélectionne une tâche pour voir ses détails.</p>}
    </section>
  );
}

function TaskStats({tasks}) {
  const total = tasks.length 
  const totalDone = tasks.filter(t => t.status ==="done").length
  const totalHighPriority = tasks.filter(t => t.priority === "High").length
  const totalPending = total - totalDone
  return (
    <section className="card stats-grid">
      <div className="stat-box"><p className="stat-label">Total</p><h3>{total}</h3></div>
      <div className="stat-box"><p className="stat-label">Terminées</p><h3>{totalDone}</h3></div>
      <div className="stat-box"><p className="stat-label">En cours</p><h3>{totalPending}</h3></div>
      <div className="stat-box"><p className="stat-label">Priorité haute</p><h3>{totalHighPriority}</h3></div>
    </section>
  );
}


function TaskForm({onAdd}){

  const [title, setTitle] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    let formatedTitle = title.trim()
    if(!formatedTitle) return

    onAdd({title: formatedTitle})
    
  }

  return (
    <form  className="card" onSubmit={handleSubmit}>
      <h2> Nouvelle tâche</h2>

      <input 
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Titre de la tâche"/>
      <button type="submit">Ajouter</button>

    </form>
  )


}



function PriorityBadge({ priority }) {
  let className = "neutral";
  if (priority === "High") className = "danger";
  if (priority === "Medium") className = "warning";
  if (priority === "Low") className = "info";
  return <Badge text={priority} type={className} />;
}



function Badge({ text, type }) {
  return <span className={`badge ${type}`}>{text}</span>;
}


/*
  Une tâche unitaire.
  Quand on clique sur le bouton, on appelle la fonction reçue via props.
*/
function TaskItem({ task, onToggle, onSelect }) {
  return (
    <li className="task-item">
      <div>
        <span className={task.status === "done" ? "done" : "not-done"}>{task.title}</span>
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

function TaskList({ tasks, onToggle, onSelect }) {
  return (
    <section className="card">
      <h2>Liste des tâches</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onSelect={onSelect} />
        ))}
      </ul>
    </section>
  );
}


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
  const [selectedTask, setSelectedTask] = useState(null)


  function handleToggleTask(taskId) {
    const updatedTasks = tasks.map((task) => task.id === taskId ? { ...task, status: task.status === 'pending' ? 'done' : 'pending' } : task)
    setTasks(updatedTasks)
    if (selectedTask && selectedTask.id === taskId) {
      const task = updatedTasks.find((task) => task.id === taskId)
      setSelectedTask(task)
    }
  }


  function handleSelectTask(taskId) {
    const task = tasks.find((task) => task.id === taskId)
    setSelectedTask(task)
  }

  function handleResetTasks(){
    setTasks(initialTasks)
    setSelectedTask(null)

  }


  function handleAddTask({title}){
    const newTask = {
      id: Math.max(0, ...tasks.map(t=> t.id)) + 1,
      title,
      description: "",
      status: "pending",
      priority: "High",
      category: "React"
    }

    setTasks([...tasks, newTask])


  }

  return (
    <main className="container">
      <Header />
      <WelcomeCard
        studentName="Daname"
        courseName="Frontend moderne avec React.js"
      />
      <TaskStats tasks={tasks}/>
      <TaskForm onAdd={handleAddTask}/>
      <TaskList tasks={tasks} onToggle={handleToggleTask} onSelect={handleSelectTask} />
      <SelectedTaskPanel selectedTask={selectedTask} />
      <ActionsPanel onReset={handleResetTasks}/>
      <Footer />
    </main>
  );
}

export default App;
