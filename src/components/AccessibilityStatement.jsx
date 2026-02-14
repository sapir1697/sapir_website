import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Accessibility as AccessibilityIcon } from 'lucide-react';
import './PrivacyPolicy.css'; // Reusing the same styling for consistency

const AccessibilityStatement = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <main className="privacy-page">
                {/* Back Button matching other pages */}
                <Link to="/" style={{
                    position: 'fixed',
                    top: '20px',
                    right: '25px',
                    zIndex: 9999,
                    background: 'white',
                    color: '#0f172a',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                }} className="hover-scale">
                    <ArrowRight size={20} />
                </Link>

                <div className="privacy-container">
                    <header className="privacy-header">
                        <AccessibilityIcon size={32} color="#f97316" style={{ marginBottom: '0.25rem' }} />
                        <h1>הצהרת נגישות</h1>
                    </header>

                    <div className="privacy-content">
                        <section className="privacy-section">
                            <h2>מבוא</h2>
                            <p>
                                בספיר טל יזמות הנדסה וביצוע, אנו רואים חשיבות עליונה במתן שירות שוויוני, מכובד, נגיש ומקצועי לכלל לקוחותינו,
                                לרבות לאנשים עם מוגבלויות. אנו משקיעים מאמצים ומשאבים רבים בביצוע התאמות נגישות באתר האינטרנט שלנו,
                                מתוך אמונה כי לכל אדם זכות לחיות בשוויון, בכבוד, בנוחות ובעצמאות.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2>נגישות אתר האינטרנט</h2>
                            <p>
                                אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013,
                                ובהתאם להמלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA.
                                באתר מותקן תפריט נגישות (הווידג'ט הכתום בפינה) הכולל את ההתאמות הבאות:
                            </p>
                            <ul>
                                <li><strong>שינוי תצוגה:</strong> אפשרות למצב כהה (Dark Mode), גווני אפור וניגודיות גבוהה.</li>
                                <li><strong>גודל טקסט:</strong> אפשרות להגדלת הגופן באתר לרמות שונות.</li>
                                <li><strong>קריאות:</strong> מעבר לגופן (פונט) קריא וברור והדגשת קישורים.</li>
                                <li><strong>סיוע בקריאה:</strong> סמן קריאה (Reading Guide) העוקב אחר העכבר וסמן (Cursor) מוגדל.</li>
                                <li><strong>עצירת תנועה:</strong> אפשרות להפסקת אנימציות ורכיבים זזים למניעת הסחת דעת.</li>
                                <li><strong>ניווט מקלדת:</strong> תמיכה מלאה בניווט באמצעות מקשי ה-Tab והחצים.</li>
                                <li><strong>התאמה לקוראי מסך:</strong> שימוש בתגיות סמנטיות ותיאורי תמונה (Alt Text).</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2>הנחיות הפעלה</h2>
                            <p>
                                תפריט הנגישות נפתח על-ידי לחיצה על כפתור הנגישות הצף בפינת המסך.
                                לאחר בחירת ההתאמה הרצויה, האתר יתעדכן באופן מיידי.
                                ניתן לאפס את כל ההגדרות בכל עת באמצעות כפתור "איפוס" בתחתית התפריט.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2>הסדרי נגישות פיזיים</h2>
                            <p>
                                משרדי החברה נגישים לבעלי מוגבלויות, כולל חניות נגישות, מעברים רחבים ומעליות מותאמות.
                                לקוחות המעוניינים במידע נוסף על הסדרי הנגישות הפיזיים מוזמנים ליצור איתנו קשר.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2>דרכי פנייה לבקשות והצעות לשיפור</h2>
                            <p>
                                אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו לאפשר לכלל האוכלוסייה להשתמש בו באופן היעיל והנוח ביותר.
                                במידה ומצאתם תקלה או אם נתקלתם בקושי בנגישות, תוכלו ליצור קשר עם רכז הנגישות שלנו:
                            </p>
                            <ul>
                                <li>אימייל: office@spir-tal.co.il</li>
                                <li>טלפון: 08-XXXXXXXX</li>
                            </ul>
                        </section>

                        <footer className="last-updated">
                            <p>עדכון אחרון: פברואר 2026</p>
                        </footer>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AccessibilityStatement;
