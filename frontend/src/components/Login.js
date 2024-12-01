import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Correct usage of navigate hook in React Router v6

  // Check if user is already authenticated and redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/employee-list'); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      
      // Store token in localStorage and redirect to dashboard
      localStorage.setItem('authToken', response.data.token);
      console.log('Token stored:', localStorage.getItem('authToken')); 
      
      // Use navigate() for redirect
      navigate('/employee-list');
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
