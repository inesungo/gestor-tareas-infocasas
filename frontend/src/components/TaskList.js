import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TaskList.css';
import { FaSave, FaTimes, FaEdit, FaTrashAlt, FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';



const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 7;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:8000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error al obtener las tareas:', error));
  };

  const deleteTask = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8000/api/tasks/${id}`)
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
          Swal.fire('Eliminada', 'La tarea fue eliminada correctamente.', 'success');
        })
        .catch(error => {
          console.error('Error al eliminar la tarea:', error);
          Swal.fire('Error', 'No se pudo eliminar la tarea.', 'error');
        });
    }
  });
};


  const toggleCompleted = (task) => {
    axios.put(`http://localhost:8000/api/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    })
    .then(response => {
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    })
    .catch(error => console.error('Error al actualizar la tarea:', error));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditedName(task.name);
  };

  const saveEdit = (task) => {
    axios.put(`http://localhost:8000/api/tasks/${task.id}`, {
      ...task,
      name: editedName,
    })
    .then(response => {
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
      setEditingId(null);
      setEditedName('');
    })
    .catch(error => console.error('Error al editar la tarea:', error));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);

    const matchesSearch = task.name.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };


  return (
    <div className="task-list">
      <h2>Lista de Tareas</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />


      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} className="task-item">
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task)}
            />

            {editingId === task.id ? (
              <input
                className="task-edit-input"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <span className={`task-name ${task.completed ? 'completed' : ''}`}>
                {task.name}
              </span>
            )}

            <span className={`task-status ${task.completed ? 'completada' : 'pendiente'}`}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
          </div>

          <div className="task-actions">
            {editingId === task.id ? (
              <>
                <button onClick={() => saveEdit(task)}><FaSave /></button>
                <button onClick={() => setEditingId(null)}><FaTimes /></button>
              </>
            ) : (
              <>
                <button onClick={() => startEdit(task)}><FaEdit /></button>
                <button onClick={() => deleteTask(task.id)}><FaTrashAlt /></button>
              </>
            )}
          </div>
        </div>
      ))}
      
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            ◀ Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Siguiente ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
