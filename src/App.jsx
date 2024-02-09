import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import AuthLogin from './components/login';
import AuthProfile from './authProfile';
import AuthLogout from './components/logout';

function App() {
  const [userName, setUserName] = useState('');

  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    const userFullName = credentialResponseDecoded.name;

    setUserName(userFullName);
  };

  const handleLogout = () => {
    setUserName('');
  };

  return (
    <div>
      {userName ? (
        <div>
          <p>Welcome, {userName}! Successful login.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      )}
      <AuthLogin /> 
      <AuthProfile />
      <AuthLogout />

    </div>
  );
}

export default App;
