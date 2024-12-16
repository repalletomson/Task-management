import axios from 'axios';
import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials.name,credentials.password);
  return response.data;
};

export const register = async (details) => {
  const response = await api.post('/auth/register', details);
  return response.data;
};
