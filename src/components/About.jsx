import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Target, Users, Award } from 'lucide-react';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { label: 'שנות ניסיון', value: '15+', icon: <Award className="text-blue-500" size={32} /> },
        { label: 'פרויקטים', value: '45', icon: <Target className="text-blue-500" size={32} /> },
        { label: 'לקוחות מרוצים', value: '100+', icon: <Users className="text-blue-500" size={32} /> },
    ];

    return (
        <section id="about" className="about-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">אודות החברה</h2>
                    <div className="divider"></div>
                    <p className="section-subtitle">
                        אנחנו בונים עתיד טוב יותר, לבנה אחר לבנה, עם מחויבות בלתי מתפשרת למצוינות.
                    </p>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3>בונים את המחר, היום.</h3>
                        <p>
                            חברת ספיר טל הינה חברת יזמות ובנייה מובילה, המתמחה בהקמת פרויקטים למגורים, מסחר ומשרדים. אנו מאמינים כי בנייה היא אמנות הדורשת דיוק, מקצועיות וחזון.
                        </p>
                        <p>
                            עם ניסיון עשיר של עשרות שנים, אנו מחויבים לסטנדרטים הגבוהים ביותר של איכות, בטיחות ושירות, תוך שימוש בטכנולוגיות מתקדמות ובחומרים האיכותיים ביותר. הצוות שלנו מורכב ממהנדסים, אדריכלים ומנהלי פרויקטים מהשורה הראשונה.
                        </p>

                        <div className="stats-container">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <div className="stat-icon">{stat.icon}</div>
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-image-wrapper"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000"
                            alt="בנייה מודרנית"
                            className="about-real-img"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
