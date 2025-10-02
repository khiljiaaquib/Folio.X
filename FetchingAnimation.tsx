import React, { useEffect } from 'react';

interface FetchingAnimationProps {
    onEnd: () => void;
}

const FetchingAnimation: React.FC<FetchingAnimationProps> = ({ onEnd }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onEnd();
        }, 4000); // Animation duration

        return () => clearTimeout(timer);
    }, [onEnd]);

    return (
        <div className="fetching-overlay">
            <div className="quantum-core">
                <div className="quantum-square" style={{'--start-rot': '0deg', '--end-rot': '45deg'} as React.CSSProperties}></div>
                <div className="quantum-square" style={{'--start-rot': '45deg', '--end-rot': '0deg'} as React.CSSProperties}></div>
            </div>
            <div className="fetching-text">
                FETCHING EXECUTIVE ACCESS...
            </div>
        </div>
    );
};

export default FetchingAnimation;
