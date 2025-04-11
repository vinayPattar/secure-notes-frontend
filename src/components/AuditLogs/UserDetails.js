import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Admin.css';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await api.get(`/admin/user/${userId}`);
      setUser(response.data);
      setSelectedRole(response.data.role?.roleName || '');
    } catch (err) {
      setError('Failed to fetch user details');
      console.error('Error fetching user details', err);
    }
  }, [userId]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await api.get('/admin/roles');
      setRoles(response.data);
    } catch (err) {
      setError('Failed to fetch roles');
      console.error('Error fetching roles', err);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
  }, [fetchUserDetails, fetchRoles]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleUpdateRole = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('userId', userId);
      formData.append('roleName', selectedRole);

      await api.put(`/admin/update-role`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      fetchUserDetails();
    } catch (err) {
      console.error('Error updating role', err);
    }
  };

  const handleSaveUsername = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('userId', userId);
      formData.append('username', newUsername);

      await api.put(`/admin/update-username`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setIsEditingUsername(false);
      setUsernameError('');
      fetchUserDetails();
    } catch (err) {
      setUsernameError('Failed to update username: ' + err.response.data);
      console.error('Error updating username', err);
    }
  };

  const handleSavePassword = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('userId', userId);
      formData.append('password', newPassword);

      await api.put(`/admin/update-password`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setIsEditingPassword(false);
      setPasswordError('');
      fetchUserDetails();
    } catch (err) {
      setPasswordError('Failed to update password: ' + err.response.data);
      console.error('Error updating password', err);
    }
  };

  const handleCheckboxChange = async (e, updateUrl) => {
    const { name, checked } = e.target;
    try {
      const formData = new URLSearchParams();
      formData.append('userId', userId);
      formData.append(name, checked);

      await api.put(updateUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      fetchUserDetails();
    } catch (err) {
      console.error(`Error updating ${name}:`, err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-details">
      {user ? (
        <>
          <h2>User Details For Admin Actions</h2>
          <div className="profile-info">
            <h3>Profile Information</h3>
            <div>
              <p>Username: 
                {isEditingUsername ? (
                  <>
                    <input 
                      type="text" 
                      value={newUsername} 
                      onChange={(e) => setNewUsername(e.target.value)} 
                    />
                    <button onClick={handleSaveUsername}>Save</button>
                    <button onClick={() => setIsEditingUsername(false)}>Cancel</button>
                    {usernameError && <p className="error">{usernameError}</p>}
                  </>
                ) : (
                  <>
                    {user.userName} 
                    <button onClick={() => {
                      setIsEditingUsername(true);
                      setNewUsername(user.userName);
                    }}>Edit</button>
                  </>
                )}
              </p>
            </div>
            <p>Email: {user.email}</p>
            <div>
              <p>Password: 
                {isEditingPassword ? (
                  <>
                    <input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                    <button onClick={handleSavePassword}>Save</button>
                    <button onClick={() => setIsEditingPassword(false)}>Cancel</button>
                    {passwordError && <p className="error">{passwordError}</p>}
                  </>
                ) : (
                  <button onClick={() => setIsEditingPassword(true)}>Edit</button>
                )}
              </p>
            </div>
          </div>
          <div className="admin-actions">
            <h3>Admin Actions</h3>
            <div>
              <label>Role: </label>
              <select value={selectedRole} onChange={handleRoleChange}>
                {roles.map(role => (
                  <option key={role.roleId} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </select>
              <button onClick={handleUpdateRole}>Update Role</button>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="lock" 
                  checked={!user.accountNonLocked} 
                  onChange={(e) => handleCheckboxChange(e, '/admin/update-lock-status')} 
                />
                Lock Account
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="expire" 
                  checked={!user.accountNonExpired} 
                  onChange={(e) => handleCheckboxChange(e, '/admin/update-expiry-status')} 
                />
                Account Expiry
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="enabled" 
                  checked={user.enabled} 
                  onChange={(e) => handleCheckboxChange(e, '/admin/update-enabled-status')} 
                />
                Account Enabled
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="credentialsExpire" 
                  checked={!user.credentialsNonExpired} 
                  onChange={(e) => handleCheckboxChange(e, '/admin/update-credentials-expiry-status')} 
                />
                Credentials Expired
              </label>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;
