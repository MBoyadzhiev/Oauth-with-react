import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot from Recoil library
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Auth0Provider } from '@auth0/auth0-react';

const Root = () => (
  <React.StrictMode>
    <RecoilRoot> {/* Add the RecoilRoot component here */}
      <GoogleOAuthProvider clientId='560571786999-o77l5b4j89vkb17dcm8a6hi06b4tec9h.apps.googleusercontent.com'>
        <Auth0Provider
          domain="dev-nkc8vuzqi6ner6ae.us.auth0.com"
          clientId="kCJRZS7XNWS6RKdZyeeygvzViDG5v4U6"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>
      </GoogleOAuthProvider>
    </RecoilRoot>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
