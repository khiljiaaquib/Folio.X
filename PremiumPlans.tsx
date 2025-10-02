import React, { useEffect } from 'react';

interface PremiumPlansProps {
    onAcquirePro: () => void;
    onGoToBuilder: () => void;
}

const PremiumPlans: React.FC<PremiumPlansProps> = ({ onAcquirePro, onGoToBuilder }) => {
    
    useEffect(() => {
        const createStardust = () => {
            const stardustContainer = document.getElementById('stardust-container');
            if (stardustContainer && stardustContainer.children.length === 0) {
                // Create stars
                for (let i = 0; i < 150; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.left = `${Math.random() * 100}%`;
                    star.style.top = `${Math.random() * 100}%`;
                    const size = Math.random() * 3 + 1;
                    star.style.width = `${size}px`;
                    star.style.height = `${size}px`;
                    star.style.animationDelay = `${Math.random() * 4}s`;
                    star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
                    stardustContainer.appendChild(star);
                }
                // Create astral rays
                for (let i = 0; i < 8; i++) {
                    const ray = document.createElement('div');
                    ray.className = 'astral-ray';
                    ray.style.left = `${Math.random() * 100}%`;
                    ray.style.animationDelay = `${Math.random() * 6}s`;
                    ray.style.transform = `rotate(${Math.random() * 360}deg)`;
                    stardustContainer.appendChild(ray);
                }
            }
        };
        createStardust();
    }, []);

    return (
        <div className="relative">
            <div id="stardust-container" className="stardust"></div>
            <section className="luxury-section">
                <h2 className="luxury-title">Folio.X Pro</h2>
                <p className="luxury-subtitle">Elevate your professional presence with our pro plan</p>
                <div className="plans-container">
                    {/* Free Plan */}
                    <div className="plan-card free">
                        <div className="plan-header">
                            <div className="plan-icon free"><i className="fas fa-gem"></i></div>
                            <h3 className="plan-name free">Essential Tier</h3>
                            <div className="plan-price free">Rs.0.00/-</div>
                            <div className="plan-period">always free</div>
                        </div>
                        <ul className="plan-features">
                            <li className="plan-feature"><i className="fas fa-check feature-icon available"></i><span>Ordinary Resume</span></li>
                            <li className="plan-feature"><i className="fas fa-check feature-icon available"></i><span>Standard PDF Export</span></li>
                            <li className="plan-feature"><i className="fas fa-check feature-icon available"></i><span>Simpler Templates</span></li>
                            <li className="plan-feature"><i className="fas fa-times feature-icon unavailable"></i><span>Company-Specific Resumes</span></li>
                            <li className="plan-feature"><i className="fas fa-times feature-icon unavailable"></i><span>Priority Concierge Support</span></li>
                            <li className="plan-feature"><i className="fas fa-times feature-icon unavailable"></i><span>ATS Optimization Suite</span></li>
                            <li className="plan-feature"><i className="fas fa-times feature-icon unavailable"></i><span>Executive Branding Tools</span></li>
                        </ul>
                        <button className="plan-button free" onClick={onGoToBuilder}>ACQUIRE PLATINUM</button>
                    </div>
                    {/* Pro Plan */}
                    <div className="plan-card pro">
                        <div className="luxury-badge">MOST POPULAR</div>
                        <div className="plan-header">
                            <div className="plan-icon pro"><i className="fas fa-crown"></i></div>
                            <h3 className="plan-name pro"><i className="fas fa-crown crown-icon"></i> Executive Tier</h3>
                            <div className="plan-price pro">Rs 299/-</div>
                            <div className="plan-period">monthly premium</div>
                        </div>
                        <ul className="plan-features">
                            <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span>All Luxury Templates Collection</span></li>
                            <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span><strong>AI Assistant Zyra</strong> with Voice Command</span></li>
                            <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span><strong>AI-Based Summary</strong> Generation</span></li>
                            <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span>ATS Optimization & Tracking</span></li>
                            <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span><strong>LinkedIn Profile</strong> Integration & Sync</span></li>
                             <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span><strong>AI Interview Preparation</strong> Toolkit</span></li>
                            <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span>Executive Personal Branding Suite</span></li>
                            <li className="plan-feature"><i className="fas fa-crown feature-icon pro-only"></i><span>24/7 Priority Concierge Support</span></li>
                        </ul>
                        <button className="plan-button pro" onClick={onAcquirePro}>ACQUIRE GOLD</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PremiumPlans;