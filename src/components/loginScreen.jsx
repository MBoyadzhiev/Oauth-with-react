import React from 'react';
import GoogleLoginButton from "./googleLoginButton";
import { useNavigate } from 'react-router-dom'; 
import profilePic from '../assets/clouddo_logo.png'

const LoginScreen = ({ onSuccess, onError }) => {
  const navigate = useNavigate(); 

  const handleSuccess = (credentialResponse) => {
    onSuccess(credentialResponse); 
    navigate('/chat'); 
  };

  return (
    <div className='card-wrap'>
    <div className='card'>
      <h2 className='card-text'>Welcome to Clouddo Chatbot</h2>
      <img className="card-image" src={profilePic} alt="profile picture" />
      <GoogleLoginButton
        onSuccess={handleSuccess} 
        onError={onError}
      />
    </div>
    </div>
  );
};

export default LoginScreen;
