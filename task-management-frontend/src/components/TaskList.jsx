import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/tasks';
import TaskForm from './TaskForm';
import {Link} from 'react-router-dom'
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      console.log("Fetched tasks:", data);
      setTasks(data.tasks);
      console.log(data)
    };
    loadTasks();
  }, []);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSubmitSuccess = () => {
    setEditingTask(null);
    fetchTasks().then(data => setTasks(data));
    console.log(tasks)
  };
  return (
    <>
      <h1>Task List</h1>
      <ul>
        {Array.isArray(tasks) && tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Priority: {task.priority}</span>
            <section>Status:{task.status}</section>
            <button onClick={() => handleEditTask(task)}>Edit</button>
          </li>
        ))}
      </ul> 
      <TaskForm existingTask={editingTask}  onSubmitSuccess={handleSubmitSuccess} />

      <Link to="/">Logout</Link>
    </>
  );
};
export default TaskList;
