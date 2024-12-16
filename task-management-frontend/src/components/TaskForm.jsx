import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/tasks';

const TaskForm = ({ existingTask, onSubmitSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setStatus(existingTask.status);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, priority };
console.log(taskData)
    if (existingTask) {
      await updateTask(existingTask._id, taskData);
    } else {
      await createTask(taskData);
    }

    console.log('onSubmitSuccess:', onSubmitSuccess);
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">{existingTask ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
