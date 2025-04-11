// components/Auth/ForgotPassword.js
import React, { useState } from 'react';
import api from '../../services/api';
import '../../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
    console.log(email + " : EMAIL")
    //  await api.post('/auth/public/forgot-password', { email });

      const formData = new URLSearchParams();
      formData.append('email', email);
      await api.post('/auth/public/forgot-password', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Send Password Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
