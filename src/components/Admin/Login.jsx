import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Admin.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // List of authorized admin emails
    const authorizedEmails = ['office@spir-tal.co.il', 'ronen@spir-tal.co.il', 'sapir1697@gmail.com', 'ronenc775@gmail.com'];

    const handleLogin = (e) => {
        e.preventDefault();
        // Legacy password auth (keeping it as backup)
        if (password === 'spir2024') {
            localStorage.setItem('spir_admin_auth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('סיסמה שגויה');
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const userEmail = decoded.email;

            if (authorizedEmails.includes(userEmail)) {
                localStorage.setItem('spir_admin_auth', 'true');
                localStorage.setItem('spir_admin_user', JSON.stringify({
                    email: userEmail,
                    name: decoded.name,
                    picture: decoded.picture
                }));
                navigate('/admin/dashboard');
            } else {
                setError(`החשבון ${userEmail} אינו מורשה לגישה למערכת הניהול`);
            }
        } catch (err) {
            setError('שגיאה באימות עם גוגל');
        }
    };

    const handleGoogleError = () => {
        setError('התחברות עם גוגל נכשלה');
    };

    return (
        <div className="login-container" dir="rtl">
            <div className="login-form-wrapper">
                <form onSubmit={handleLogin} className="login-form glass-panel">
                    <div className="login-icon">
                        <Lock size={40} color="var(--primary-color)" />
                    </div>
                    <h2>כניסה למערכת ניהול</h2>

                    <div className="google-login-section">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            useOneTap
                            theme="outline"
                            size="large"
                            text="signin_with"
                            locale="he"
                        />
                    </div>

                    <div className="login-divider">
                        <span>או</span>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="סיסמה"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit" className="btn btn-primary w-full">התחבר עם סיסמה</button>

                    <button type="button" onClick={() => navigate('/')} className="btn-text w-full" style={{ marginTop: '1rem' }}>
                        חזרה לאתר
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
