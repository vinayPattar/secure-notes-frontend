// components/Auth/ResetPassword.js
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const token = searchParams.get('token');
    try {
      //await api.post('/auth/public/reset-password', { token, newPassword });
      const formData = new URLSearchParams();
      formData.append('token', token);
      formData.append('newPassword', newPassword);
      await api.post('/auth/public/reset-password', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setMessage('Password reset successfully! You can now log in.');
    } catch (error) {
      setError('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
