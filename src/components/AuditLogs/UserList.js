import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/getusers');
        const usersData = Array.isArray(response.data) ? response.data : [];
        setUsers(usersData);
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Account Created</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.accountCreated).toLocaleString()}</td>
              <td>{user.enabled ? 'Active' : 'Inactive'}</td>
              <td>
                <Link to={`/admin/users/${user.userId}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
