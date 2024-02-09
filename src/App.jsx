import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [userName, setUserName] = useState('');

  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    const userFullName = credentialResponseDecoded.name;

    setUserName(userFullName);
  };

  const handleLogout = () => {
    // Clear user-related information and reset the state
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
    </div>
  );
}

export default App;
