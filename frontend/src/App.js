import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';


function App() {
  const [refresh, setRefresh] = useState(false);

  const reloadTasks = () => setRefresh(!refresh);

  return (
    <div className="App">
      <h1>Mis Tareas</h1>
      <TaskForm onTaskCreated={reloadTasks} />
      <TaskList key={refresh} />
    </div>
  );
}

export default App;
