import React, { useState, useEffect, useCallback } from 'react';
import {
    Accessibility as AccessibilityIcon,
    X,
    Type,
    Contrast,
    Layers,
    Link as LinkIcon,
    RotateCcw,
    Eye,
    MousePointer2,
    Moon,
    ZapOff,
    Rows
} from 'lucide-react';
import './Accessibility.css';

const Accessibility = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [guideY, setGuideY] = useState(-100);
    const [activeSettings, setActiveSettings] = useState({
        grayscale: false,
        highContrast: false,
        readableFont: false,
        highlightLinks: false,
        stopAnimations: false,
        bigCursor: false,
        darkMode: false,
        readingGuide: false,
        fontSize: 0, // 0: standard, 1: large, 2: extra large
    });

    // Handle Mouse Move for Reading Guide
    const handleMouseMove = useCallback((e) => {
        if (activeSettings.readingGuide) {
            setGuideY(e.clientY);
        }
    }, [activeSettings.readingGuide]);

    useEffect(() => {
        if (activeSettings.readingGuide) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeSettings.readingGuide, handleMouseMove]);

    // Apply settings to body whenever they change
    useEffect(() => {
        const body = document.body;

        // Font size
        body.classList.remove('font-xl', 'font-xxl');
        if (activeSettings.fontSize === 1) body.classList.add('font-xl');
        if (activeSettings.fontSize === 2) body.classList.add('font-xxl');

        // Toggles
        body.classList.toggle('acc-grayscale', activeSettings.grayscale);
        body.classList.toggle('acc-high-contrast', activeSettings.highContrast);
        body.classList.toggle('acc-readable-font', activeSettings.readableFont);
        body.classList.toggle('acc-highlight-links', activeSettings.highlightLinks);
        body.classList.toggle('acc-stop-animations', activeSettings.stopAnimations);
        body.classList.toggle('acc-big-cursor', activeSettings.bigCursor);
        body.classList.toggle('acc-dark-mode', activeSettings.darkMode);

        // Save to local storage
        localStorage.setItem('spir_accessibility', JSON.stringify(activeSettings));
    }, [activeSettings]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('spir_accessibility');
        if (saved) {
            try {
                setActiveSettings(JSON.parse(saved));
            } catch (e) {
                console.error("Could not parse accessibility settings", e);
            }
        }
    }, []);

    const toggleSetting = (key) => {
        setActiveSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const cycleFontSize = () => {
        setActiveSettings(prev => ({
            ...prev,
            fontSize: (prev.fontSize + 1) % 3
        }));
    };

    const resetSettings = () => {
        setActiveSettings({
            grayscale: false,
            highContrast: false,
            readableFont: false,
            highlightLinks: false,
            stopAnimations: false,
            bigCursor: false,
            darkMode: false,
            readingGuide: false,
            fontSize: 0,
        });
    };

    return (
        <div className="accessibility-widget" dir="rtl">
            <button
                className={`accessibility-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="תפריט נגישות"
                aria-expanded={isOpen}
            >
                <AccessibilityIcon size={28} />
            </button>

            {isOpen && (
                <div className="accessibility-panel">
                    <div className="accessibility-header">
                        <h3>תפריט נגישות</h3>
                        <button className="close-panel" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="accessibility-body">
                        <button
                            className={`accessibility-option ${activeSettings.fontSize > 0 ? 'active' : ''}`}
                            onClick={cycleFontSize}
                        >
                            <Type size={20} className="option-icon" />
                            <span className="option-text">גודל טקסט: {activeSettings.fontSize === 1 ? 'גדול' : activeSettings.fontSize === 2 ? 'ענק' : 'רגיל'}</span>
                        </button>

                        <button
                            className={`accessibility-option ${activeSettings.darkMode ? 'active' : ''}`}
                            onClick={() => toggleSetting('darkMode')}
                        >
                            <Moon size={20} className="option-icon" />
                            <span className="option-text">מצב כהה</span>
                        </button>

                        <button
                            className={`accessibility-option ${activeSettings.grayscale ? 'active' : ''}`}
                            onClick={() => toggleSetting('grayscale')}
                        >
                            <Layers size={20} className="option-icon" />
                            <span className="option-text">גווני אפור</span>
                        </button>

                        <button
                            className={`accessibility-option ${activeSettings.highContrast ? 'active' : ''}`}
                            onClick={() => toggleSetting('highContrast')}
                        >
                            <Contrast size={20} className="option-icon" />
                            <span className="option-text">ניגודיות</span>
                        </button>

                        <button
                            className={`accessibility-option ${activeSettings.readableFont ? 'active' : ''}`}
                            onClick={() => toggleSetting('readableFont')}
                        >
                            <Eye size={20} className="option-icon" />
                            <span className="option-text">גופן קריא</span>
                        </button>

                        <button
                            className={`accessibility-option ${activeSettings.highlightLinks ? 'active' : ''}`}
                            onClick={() => toggleSetting('highlightLinks')}
                        >
                            <LinkIcon size={20} className="option-icon" />
                            <span className="option-text">הדגשת לינקים</span>
                        </button>

                        <button
                            className={`accessibility-option ${activeSettings.bigCursor ? 'active' : ''}`}
                            onClick={() => toggleSetting('bigCursor')}
                        >
                            <MousePointer2 size={20} className="option-icon" />
                            <span className="option-text">סמן גדול</span>
                        </button>

                        <button
                            className={`accessibility-option ${activeSettings.stopAnimations ? 'active' : ''}`}
                            onClick={() => toggleSetting('stopAnimations')}
                        >
                            <ZapOff size={20} className="option-icon" />
                            <span className="option-text">עצור אנימציה</span>
                        </button>

                        <button
                            className={`accessibility-option full-width ${activeSettings.readingGuide ? 'active' : ''}`}
                            onClick={() => toggleSetting('readingGuide')}
                        >
                            <Rows size={20} className="option-icon" />
                            <span className="option-text">סמן קריאה (Reading Guide)</span>
                        </button>
                    </div>

                    <div className="accessibility-footer">
                        <button className="reset-btn" onClick={resetSettings}>
                            <RotateCcw size={16} />
                            <span>איפוס הגדרות</span>
                        </button>
                    </div>
                </div>
            )}

            {activeSettings.readingGuide && (
                <div
                    className="reading-guide"
                    style={{ top: `${guideY}px` }}
                />
            )}
        </div>
    );
};

export default Accessibility;
