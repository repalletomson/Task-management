import React, { createContext, useState } from 'react';
import axios from 'axios';
import { register } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginHandler = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', credentials);
      setUser(response.data.user);
      console.log("logged in user in auth:", response.data.user);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  };

  const registerHandler = async (details) => {
    const data = await register(details);
    console.log("register in user in auth:", data);
    return data
  };

  return (
    <AuthContext.Provider value={{ user, loginHandler, registerHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
