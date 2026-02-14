import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectsContext';
import { Trash2, Plus, LogOut, ArrowRight, Edit, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import './Admin.css';

const AdminDashboard = () => {
    const { projects, addProject, deleteProject, updateProject } = useProjects();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const isAuth = localStorage.getItem('spir_admin_auth');
        if (!isAuth) {
            navigate('/login');
        }
    }, [navigate]);

    // Project Form State
    const [projectForm, setProjectForm] = useState({
        title: '',
        category: 'מגורים',
        location: '',
        size: '',
        year: new Date().getFullYear(),
        description: '',
        fullDescription: '',
        image: '',
        status: 'בתכנון',
        architect: '',
        startDate: '',
        deliveryDate: '',
        floors: '',
        buildings: '',
        units: '',
        features: '',
        gallery: [],
        floorPlans: []
    });

    const handleLogout = () => {
        localStorage.removeItem('spir_admin_auth');
        localStorage.removeItem('spir_admin_user');
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedFeatures = typeof projectForm.features === 'string'
            ? projectForm.features.split(',').map(f => f.trim()).filter(f => f)
            : projectForm.features;

        const projectData = {
            ...projectForm,
            features: formattedFeatures,
            image: projectForm.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
        };

        if (editingId) {
            updateProject(editingId, projectData);
            setEditingId(null);
        } else {
            addProject(projectData);
        }

        setIsAdding(false);
        resetForm();
    };

    const resetForm = () => {
        setProjectForm({
            title: '', category: 'מגורים', location: '', size: '', year: new Date().getFullYear(),
            description: '', fullDescription: '', image: '', status: 'בתכנון', architect: '',
            startDate: '', deliveryDate: '', floors: '', buildings: '', units: '', features: '',
            gallery: [], floorPlans: []
        });
        setEditingId(null);
    };

    const startEditing = (project) => {
        const featuresString = Array.isArray(project.features) ? project.features.join(', ') : project.features || '';

        setProjectForm({
            ...project,
            features: featuresString,
            gallery: project.gallery || [],
            floorPlans: project.floorPlans || []
        });
        setEditingId(project.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Gallery Handlers
    const addGalleryItem = () => {
        setProjectForm(prev => ({
            ...prev,
            gallery: [...prev.gallery, { image: '', caption: '' }]
        }));
    };

    const removeGalleryItem = (index) => {
        setProjectForm(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
    };

    const updateGalleryItem = (index, field, value) => {
        setProjectForm(prev => ({
            ...prev,
            gallery: prev.gallery.map((item, i) => i === index ? { ...item, [field]: value } : item)
        }));
    };

    // Floor Plan Handlers
    const addFloorPlan = () => {
        setProjectForm(prev => ({
            ...prev,
            floorPlans: [...prev.floorPlans, { title: '', size: '', image: '', images: [] }]
        }));
    };

    const removeFloorPlan = (index) => {
        setProjectForm(prev => ({
            ...prev,
            floorPlans: prev.floorPlans.filter((_, i) => i !== index)
        }));
    };

    const updateFloorPlan = (index, field, value) => {
        setProjectForm(prev => ({
            ...prev,
            floorPlans: prev.floorPlans.map((item, i) => i === index ? { ...item, [field]: value } : item)
        }));
    };

    // Floor Plan Interior Images Handlers
    const addFloorPlanImage = (planIndex) => {
        setProjectForm(prev => ({
            ...prev,
            floorPlans: prev.floorPlans.map((plan, i) =>
                i === planIndex ? { ...plan, images: [...(plan.images || []), ''] } : plan
            )
        }));
    };

    const removeFloorPlanImage = (planIndex, imgIndex) => {
        setProjectForm(prev => ({
            ...prev,
            floorPlans: prev.floorPlans.map((plan, i) =>
                i === planIndex ? { ...plan, images: plan.images.filter((_, j) => j !== imgIndex) } : plan
            )
        }));
    };

    const updateFloorPlanImage = (planIndex, imgIndex, value) => {
        setProjectForm(prev => ({
            ...prev,
            floorPlans: prev.floorPlans.map((plan, i) =>
                i === planIndex ? {
                    ...plan,
                    images: plan.images.map((img, j) => j === imgIndex ? value : img)
                } : plan
            )
        }));
    };

    const handleDelete = (id) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק פרויקט זה?')) {
            deleteProject(id);
        }
    };

    const toggleForm = () => {
        if (isAdding) {
            setIsAdding(false);
            resetForm();
        } else {
            setIsAdding(true);
            resetForm();
        }
    };

    const categories = ['מגורים', 'מסחר ומשרדים', 'תעשייה', 'התחדשות עירונית'];
    const statuses = ['בתכנון', 'בביצוע', 'בשיווק', 'אוכלס'];

    return (
        <div className="admin-container" dir="rtl">
            <header className="admin-header">
                <div className="admin-header-content">
                    <h1>ממשק ניהול פרויקטים</h1>
                    <div className="admin-actions">
                        <button onClick={() => navigate('/')} className="btn-text">
                            <ArrowRight size={16} /> חזרה לאתר
                        </button>
                        <button onClick={handleLogout} className="btn-logout">
                            <LogOut size={16} /> התנתק
                        </button>
                    </div>
                </div>
            </header>

            <main className="admin-main">
                <div className="admin-toolbar">
                    <h2>רשימת פרויקטים ({projects.length})</h2>
                    <button className="btn btn-primary" onClick={toggleForm}>
                        <Plus size={18} /> {isAdding && !editingId ? 'סגור טופס' : 'הוסף פרויקט חדש'}
                    </button>
                </div>

                {isAdding && (
                    <div className="modal-overlay" onClick={() => setIsAdding(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="close-modal-btn" onClick={() => setIsAdding(false)}>&times;</button>
                            <form onSubmit={handleSubmit} className="add-project-form">
                                <div className="form-header">
                                    <h3>{editingId ? 'עריכת פרויקט' : 'הוספת פרויקט חדש'}</h3>
                                </div>

                                {/* General Info Section */}
                                <div className="form-section">
                                    <h4 className="section-title">פרטים כלליים</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>שם הפרויקט</label>
                                            <input required className="form-input" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>קטגוריה</label>
                                            <select className="form-input" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}>
                                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>סטטוס</label>
                                            <select className="form-input" value={projectForm.status} onChange={e => setProjectForm({ ...projectForm, status: e.target.value })}>
                                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>מיקום</label>
                                            <input required className="form-input" value={projectForm.location} onChange={e => setProjectForm({ ...projectForm, location: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>גודל (מ"ר/יח"ד)</label>
                                            <input className="form-input" value={projectForm.size} onChange={e => setProjectForm({ ...projectForm, size: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>אדריכל</label>
                                            <input className="form-input" value={projectForm.architect} onChange={e => setProjectForm({ ...projectForm, architect: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>קומות</label>
                                            <input type="number" className="form-input" value={projectForm.floors} onChange={e => setProjectForm({ ...projectForm, floors: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>בניינים</label>
                                            <input type="number" className="form-input" value={projectForm.buildings} onChange={e => setProjectForm({ ...projectForm, buildings: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>יחידות דיור</label>
                                            <input className="form-input" value={projectForm.units} onChange={e => setProjectForm({ ...projectForm, units: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>שנת סיום (משוערת)</label>
                                            <input type="number" className="form-input" value={projectForm.year} onChange={e => setProjectForm({ ...projectForm, year: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>תאריך התחלה</label>
                                            <input type="date" className="form-input" value={projectForm.startDate} onChange={e => setProjectForm({ ...projectForm, startDate: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>תאריך מסירה</label>
                                            <input type="date" className="form-input" value={projectForm.deliveryDate} onChange={e => setProjectForm({ ...projectForm, deliveryDate: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-full-width">
                                        <div className="form-group">
                                            <label>תיאור קצר</label>
                                            <input className="form-input" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>תיאור מלא</label>
                                            <textarea className="form-input form-textarea" rows="4" value={projectForm.fullDescription} onChange={e => setProjectForm({ ...projectForm, fullDescription: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>מאפיינים (מופרדים בפסיקים)</label>
                                            <textarea className="form-input form-textarea" rows="2" value={projectForm.features} placeholder="לדוגמה: חדר כושר, לובי מפואר, חניה תת קרקעית" onChange={e => setProjectForm({ ...projectForm, features: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>תמונה ראשית</label>
                                            <ImageUpload
                                                value={projectForm.image}
                                                onChange={val => setProjectForm({ ...projectForm, image: val })}
                                                placeholder="גרור תמונה ראשית לפרויקט"
                                                recommendedSize="1920x600px (3:1)"
                                                aspectRatio={3 / 1}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Gallery Section */}
                                <div className="form-section">
                                    <div className="section-header">
                                        <h4 className="section-title">גלריית תמונות</h4>
                                        <button type="button" className="btn-small-add" onClick={addGalleryItem}>
                                            <Plus size={16} /> הוסף תמונה
                                        </button>
                                    </div>
                                    <div className="gallery-grid">
                                        {projectForm.gallery.map((item, index) => (
                                            <div key={index} className="gallery-item-card">
                                                <ImageUpload
                                                    className="small"
                                                    value={item.image}
                                                    onChange={val => updateGalleryItem(index, 'image', val)}
                                                    placeholder="העלה תמונה"
                                                    recommendedSize="800x600px (4:3)"
                                                    aspectRatio={4 / 3}
                                                />
                                                <div className="remove-bar" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <button type="button" className="btn-delete-item" onClick={() => removeGalleryItem(index)}>
                                                        <Trash2 size={16} /> הסר
                                                    </button>
                                                </div>
                                                <input
                                                    className="form-input-small"
                                                    placeholder="כיתוב (אופציונלי)"
                                                    value={item.caption}
                                                    onChange={e => updateGalleryItem(index, 'caption', e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floor Plans Section */}
                                <div className="form-section">
                                    <div className="section-header">
                                        <h4 className="section-title">תוכניות דירה ומפרטים</h4>
                                        <button type="button" className="btn-small-add" onClick={addFloorPlan}>
                                            <Plus size={16} /> הוסף דגם דירה
                                        </button>
                                    </div>
                                    <div className="floor-plans-list">
                                        {projectForm.floorPlans.map((plan, index) => (
                                            <div key={index} className="floor-plan-card">
                                                <div className="floor-plan-header">
                                                    <h5>דגם {index + 1}</h5>
                                                    <button type="button" className="remove-text-btn" onClick={() => removeFloorPlan(index)}>הסר דגם</button>
                                                </div>
                                                <div className="form-grid-compact">
                                                    <div className="form-group">
                                                        <label>שם הדגם</label>
                                                        <input className="form-input" value={plan.title} onChange={e => updateFloorPlan(index, 'title', e.target.value)} placeholder="לדוגמה: דירת 4 חדרים" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>גודל</label>
                                                        <input className="form-input" value={plan.size} onChange={e => updateFloorPlan(index, 'size', e.target.value)} placeholder='לדוגמה: 120 מ"ר' />
                                                    </div>
                                                    <div className="form-group full-width">
                                                        <label>שרטוט (Floor Plan)</label>
                                                        <ImageUpload
                                                            className="small"
                                                            value={plan.image}
                                                            onChange={val => updateFloorPlan(index, 'image', val)}
                                                            placeholder="העלה שרטוט דירה"
                                                            recommendedSize="800x800px (1:1)"
                                                            aspectRatio={1 / 1}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Interior Images for this Floor Plan */}
                                                <div className="interior-images-section">
                                                    <label className="sub-label">תמונות פנים והדמיות (עבור דגם זה)</label>
                                                    <div className="interior-images-list">
                                                        {(plan.images || []).map((img, imgIndex) => (
                                                            <div key={imgIndex} className="interior-image-row">
                                                                <div style={{ flex: 1 }}>
                                                                    <ImageUpload
                                                                        className="small"
                                                                        value={img}
                                                                        onChange={val => updateFloorPlanImage(index, imgIndex, val)}
                                                                        placeholder="העלה הדמייה"
                                                                        recommendedSize="1200x800px (3:2)"
                                                                        aspectRatio={3 / 2}
                                                                    />
                                                                </div>
                                                                <button type="button" className="icon-btn-remove" onClick={() => removeFloorPlanImage(index, imgIndex)} title="הסר תמונה">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button type="button" className="btn-text-add" onClick={() => addFloorPlanImage(index)}>+ הוסף תמונת פנים</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>ביטול</button>
                                    <button type="submit" className="btn-primary">
                                        {editingId ? 'שמור שינויים' : 'צור פרויקט'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="projects-grid-admin">
                    {projects.map((project) => (
                        <div key={project.id} className="admin-project-card">
                            <div className="admin-card-image">
                                <img src={project.image} alt={project.title} />
                                <div className="admin-card-overlay">
                                    <span className="category-badge">{project.category}</span>
                                </div>
                            </div>
                            <div className="admin-card-content">
                                <h3>{project.title}</h3>
                                <p className="location">{project.location}</p>
                                <div className="admin-card-stats">
                                    <span>{project.size}</span>
                                    <span>{project.year}</span>
                                </div>
                            </div>
                            <div className="admin-card-actions">
                                <button className="action-btn edit" onClick={() => startEditing(project)} title="ערוך">
                                    <Edit size={18} />
                                </button>
                                <button className="action-btn delete" onClick={() => handleDelete(project.id)} title="מחק">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
