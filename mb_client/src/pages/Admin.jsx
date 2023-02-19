import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const email = localStorage.getItem('email');

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8000/api/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      window.location.reload();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome, Admin</h1>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Admin;
