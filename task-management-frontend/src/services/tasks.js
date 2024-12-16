import axios from 'axios';
import api from './api'
export const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/tasks');
    return response.data; 
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const createTask = async (task) => {
  const response = await axios.post('http://localhost:3000/tasks', {
    ...task,
    status: 'pending',
    priority: 'medium', 
  });
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.patch(`http://localhost:3000/tasks/${id}`, task);
  return response.data;
};
