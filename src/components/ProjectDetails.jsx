import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { ArrowRight, ArrowLeft, MapPin, Ruler, Calendar, Tag, CheckCircle2, Building2, Layers, Home, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects } = useProjects();
    const [activePlan, setActivePlan] = React.useState(0);

    // Form State
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        interestedIn: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState('');

    // Find project by ID
    const project = projects.find(p => p.id.toString() === id);

    // Update interestedIn when activePlan changes
    useEffect(() => {
        if (project?.floorPlans?.[activePlan]) {
            setFormData(prev => ({ ...prev, interestedIn: project.floorPlans[activePlan].title }));
        }
    }, [activePlan, project]);

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyIyxSCOw1hp7hWU9oBydylng6Pqq33snqrI8AkP5MANDnyX0sSMSKKjT9ME1cyN7w/exec";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const projectMessage = `מתעניין בפרויקט: ${project.title}\nיחידה/דירה: ${formData.interestedIn || 'לא צוין'}\n${formData.message}`;

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, message: projectMessage })
            });

            setIsSuccess(true);
            setIsSubmitting(false);
            setFormData({ name: '', email: '', phone: '', interestedIn: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            setError('קרתה שגיאה. נא נסה שוב מאוחר יותר.');
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="project-not-found">
                <h2>הפרויקט לא נמצא</h2>
                <button onClick={() => navigate('/')} className="btn btn-primary">חזרה לדף הבית</button>
            </div>
        );
    }

    return (
        <div className="project-details-page" dir="rtl">
            {/* Fixed Back Button - Small Arrow */}
            <Link to="/" style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
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
            }}>
                <ArrowRight size={20} />
            </Link>

            {/* 1. Immersive Hero */}
            <header className="pd-visual-header">
                <div className="pd-header-overlay"></div>
                <img src={project.image} alt={project.title} className="pd-header-bg" />

                <div className="container pd-header-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="pd-header-category">{project.category}</span>
                        <h1 className="pd-header-title">{project.title}</h1>
                        <div className="pd-header-status">
                            <span className="status-dot"></span>
                            סטטוס: {project.status || 'בביצוע'}
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* 2. Key Stats Strip (Dark) */}
            <div className="pd-stats-strip">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <MapPin size={24} className="stat-icon" />
                            <div className="stat-text">
                                <span className="stat-label">מיקום</span>
                                <span className="stat-value">{project.location}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <PenTool size={24} className="stat-icon" />
                            <div className="stat-text">
                                <span className="stat-label">אדריכל</span>
                                <span className="stat-value">{project.architect || 'ספיר אדריכלים'}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Calendar size={24} className="stat-icon" />
                            <div className="stat-text">
                                <span className="stat-label">שנת סיום</span>
                                <span className="stat-value">{project.year}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Ruler size={24} className="stat-icon" />
                            <div className="stat-text">
                                <span className="stat-label">גודל</span>
                                <span className="stat-value">{project.size}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main>
                {/* 3. The Story & Details */}
                <section className="pd-section pd-story">
                    <div className="container">
                        <div className="story-layout">
                            <motion.div
                                className="story-content"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="section-heading">סיפור הפרויקט</h2>
                                <div className="story-text">
                                    {(project.fullDescription || project.description || '').split('\n').map(p => p.trim()).filter(p => p).map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>

                                {/* Delivery Time Visual - Minimalist Version */}
                                {project.deliveryDate && new Date(project.deliveryDate) > new Date() && (
                                    <div className="delivery-time-minimal">
                                        <div className="dt-header">
                                            <div className="dt-info">
                                                <span className="dt-label">צפי מסירה:</span>
                                                <span className="dt-date">
                                                    {new Date(project.deliveryDate).toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <span className="dt-remaining">
                                                ({Math.floor((new Date(project.deliveryDate) - new Date()) / (1000 * 60 * 60 * 24 * 30))} חודשים נותרו)
                                            </span>
                                        </div>

                                        <div className="dt-progress-bg">
                                            <motion.div
                                                className="dt-progress-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${Math.max(0, Math.min(100, ((new Date() - new Date(project.startDate || '2024-01-01')) / (new Date(project.deliveryDate) - new Date(project.startDate || '2024-01-01'))) * 100))}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="tech-specs">
                                    <h3 className="specs-title">נתונים טכניים</h3>
                                    <div className="specs-grid">
                                        {project.buildings && (
                                            <div className="spec-item">
                                                <Building2 size={18} />
                                                <span>{project.buildings} בניינים</span>
                                            </div>
                                        )}
                                        {project.floors && (
                                            <div className="spec-item">
                                                <Layers size={18} />
                                                <span>{project.floors} קומות</span>
                                            </div>
                                        )}
                                        {project.units && (
                                            <div className="spec-item">
                                                <Home size={18} />
                                                <span>{project.units} יח"ד</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* If there's a gallery, show the first image as a featured side image, otherwise hide */}
                            {project.gallery && project.gallery.length > 0 && (
                                <motion.div
                                    className="story-image"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <img src={project.gallery[0].image} alt="Featured" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 4. Features Grid */}
                {project.features && project.features.length > 0 && (
                    <section className="pd-section pd-features">
                        <div className="container">
                            <h2 className="section-heading center">מפרט ואיכות חיים</h2>
                            <p className="section-subheading center">חווית מגורים בסטנדרט הגבוה ביותר</p>

                            <div className="features-grid">
                                {project.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="feature-card"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="feature-icon">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <span className="feature-text">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. Floor Plans - New Feature */}
                {project.floorPlans && project.floorPlans.length > 0 && (
                    <section className="pd-section pd-floorplans">
                        <div className="container">
                            <h2 className="section-heading">תוכניות דירה</h2>
                            <div className="floorplans-container">
                                {/* Tabs */}
                                <div className="fp-tabs">
                                    {project.floorPlans.map((plan, index) => (
                                        <button
                                            key={index}
                                            className={`fp-tab-btn ${activePlan === index ? 'active' : ''}`}
                                            onClick={() => setActivePlan(index)}
                                        >
                                            {plan.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Active Plan Display */}
                                <div className="fp-display">
                                    <motion.div
                                        key={activePlan}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="fp-content"
                                    >
                                        <div className="fp-main-layout">
                                            {/* Left: Plan Sketch */}
                                            <div className="fp-sketch-container">
                                                <span className="fp-label">תוכנית דירה</span>
                                                <div className="fp-image-wrapper">
                                                    <img src={project.floorPlans[activePlan].image} alt={project.floorPlans[activePlan].title} />
                                                </div>
                                            </div>

                                            {/* Right: Details & Interior Gallery */}
                                            <div className="fp-info-side">
                                                <div className="fp-header-info">
                                                    <h3>{project.floorPlans[activePlan].title}</h3>
                                                    <div className="fp-size">
                                                        <Ruler size={18} />
                                                        <span>{project.floorPlans[activePlan].size}</span>
                                                    </div>
                                                </div>

                                                {project.floorPlans[activePlan].images && (
                                                    <div className="fp-interior-gallery">
                                                        <span className="fp-label-small">הדמיות פנים</span>
                                                        <div className="fp-gallery-scroll">
                                                            {project.floorPlans[activePlan].images.map((img, idx) => (
                                                                <div key={idx} className="fp-gallery-thumb">
                                                                    <img src={img} alt={`Interior ${idx}`} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <p className="fp-note">* התוכניות להמחשה בלבד.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 6. Gallery (Remaining Images) */}
                {project.gallery && project.gallery.length > 0 && (
                    <section className="pd-section pd-gallery">
                        <div className="container">
                            <h2 className="section-heading">גלריית הפרויקט</h2>
                            <div className="gallery-slider">
                                {project.gallery.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="gallery-item"
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <img src={item.image} alt={item.caption} />
                                        {item.caption && (
                                            <div className="gallery-caption">{item.caption}</div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 6. CTA Footer with Form */}
                <section className="pd-cta-footer">
                    <div className="container center-content">
                        <h2>מתעניינים ב{project.title === 'ספיר טל' ? 'פרויקט' : project.title}?</h2>
                        <p>נשמח לתאם פגישה ולהציג בפניכם את כל הפרטים</p>

                        <div className="pd-cta-form-wrapper">
                            {isSuccess ? (
                                <motion.div
                                    className="pd-success-msg"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <CheckCircle2 size={48} color="#c5a669" />
                                    <h3>ההודעה נשלחה בהצלחה!</h3>
                                    <p>נחזור אליך בהקדם לגבי פרויקט {project.title}.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="pd-contact-form">
                                    <div className="pd-form-row">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="שם מלא"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="טלפון"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="pd-form-row">
                                        {project.floorPlans && project.floorPlans.length > 0 ? (
                                            <select
                                                name="interestedIn"
                                                className="pd-form-select"
                                                value={formData.interestedIn}
                                                onChange={handleChange}
                                            >
                                                <option value="">בחר סוג יחידה</option>
                                                {project.floorPlans.map((plan, idx) => (
                                                    <option key={idx} value={plan.title}>{plan.title}</option>
                                                ))}
                                                <option value="אחר">אחר / כללי</option>
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                name="interestedIn"
                                                placeholder="איזו דירה מעניינת אותך?"
                                                value={formData.interestedIn}
                                                onChange={handleChange}
                                            />
                                        )}
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="אימייל"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="pd-form-row full-width">
                                        <button type="submit" className="cta-button-large" disabled={isSubmitting}>
                                            {isSubmitting ? 'שולח...' : (
                                                <>דברו איתנו <ArrowLeft size={20} /></>
                                            )}
                                        </button>
                                    </div>
                                    {error && <p className="pd-error-msg">{error}</p>}
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="simple-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ספיר טל יזמות הנדסה וביצוע</p>
                </div>
            </footer>
        </div>
    );
};

export default ProjectDetails;
