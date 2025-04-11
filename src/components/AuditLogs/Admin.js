import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from './AdminAreaSidebar';
import AuditLogs from './AdminAuditLogs';
import UserList from './UserList';
import UserDetails from './UserDetails';
import '../../styles/Admin.css';

const Admin = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:userId" element={<UserDetails />} />
          {/* Add other routes as necessary */}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
