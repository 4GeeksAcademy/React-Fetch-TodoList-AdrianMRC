const baseUrl = 'https://playground.4geeks.com/todo';

const todoService = {
  createUser: async (userName) => {
    try {
      const response = await fetch(`${baseUrl}/users/${userName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getTasks: async (userName) => {
    try {
      const response = await fetch(`${baseUrl}/users/${userName}`);
      const data = await response.json();
      if (!response.ok) throw new Error('Error fetching tasks');
      return data.todos || [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  },
  addTask: async (userName, string) => {
    try {
      const response = await fetch(`${baseUrl}/todos/${userName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: string,
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
      const response = await fetch(`${baseUrl}/todos/${taskId}`, {
        method: 'DELETE',
        headers: { 'accept': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Error deleting task');
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
  clearAllTasks: async function(userName) {
    try {
      const tasks = await this.getTasks(userName);
      await Promise.all(
        tasks.map(task => 
          fetch(`${baseUrl}/todos/${task.id}`, {
            method: 'DELETE',
            headers: { 'accept': 'application/json' }
          })
        )
      );
      return true;
    } catch (error) {
      console.error('Error clearing tasks:', error);
      throw error;
    }
  }
};

export default todoService;