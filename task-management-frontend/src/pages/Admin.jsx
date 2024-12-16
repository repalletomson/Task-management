import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import TaskForm from '../components/TaskForm';

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(''); // Filter state (e.g., "pending", "completed")

  const fetchTasks = async (filterStatus = '') => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tasks`, {
        params: { status: filterStatus }, // Send filter as query parameter
      });
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    fetchTasks(selectedFilter);
  };

  const createTask = async () => {
    const title = prompt('Enter Task Title:');
    const description = prompt('Enter Task Description:');
    if (!title || !description) return;

    try {
      const { data } = await axios.post('/tasks', { title, description });
      setTasks([...tasks, data]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={createTask}>Create Task</button>  
      <TaskForm />  
      <div>
        <label>Filter by Status: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
