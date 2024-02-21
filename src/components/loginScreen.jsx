import React from 'react';
import GoogleLoginButton from "./googleLoginButton";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginScreen = ({ onSuccess, onError }) => {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSuccess = (credentialResponse) => {
    onSuccess(credentialResponse); // Pass the credentialResponse to the parent component
    navigate('/chat'); // Navigate to the /chat route
  };

  return (
    <div>
      <h1>Login Screen</h1>
      <GoogleLoginButton
        onSuccess={handleSuccess} // Use the modified handleSuccess function
        onError={onError}
      />
    </div>
  );
};

export default LoginScreen;
