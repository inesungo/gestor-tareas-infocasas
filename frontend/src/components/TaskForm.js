import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TaskForm.css';

const TaskForm = ({ onTaskCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '') return;

    axios.post('http://localhost:8000/api/tasks', {
      name: name,
    })
    .then(response => {
      onTaskCreated();  
      setName('');      
    })
    .catch(error => {
      console.error('Error al crear la tarea:', error);
    });
  };

  return (
    <div className="task-form">
      <h2>➕ Agregar Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="task-form-content">
        <input
          type="text"
          placeholder="Escribe tu nueva tarea..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default TaskForm;
