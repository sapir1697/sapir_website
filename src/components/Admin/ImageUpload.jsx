import React, { useRef, useState } from 'react';
import { Upload, X, Scissors, Link } from 'lucide-react';
import ImageEditor from './ImageEditor';

const ImageUpload = ({ value, onChange, placeholder = "גרור תמונה או לחץ להעלאה", className = "", recommendedSize, aspectRatio = 4 / 3 }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const [urlInput, setUrlInput] = useState('');
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setTempImage(reader.result);
            setIsEditing(true);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveCrop = (croppedImage) => {
        onChange(croppedImage);
        setIsEditing(false);
        setTempImage(null);
        setUrlInput('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCancelCrop = () => {
        setIsEditing(false);
        setTempImage(null);
        // We don't clear urlInput here to let user fix it if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleEditExisting = () => {
        if (value) {
            setTempImage(value);
            setIsEditing(true);
        }
    };

    const handleUrlSubmit = () => {
        if (urlInput && (urlInput.startsWith('http') || urlInput.startsWith('data:'))) {
            setTempImage(urlInput);
            setIsEditing(true);
        }
    };

    return (
        <>
            {isEditing && (
                <div className="image-editor-modal" onClick={handleCancelCrop}>
                    <div onClick={e => e.stopPropagation()}>
                        <ImageEditor
                            imageSrc={tempImage}
                            aspect={aspectRatio}
                            onCancel={handleCancelCrop}
                            onSave={handleSaveCrop}
                            recommendedSize={recommendedSize}
                        />
                    </div>
                </div>
            )}

            <div className={`image-upload-wrapper ${className}`}>
                <div
                    className={`image-drop-zone ${isDragging ? 'dragging' : ''} ${value ? 'has-image' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => !value && fileInputRef.current?.click()}
                >
                    {value ? (
                        <div className="preview-container">
                            <img src={value} alt="Preview" />
                            <div className="preview-actions">
                                <button
                                    type="button"
                                    className="preview-btn edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditExisting();
                                    }}
                                    title="ערוך חיתוך"
                                >
                                    <Scissors size={14} />
                                </button>
                                <button
                                    type="button"
                                    className="preview-btn remove"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange('');
                                    }}
                                    title="הסר תמונה"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="upload-placeholder">
                            <Upload size={24} className="upload-icon" />
                            <span>{placeholder}</span>
                            {recommendedSize && (
                                <span className="upload-subtext" style={{ color: '#ef4444', fontWeight: 500, marginTop: '4px' }}>
                                    גודל מומלץ: {recommendedSize}
                                </span>
                            )}
                            <span className="upload-subtext">או הדבק קישור למטה</span>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden-file-input"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                {!value && (
                    <div className="url-input-container">
                        <Link size={16} className="url-icon" />
                        <input
                            type="text"
                            className="url-input-fallback"
                            placeholder="או הדבק קישור ישיר לתמונה..."
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleUrlSubmit();
                                }
                            }}
                        />
                        {urlInput && (
                            <button type="button" className="url-submit-btn" onClick={handleUrlSubmit}>
                                אשר
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ImageUpload;
