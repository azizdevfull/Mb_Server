import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Admin from '../pages/Admin';

function AppRoutes() {
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    const isAdmin = Number(localStorage.getItem('role'));


  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={isAdmin === 1 ? <Admin /> : <Navigate to="/home" />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
    </Routes>
  );
}

export default AppRoutes;
