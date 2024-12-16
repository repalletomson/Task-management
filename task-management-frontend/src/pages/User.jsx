import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';


const socket = io('http://localhost:3000');  

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')  
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));


    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) => 
        prevTasks.map((task) => 
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });


    return () => {
      socket.off('taskUpdated');
    };
  }, []);


  const updateStatus = (taskId) => {
    if (!newStatus) return; 


    socket.emit('updateStatus', { taskId, status: newStatus });

  
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
        <label>Select Status:</label>
        <select onChange={(e) => setNewStatus(e.target.value)} value={newStatus}>
          <option value="">--Select Status--</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      <div>
        <h2>Tasks</h2>
        {tasks.map((task) => (
          <div key={task._id} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => updateStatus(task._id)}>Update Status</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
src/components/UserDashboard.tsx
