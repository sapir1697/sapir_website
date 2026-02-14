import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Ruler, Calendar } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import './Projects.css';

const categories = ['הכל', 'מגורים', 'מסחר ומשרדים', 'תעשייה', 'התחדשות עירונית'];

const Projects = () => {
    const { projects } = useProjects();
    const [activeCategory, setActiveCategory] = useState('הכל');

    const filteredProjects = activeCategory === 'הכל'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">הפרויקטים שלנו</h2>
                    <div className="divider"></div>
                    <p className="section-subtitle">
                        תיק העבודות שלנו הינו עדות למחויבות למצוינות. כל פרויקט הוא סיפור של חזון, תכנון מדויק וביצוע מוקפד.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="projects-filter">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="projects-grid">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="project-card group"
                            >
                                <div className="project-image-container">
                                    <img src={project.image} alt={project.title} className="project-real-image" />
                                    {project.status && (
                                        <div className="project-status-badge">
                                            סטטוס: {project.status}
                                        </div>
                                    )}
                                </div>

                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>

                                    {/* Delivery Time (Compact) */}
                                    {project.deliveryDate && new Date(project.deliveryDate) > new Date() && (
                                        <div className="card-delivery-info">
                                            <div className="cd-header">
                                                <span className="cd-label">מסירה: {new Date(project.deliveryDate).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' })}</span>
                                                <span className="cd-remaining">
                                                    {Math.floor((new Date(project.deliveryDate) - new Date()) / (1000 * 60 * 60 * 24 * 30))} חודשים
                                                </span>
                                            </div>
                                            <div className="cd-progress-bg">
                                                <div
                                                    className="cd-progress-fill"
                                                    style={{ width: `${Math.max(0, Math.min(100, ((new Date() - new Date(project.startDate || '2024-01-01')) / (new Date(project.deliveryDate) - new Date(project.startDate || '2024-01-01'))) * 100))}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    <p className="project-short-desc">{project.description}</p>

                                    <div className="project-details-list">
                                        {project.buildings && (
                                            <div className="detail-row">
                                                <span className="detail-label">מספר בניינים:</span>
                                                <span className="detail-value">{project.buildings}</span>
                                            </div>
                                        )}
                                        {project.floors && (
                                            <div className="detail-row">
                                                <span className="detail-label">מספר קומות:</span>
                                                <span className="detail-value">{project.floors}</span>
                                            </div>
                                        )}
                                        {project.units && (
                                            <div className="detail-row">
                                                <span className="detail-label">מספר יחידות דיור:</span>
                                                <span className="detail-value">{project.units}</span>
                                            </div>
                                        )}
                                        {project.architect && (
                                            <div className="detail-row">
                                                <span className="detail-label">משרד אדריכלים:</span>
                                                <span className="detail-value">{project.architect}</span>
                                            </div>
                                        )}
                                        <div className="detail-row">
                                            <span className="detail-label">כתובת:</span>
                                            <span className="detail-value">{project.location}</span>
                                        </div>
                                    </div>

                                    <Link to={`/project/${project.id}`} className="project-cta-btn">
                                        <span className="btn-icon-circle">
                                            <ArrowLeft size={18} />
                                        </span>
                                        <span className="btn-text">מעבר לפרויקט</span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
