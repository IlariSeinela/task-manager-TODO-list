import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/tasks';

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post(API_URL, task);
      setTasks([response.data, ...tasks]);
    } catch (err) {
      setError('Error adding task');
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await axios.put(`${API_URL}/${id}`, updatedTask);
      setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
    } catch (err) {
      setError('Error updating task');
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Error deleting task');
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTask onAdd={addTask} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
};

export default App;