// TodoListService.js
const baseUrl = 'https://playground.4geeks.com/todo';

const todoService = {
  createUser: async (userName) => {
    try {
      const response = await fetch(`${baseUrl}/users/${userName}`, {
        method: 'POST',
        headers: { 'accept': 'application/json' }
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Error creating user');
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  getTasks: async (userName) => {
    try {
      const response = await fetch(`${baseUrl}/todos/${userName}`);
      const data = await response.json();
      if (!response.ok) throw new Error('Error fetching tasks');
      return data;
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  },

  addTask: async (userName, taskText) => {
    try {
      const response = await fetch(`${baseUrl}/todos/${userName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: taskText,
          done: false
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error('Error adding task');
      return data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  deleteTask: async (userName, taskId) => {
    try {
      const response = await fetch(`${baseUrl}/todos/${userName}/${taskId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error deleting task');
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  clearAllTasks: async (userName) => {
    try {
      const response = await fetch(`${baseUrl}/todos/${userName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([])
      });
      
      if (!response.ok) throw new Error('Error clearing tasks');
      return true;
    } catch (error) {
      console.error('Error clearing tasks:', error);
      throw error;
    }
  }
};

export default todoService;