import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import { ZoomIn, ZoomOut, Check, X, RotateCw, AlertCircle } from 'lucide-react';
import './Admin.css';

const ImageEditor = ({ imageSrc, aspect = 4 / 3, onCancel, onSave, recommendedSize }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [error, setError] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        setError(null);
        try {
            if (!croppedAreaPixels) return;

            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            );
            onSave(croppedImage);
        } catch (err) {
            console.error('Error cropping image:', err);
            setError('לא ניתן לערוך תמונה זו עקב מגבלות אבטחה של האתר המקורי. ניתן להשתמש בקישור כמו שהוא או להעלות את הקובץ מהמחשב.');
        }
    }, [imageSrc, croppedAreaPixels, rotation, onSave]);

    return (
        <div className="image-editor-container">
            <div className="editor-header">
                <h3>עריכת תמונה</h3>
                {recommendedSize && <span className="recommended-badge">{recommendedSize}</span>}
                <button type="button" className="close-editor-btn" onClick={onCancel} title="סגור">
                    <X size={20} />
                </button>
            </div>

            <div className="crop-container">
                {error ? (
                    <div className="editor-error-state">
                        <AlertCircle size={48} color="#ef4444" />
                        <p>{error}</p>
                        <div className="error-actions">
                            <button type="button" className="btn-primary" onClick={() => onSave(imageSrc)}>
                                השתמש בקישור המקורי
                            </button>
                            <button type="button" className="btn-secondary" onClick={onCancel}>
                                ביטול
                            </button>
                        </div>
                    </div>
                ) : (
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                        crossOrigin="anonymous"
                    />
                )}
            </div>

            {!error && (
                <div className="editor-controls">
                    <div className="control-group">
                        <label>זום</label>
                        <div className="slider-wrapper">
                            <ZoomOut size={16} />
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="custom-range"
                            />
                            <ZoomIn size={16} />
                        </div>
                    </div>

                    <div className="control-group">
                        <label>סיבוב</label>
                        <div className="slider-wrapper">
                            <RotateCw size={16} />
                            <input
                                type="range"
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                aria-labelledby="Rotation"
                                onChange={(e) => setRotation(Number(e.target.value))}
                                className="custom-range"
                            />
                        </div>
                    </div>

                    <div className="editor-actions">
                        <button type="button" className="btn-secondary" onClick={onCancel}>ביטול</button>
                        <button type="button" className="btn-primary" onClick={showCroppedImage}>
                            <Check size={18} /> שמור חיתוך
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageEditor;
