// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('JWT_TOKEN');
  const isAuthenticated = !!token; // Check if the token exists

  const handleLogout = () => {
    localStorage.removeItem('JWT_TOKEN');  // Updated to remove token from localStorage
    localStorage.removeItem('USER'); // Remove user details as well
    localStorage.removeItem('CSRF_TOKEN');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {isAuthenticated ? (
        <>
          <Link to="/notes">All Notes</Link>
          <Link to="/create-note">Create Note</Link>
          <Link to="/admin/auditlogs">Admin Area</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
