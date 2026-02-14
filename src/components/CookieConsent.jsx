import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('spir_cookie_consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('spir_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('spir_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-wrapper">
            <div className="cookie-consent-card">
                <div className="cookie-content">
                    <p>
                        אתר זה משתמש בעוגיות (Cookies) כדי לשפר את חווית הגלישה שלך ולהתאים עבורך תכנים.
                        ניתן לקרוא מידע נוסף ב<Link to="/privacy-policy" onClick={() => setIsVisible(false)}>מדיניות הפרטיות בהתאם לתיקון 13 לחוק הגנת הפרטיות</Link>.
                    </p>
                </div>

                <div className="cookie-actions">
                    <button className="btn-cookie-decline" onClick={handleDecline}>
                        סירוב
                    </button>
                    <button className="btn-cookie-accept" onClick={handleAccept}>
                        אני מסכים/ה
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
