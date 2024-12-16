import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { user, loginHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginHandler(credentials);
    console.log('Logged in user:', user);
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      console.error('Login failed or user not found');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete='current-password'
        />
        <button type="submit">Login</button>
        <p>Not registered yet? <Link to='register'>Register</Link></p>
      </form>
    </div>
  );
};

export default LoginForm;