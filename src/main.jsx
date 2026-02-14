import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import './components/Buttons.css' // Import custom button styles
import App from './App.jsx'

// REPLACE THIS with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "258178680656-je04j0v9ftl9gvi1161n5pdui8u4e03s.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
