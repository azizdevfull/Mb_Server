import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('role', response.data.role);
      window.location.reload();
      const isAdmin = Number(localStorage.getItem('role'));
      if (isAdmin === 1) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button type="submit">Login</button>
    </form>
    <div>
    <Link to="/register">Register</Link>
    </div>
    </div>
  );
}

export default Login;
