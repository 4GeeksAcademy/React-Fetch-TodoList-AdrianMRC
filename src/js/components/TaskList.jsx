const TasksList = ({ tasks, onDelete, onToggle }) => (
  <ul className="tasks-container">
    {tasks.map((task) => (
      <li 
        key={task.id} 
        className={`task-item ${task.done ? 'done' : ''}`}
      >
        <input
          type="checkbox"
          checked={task.done ?? false}
          onChange={(e) => onToggle(task.id, e.target.checked)}
          aria-label={task.done ? 'Marcar como pendiente' : 'Marcar como completada'}
        />
        <span className="task-content">{task.label}</span>
        <button
          className="delete-button" 
          onClick={() => onDelete(task.id)}
          aria-label="Eliminar tarea"
        >
          ×
        </button>
      </li>
    ))}
  </ul>
);
  
  export default TasksList;