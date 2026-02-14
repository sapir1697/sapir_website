import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" dir="rtl">
            <div className="container footer-content">
                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} ספיר טל יזמות הנדסה וביצוע. כל הזכויות שמורות.</p>
                    <span className="separator">|</span>
                    <Link to="/privacy-policy" className="footer-link">מדיניות פרטיות</Link>
                    <span className="separator">|</span>
                    <Link to="/accessibility-statement" className="footer-link">הצהרת נגישות</Link>
                    <span className="separator">|</span>
                    <a href="/login" className="admin-link">כניסת מנהל</a>
                </div>
                <div className="social-links">
                    <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                    <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                    <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
