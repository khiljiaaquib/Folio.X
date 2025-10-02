import React from 'react';

interface ZyraIntroPopupProps {
    onClose: () => void;
}

const ZyraIntroPopup: React.FC<ZyraIntroPopupProps> = ({ onClose }) => {
    return (
        <div className="overlay">
            <div className="overlay-content zyra-popup-content">
                <div className="zyra-icon">
                    <i className="fas fa-brain"></i>
                </div>
                <h2 className="zyra-title">Introducing Zyra</h2>
                <p className="zyra-subtitle">
                    Your personal AI assistant, integrated to elevate your resume to perfection.
                    Use voice commands, generate summaries, and get ATS-optimized suggestions instantly.
                </p>
                <button className="continue-btn" onClick={onClose}>
                    Begin
                </button>
            </div>
        </div>
    );
};

export default ZyraIntroPopup;