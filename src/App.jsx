import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ChainlitAPI, useChatSession } from "@chainlit/react-client";
import { Playground } from "./components/playground";
import LoginScreen from "./components/loginScreen"


const CHAINLIT_SERVER = "http://localhost:8000";

const apiClient = new ChainlitAPI(CHAINLIT_SERVER);

function App() {
  const [userName, setUserName] = useState('');
  const [idToken, setIdToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);
  const { connect, session } = useChatSession(); 

  // Handle successful login response
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const decodedToken = jwtDecode(credential); // Validate token on backend
      setUserName(decodedToken.name);
      setIdToken(credential);
      setVerificationStatus(null); // Reset verification status when a new token is received
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Send token to backend on change (consider alternative approaches)
  useEffect(() => {
    const sendTokenToBackend = async () => {
      if (idToken) {
        try {
          const response = await fetch('http://127.0.0.1:5000/receive_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: idToken }),
          });

          if (response.ok) {
            const result = await response.json();
            setVerificationStatus(result.message);
            
            // Connect to the chat session after the token is sent to the backend
            if (!session?.socket.connected) {
              connect({
                client: apiClient,
                userEnv: {}, 
                accessToken: `Bearer ${idToken}`,
              });
            }
            
            console.log('Token sent successfully');
          } else {
            const errorResult = await response.json();
            setVerificationStatus(`Error: ${errorResult.error}`);
            console.error('Error sending token:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending token:', error);
        }
      }
    };

    sendTokenToBackend();
  }, [idToken, session, connect]);

  const handleLogout = () => {
    setUserName('');
    setIdToken('');
    setVerificationStatus(null);
  };

  return (
    <Router>
<Routes>
  <Route path="/login" element={<LoginScreen onSuccess={handleLoginSuccess} onError={() => console.log('Login failed')} />} />
  <Route path="/chat" element={
    userName ? (
      <div>
        <p>Welcome, {userName}!</p>
        <button onClick={handleLogout}>Logout</button>
        <Playground />
      </div>
    ) : (
      <Navigate to="/login" />
    )
  } />
  <Route path="/*" element={<Navigate to="/login" />} />
</Routes>
    </Router>
  );
}

export default App;
