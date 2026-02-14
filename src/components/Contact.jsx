import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // REPLACE THIS with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyIyxSCOw1hp7hWU9oBydylng6Pqq33snqrI8AkP5MANDnyX0sSMSKKjT9ME1cyN7w/exec";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires no-cors for simple requests
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Since we use no-cors, we won't get a proper json response, 
            // but if it doesn't throw, we assume success for Apps Script
            setIsSuccess(true);
            setIsSubmitting(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (err) {
            console.error('Error sending message:', err);
            setError('קרתה שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.');
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="contact-wrapper">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>בואו נדבר</h2>
                        <p>אנחנו כאן לכל שאלה, התייעצות או רעיון חדש. נשמח לשמוע מכם.</p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="icon-box"><MapPin size={20} /></div>
                                <div>
                                    <h4>כתובתנו</h4>
                                    <span>קרל פופר 9, נתניה</span>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="icon-box"><Phone size={20} /></div>
                                <div>
                                    <h4>טלפון</h4>
                                    <span>03-1234567</span>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="icon-box"><Mail size={20} /></div>
                                <div>
                                    <h4>דוא"ל</h4>
                                    <span>info@spirtal.co.il</span>
                                </div>
                            </div>
                        </div>

                        <div className="decorative-map">
                            <iframe
                                title="מפת הגעה למשרד"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://maps.google.com/maps?q=Karl+Popper+9,+Netanya&t=&z=15&ie=UTF8&iwloc=&output=embed&hl=he"
                            ></iframe>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {isSuccess ? (
                            <div className="form-success-message glass-panel">
                                <CheckCircle2 size={48} color="#22c55e" />
                                <h3>ההודעה נשלחה בהצלחה!</h3>
                                <p>תודה שפנית אלינו. נחזור אליך בהקדם האפשרי.</p>
                                <button className="btn btn-secondary" onClick={() => setIsSuccess(false)}>שלח הודעה נוספת</button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="contact-form glass-panel"
                            >
                                <h3>שלח הודעה</h3>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="שם מלא"
                                        required
                                        className="form-input"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="אימייל"
                                        required
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="טלפון"
                                        required
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder="תוכן ההודעה"
                                        rows="4"
                                        className="form-input"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {error && <p className="form-error-msg">{error}</p>}

                                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>שולח... <Loader2 size={18} className="animate-spin" /></>
                                    ) : (
                                        <>שלח הודעה <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
