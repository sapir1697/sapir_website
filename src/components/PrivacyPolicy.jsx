import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <main className="privacy-page">
                {/* Back Button matching ProjectDetails style */}
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
                        <h1>מדיניות פרטיות</h1>
                    </header>

                    <div className="privacy-content">
                        <section className="privacy-section">
                            <h2>1. כללי</h2>
                            <p>
                                חברתנו (להלן: "החברה") מכבדת את פרטיותם של המשתמשים באתר האינטרנט שהיא מנהלת ומפעילה.
                                מסמך זה מפרט את מדיניות הפרטיות של האתר וסוקר, בין היתר, את המידע הנאסף, אופן השימוש בו,
                                ואת זכויותיך כמשתמש בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותקנותיו, לרבות תיקון 13 לחוק.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2>2. איסוף מידע ורישומו</h2>
                            <p>חלק מהשירותים באתר טעונים הרשמה. במסגרת ההרשמה תידרש למסור מידע אישי, כדוגמת:</p>
                            <ul>
                                <li>שם מלא</li>
                                <li>מספר טלפון</li>
                                <li>כתובת אימייל</li>
                                <li>מידע על פרויקטים המעניינים אותך</li>
                            </ul>
                            <p>
                                המידע הנמסר על ידך יישמר במאגר המידע של החברה. אינך חייב על-פי חוק למסור את המידע,
                                אולם ללא מסירתו לא תוכל להירשם לשירותים מסוימים או לקבל מענה לפנייתך.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2>3. השימוש במידע</h2>
                            <p>השימוש במידע שנאסף ייעשה רק על פי מדיניות זו או על פי הוראות כל דין, למטרות הבאות:</p>
                            <ul>
                                <li>מתן מענה לפנייתך ומתן שירות לקוחות.</li>
                                <li>שליחת עדכונים, פרסומים ומידע שיווקי (באם נתת הסכמתך לכך).</li>
                                <li>שיפור חווית המשתמש וניתוח תעבורת הגולשים באתר.</li>
                                <li>תפעולו התקין ופיתוחו של האתר.</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2>4. עוגיות (Cookies)</h2>
                            <p>
                                האתר עושה שימוש ב'עוגיות' (Cookies) לצורך תפעולו השוטף והתקין, ובכלל זה כדי לאסוף נתונים סטטיסטיים
                                אודות השימוש באתר, לאימות פרטים, כדי להתאים את האתר להעדפותיך האישיות ולצורכי אבטחת מידע.
                            </p>
                            <p>
                                בהתאם לתיקון 13 לחוק הגנת הפרטיות, אנו מבקשים את הסכמתך לשימוש בעוגיות. תוכל להפסיק את קבלת העוגיות
                                על-ידי שינוי ההגדרות בדפדפן שלך, אולם נטרולן עלול לפגוע ביכולתך להשתמש בחלק מהשירותים באתר.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2>5. העברת מידע לצדדים שלישיים</h2>
                            <p>
                                החברה לא תעביר לצדדים שלישיים את פרטיך האישיים והמידע שנאסף על פעילותך באתר,
                                אלא במקרים הבאים:
                            </p>
                            <ul>
                                <li>בעת רכישת מוצר או שירות מצד שלישי, יועבר המידע הדרוש להשלמת הרכישה.</li>
                                <li>במקרה של מחלוקת משפטית בינך לבין החברה.</li>
                                <li>אם יתקבל צו שיפוטי המורה למסור את פרטיך לצד שלישי.</li>
                                <li>במקרה של מיזוג החברה עם גוף אחר.</li>
                            </ul>
                        </section>

                        <section className="privacy-section">
                            <h2>6. אבטחת מידע</h2>
                            <p>
                                החברה מיישמת באתר מערכות ונהלים עדכניים לאבטחת מידע. בעוד שמערכות אלו מצמצמות את הסיכונים
                                לחדירה בלתי-מורשית, הן אינן מעניקות חסינות מוחלטת. לפיכך, החברה לא מתחייבת שהאתר יהיה חסין
                                באופן מוחלט מפני גישה בלתי-מורשית למידע המאוחסן בו.
                            </p>
                        </section>

                        <section className="privacy-section">
                            <h2>7. זכות לעיין במידע</h2>
                            <p>
                                על-פי חוק הגנת הפרטיות, כל אדם זכאי לעיין במידע שעליו המוחזק במאגר מידע.
                                אדם שעיין במידע שעליו ומצא כי אינו נכון, שלם, ברור או מעודכן, רשאי לפנות לבעל מאגר המידע
                                בבקשה לתקן את המידע או למחקו.
                            </p>
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

export default PrivacyPolicy;
