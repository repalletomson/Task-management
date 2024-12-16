import axios from "axios";

const API_BASE_URL = "http://localhost:3000/tasks";

export const getTasks = (filters, page, limit) => {
  const query = new URLSearchParams({
    ...filters,
    page,
    limit,
  }).toString();
  return axios.get(`${API_BASE_URL}?${query}`);
};

export const createTask = (taskData) => axios.post(API_BASE_URL, taskData);
