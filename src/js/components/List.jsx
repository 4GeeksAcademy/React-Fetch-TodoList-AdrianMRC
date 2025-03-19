import React, { useState, useEffect } from 'react';
import TasksList from './TaskList';
import todoService from '../Services/TodoListService';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [username, setUsername] = useState('');
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isUserVerified) {
            loadTasks();
        }
    }, [isUserVerified]);

    const handleVerifyUser = async () => {
        if (!username.trim()) {
            setError('Por favor ingresa un nombre de usuario');
            return;
        }
        try {
            setIsLoading(true);
            await todoService.createUser(username);
            setIsUserVerified(true);
            setError('');
        } catch (error) {
            if (error.message.includes('already exists')) {
                setIsUserVerified(true);
                setError('');
            } else {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const loadTasks = async () => {
        try {
            setIsLoading(true);
            const tasksData = await todoService.getTasks(username);
            setTasks(tasksData);
        } catch (error) {
            console.error('Error loading tasks:', error);
            if (error.message.includes('not found')) {
                setTasks([]);
            } else {
                setError('Error loading tasks');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTask = async (pressedKey) => {
        if (pressedKey === 'Enter' && newTask.trim()) {
            try {
                const newTaskData = await todoService.addTask(username, newTask.trim());
                setTasks(prev => [...prev, newTaskData]);
                setNewTask('');
            } catch (error) {
                console.error('Error adding task:', error);
                setError('Error adding task');
            }
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await todoService.deleteTask(username, taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Error deleting task');
        }
    };

    const handleClearAll = async () => {
        try {
          await todoService.clearAllTasks(username);
          setTasks([]);
        } catch (error) {
          console.error('Error clearing tasks:', error);
        }
      };

    return (
        <div className="container">
            <h1>Todo List</h1>
            {!isUserVerified ? (
                <div className="user-verification">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu nombre de usuario"
                        onKeyDown={(e) => e.key === 'Enter' && handleVerifyUser()}
                        disabled={isLoading}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button
                        onClick={handleVerifyUser}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verificando...' : 'Ingresar'}
                    </button>
                </div>
            ) : (
                <>
                    <div className="user-header">
                        <p>Usuario: <strong>{username}</strong></p>
                        <button
                            className="clear-all"
                            onClick={handleClearAll}
                            disabled={tasks.length === 0}
                        >
                            Limpiar Todo
                        </button>
                    </div>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => handleAddTask(e.key)}
                        placeholder="Escribe una tarea y presiona Enter"
                        disabled={isLoading}
                    />
                    {isLoading ? (
                        <p className="loading-message">Cargando tareas...</p>
                    ) : tasks.length === 0 ? (
                        <p className="empty-message">No hay tareas, añade una nueva</p>
                    ) : (
                        <TasksList
                            tasks={tasks}
                            onDelete={handleDeleteTask}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default TodoList;