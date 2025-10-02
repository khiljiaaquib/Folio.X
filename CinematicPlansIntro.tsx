import React, { useEffect, useState } from 'react';

interface CinematicPlansIntroProps {
    isActive: boolean;
    onEnd: () => void;
}

const DebrisParticles: React.FC = () => {
    const particles = Array.from({ length: 30 });
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {particles.map((_, i) => {
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 200 + 100;
                const dx = `${Math.cos(angle) * distance}px`;
                const dy = `${Math.sin(angle) * distance}px`;

                return (
                    <div
                        key={i}
                        className="debris-particle"
                        style={{
                            '--dx': dx,
                            '--dy': dy,
                            '--duration': `${Math.random() * 0.5 + 0.8}s`
                        } as React.CSSProperties}
                    />
                );
            })}
        </div>
    );
};

const CinematicPlansIntro: React.FC<CinematicPlansIntroProps> = ({ isActive, onEnd }) => {
    const [animationState, setAnimationState] = useState<'idle' | 'intro' | 'impact' | 'reveal' | 'end'>('idle');

    useEffect(() => {
        if (isActive) {
            setAnimationState('intro');

            const timeouts = [
                // Start impact: shake, flash (Pro slam animation is 0.6s, starts at 2.5s)
                setTimeout(() => {
                    setAnimationState('impact');
                }, 3100),
                // End collision, start reveal (Impact effects last ~0.5s)
                setTimeout(() => {
                    setAnimationState('reveal');
                }, 3600), 
                // Hold the revealed logo
                setTimeout(() => {
                    setAnimationState('end');
                }, 5100), // Hold for 1.5s
                // Finish animation
                setTimeout(() => {
                    onEnd();
                }, 5600) // Fade out for 0.5s
            ];

            return () => {
                timeouts.forEach(clearTimeout);
            };
        } else {
            setAnimationState('idle');
        }
    }, [isActive, onEnd]);

    if (!isActive) return null;
    
    const containerClasses = `cinematic-container ${animationState === 'impact' ? 'shake' : ''}`;
    const flashClasses = `impact-flash-effect ${animationState === 'impact' ? 'boom' : ''}`;
    const particleWrapperClasses = `absolute top-0 left-0 w-full h-full ${animationState === 'impact' ? 'explode' : ''}`;

    const showInitialElements = animationState === 'intro' || animationState === 'impact';
    const showCombinedElement = animationState === 'reveal' || animationState === 'end';

    return (
        <div className={`cinematic-intro-overlay ${isActive ? 'active' : ''} ${animationState === 'end' ? 'fade-out' : ''}`}>
            <div className={containerClasses}>
                {/* Initial animation elements, hidden after impact */}
                <div className={`cinematic-text-container ${showInitialElements ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="folio-gold">
                        <span className="folio-f">F</span>
                        <span className="folio-olio">olio.X</span>
                    </div>
                    <div className="pro-white">Pro</div>
                </div>

                {/* Combined Logo - revealed after impact */}
                <div className={`folio-pro-combined ${showCombinedElement ? 'reveal' : ''}`}>
                    <span className="gold">Folio.X</span>
                    <sup>
                      <span className="white">pro</span>
                    </sup>
                </div>
                
                {/* Effects */}
                <div className={flashClasses}></div>
                <div className={particleWrapperClasses}>
                     <DebrisParticles />
                </div>
            </div>
        </div>
    );
};

export default CinematicPlansIntro;