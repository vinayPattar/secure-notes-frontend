import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Auth.css';
import { jwtDecode } from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: Verify 2FA
  const [jwtToken, setJwtToken] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/public/signin', { username, password });
      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);
        if (decodedToken.is2faEnabled) {
          setStep(2); // Move to 2FA verification step
        } else {
          handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        }
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles.split(',')
    };
    localStorage.setItem('JWT_TOKEN', token);
    localStorage.setItem('USER', JSON.stringify(user));
    navigate('/notes');
  };

  const handleVerify2FA = async () => {
    try {
      console.log(code + " : " + jwtToken);
      const formData = new URLSearchParams();
      formData.append('code', code);
      formData.append('jwtToken', jwtToken);

      await api.post('/auth/public/verify-2fa-login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const decodedToken = jwtDecode(jwtToken);
      handleSuccessfulLogin(jwtToken, decodedToken);
    } catch (error) {
      console.error('2FA verification error', error);
      setError('Invalid 2FA code. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      {step === 1 && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>

          <div className="oauth-buttons">
            <a href={`${apiUrl}/oauth2/authorization/google`}>Login with Google</a>
            <a href={`${apiUrl}/oauth2/authorization/github`}>Login with GitHub</a>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Verify 2FA</h2>
          <input
            type="text"
            placeholder="Enter 2FA code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleVerify2FA}>Verify 2FA</button>
        </>
      )}
      <a href='/signup'>Create a new account</a><br />
      <a href='/forgot-password'>Forgot Password</a>
    </div>
  );
};

export default Login;
