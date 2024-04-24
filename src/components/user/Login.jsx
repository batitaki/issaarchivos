import React, { useState, useEffect } from 'react';
import { loginUser } from '../../services/fetchUsers';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      setLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loggedIn) {
    return <Navigate to="/issaarchivos/" />;
  }

  return (
    <div className='my-container-form'>
      <h2 className="my-label-form">Login</h2>
      {error && <p>{error}</p>}
      <input
        className='my-input-form'
        type="text"
        placeholder="Username"
        name='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='my-input-form'
        type="password"
        placeholder="Password"
        name='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='my-button-form' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
