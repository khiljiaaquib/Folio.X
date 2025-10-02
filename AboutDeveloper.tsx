import React, { useEffect } from 'react';

const AboutDeveloper: React.FC = () => {
    useEffect(() => {
        const stardustContainer = document.getElementById('about-stardust');
        if (stardustContainer && stardustContainer.children.length === 0) {
            for (let i = 0; i < 150; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                const size = Math.random() * 2 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.animationDelay = `${Math.random() * 4}s`;
                star.style.opacity = `${Math.random() * 0.5 + 0.2}`;
                stardustContainer.appendChild(star);
            }
        }
    }, []);

    return (
        <div className="luxury-about-page">
            <div id="about-stardust" className="stardust"></div>
            <div className="luxury-about-card">
                <h2 className="luxury-about-title">
                    The Visionaries
                </h2>
                <div className="gold-divider"></div>
                <p className="luxury-about-text mb-4">
                    This platform is a demonstration of passion and skill, brought to life by the students of the Computer Department at the <strong className="college-name">Jagadambha College of Engineering and Technology, Yavatmal</strong>.
                </p>
                <p className="luxury-about-text">
                    Folio.X is our canvas for creativity and a glimpse into a grander vision for the future of professional presentation. It stands as a testament to our dedication to innovation in web technology.
                </p>
            </div>
        </div>
    );
};

export default AboutDeveloper;