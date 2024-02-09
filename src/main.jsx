import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='560571786999-o77l5b4j89vkb17dcm8a6hi06b4tec9h.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
