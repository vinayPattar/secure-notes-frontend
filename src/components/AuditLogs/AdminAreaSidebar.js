// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/admin/audit-logs">Audit Logs</Link>
        </li>
        <li>
          <Link to="/admin/users">All Users</Link>
        </li>
        <li>
          <Link to="/admin/groups">All Groups</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
