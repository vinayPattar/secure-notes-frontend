import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const isAuthenticated = localStorage.getItem('JWT_TOKEN') !== null;
  const user = JSON.parse(localStorage.getItem('USER')); // Assuming user details are stored in localStorage

  console.log('User from local storage:', user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && (!user || !user.roles || !roles.some(role => user.roles.includes(role)))) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute;
