import React from 'react';

interface NavigationControlsProps {
    onBack: () => void;
    onHome: () => void;
    showBack: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({ onBack, onHome, showBack }) => {
    return (
        <div className="navigation-controls">
            {showBack && (
                <button onClick={onBack} className="nav-control-btn" title="Go Back">
                    <i className="fas fa-arrow-left"></i>
                </button>
            )}
            <button onClick={onHome} className="nav-control-btn" title="Go Home">
                <i className="fas fa-home"></i>
            </button>
        </div>
    );
};

export default NavigationControls;
