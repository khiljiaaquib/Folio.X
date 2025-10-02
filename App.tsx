import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import HomePage from './components/HomePage';
import ResumeBuilder from './components/ResumeBuilder';
import PremiumPlans from './components/PremiumPlans';
import Particles from './components/Particles';
import LoginOverlay from './components/LoginOverlay';
import RegisterOverlay from './components/RegisterOverlay';
import AboutDeveloper from './components/AboutDeveloper';
import CinematicPlansIntro from './components/CinematicPlansIntro';
import PaymentPage from './components/PaymentPage';
import FetchingAnimation from './components/FetchingAnimation';
import ZyraIntroPopup from './components/ZyraIntroPopup';
import PremiumResumeBuilder from './components/PremiumResumeBuilder';
import FloatingAssistant from './components/FloatingAssistant';
import CompanySelection from './components/CompanySelection';
import NavigationControls from './components/NavigationControls';
import { GoogleGenAI, Type } from "@google/genai";
import type { ResumePlan } from './types';

type View = 'intro' | 'home' | 'builder' | 'plans' | 'about' | 'profile' | 'companySelection';

const App: React.FC = () => {
    const [view, setView] = useState<View>('intro');
    const [viewHistory, setViewHistory] = useState<View[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProUser, setIsProUser] = useState(false);
    
    // UI State
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCinematicIntro, setShowCinematicIntro] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showFetching, setShowFetching] = useState(false);
    const [showZyraIntro, setShowZyraIntro] = useState(false);
    
    // Premium Builder State
    const [targetCompany, setTargetCompany] = useState<string | null>(null);
    const [targetRole, setTargetRole] = useState<string | null>(null);
    const [resumePlan, setResumePlan] = useState<ResumePlan | null>(null);
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

    const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);
    
    const checkAuthStatus = () => {
        const authStatus = localStorage.getItem('folioXAuth');
        if (authStatus === 'true') {
            setIsLoggedIn(true);
            document.body.classList.add('logged-in');
            document.body.classList.remove('logged-out');
        } else {
            setIsLoggedIn(false);
            document.body.classList.add('logged-out');
            document.body.classList.remove('logged-in');
        }
        
        const proStatus = localStorage.getItem('folioXPro');
        setIsProUser(proStatus === 'true');
    };

    // --- Navigation ---
    const setViewWithHistory = (newView: View) => {
        if (newView !== view) {
            setViewHistory(prev => [...prev, view]);
            setView(newView);
        }
    };

    const handleBack = () => {
        const lastView = viewHistory[viewHistory.length - 1];
        if (lastView) {
            setViewHistory(prev => prev.slice(0, -1));
            setView(lastView);
        }
    };

    const handleHome = () => {
        setViewHistory([]);
        setView('home');
    };
    
    const handleLogin = () => {
        localStorage.setItem('folioXAuth', 'true');
        checkAuthStatus();
        setShowLogin(false);
        if (postLoginAction) {
            postLoginAction();
            setPostLoginAction(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('folioXAuth');
        localStorage.removeItem('folioXPro');
        setTargetCompany(null);
        setTargetRole(null);
        setResumePlan(null);
        setIsProUser(false);
        checkAuthStatus();
        handleHome();
    };
    
    // --- Premium Upgrade Flow ---
    const handleAcquirePro = () => {
        const action = () => setShowPayment(true);
        if (!isLoggedIn) {
            setPostLoginAction(() => action);
            setShowLogin(true);
        } else {
            action();
        }
    };
    
    const handlePaymentSuccess = () => {
        setShowPayment(false);
        setShowFetching(true);
    };
    
    const handleFetchingEnd = () => {
        setShowFetching(false);
        localStorage.setItem('folioXPro', 'true');
        setIsProUser(true);
        setShowZyraIntro(true);
    };
    
    const handleZyraIntroClose = () => {
        setShowZyraIntro(false);
        setViewWithHistory('companySelection');
    };

    const handleTargetDefined = async (company: string, role: string) => {
        setTargetCompany(company);
        setTargetRole(role);
        setIsGeneratingPlan(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `
                Act as an expert career coach and resume designer for a candidate applying for the role of '${role}' at '${company}'. First, determine if this is a creative industry (e.g., design, media, arts) or a corporate/MNC/tech industry. 
                
                - If it's a corporate/MNC/tech role, create an ATS-friendly resume plan. Prioritize 'experience' and 'skills'. Recommend a professional template like 'professional' or 'executive'.
                - If it's a creative role, create a plan that highlights creativity. Prioritize 'summary' and 'projects'. Recommend a more visual template like 'modern' or 'creative'.

                Your output MUST be a valid JSON object with these keys: 'sections', 'ai_suggestions'.
                - 'sections': An array of strings, ordered by importance for this specific role and industry.
                - 'ai_suggestions': An object with actionable tips for each section, tailored to the role and company.
            `;
            
            const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    sections: { type: Type.ARRAY, items: { type: Type.STRING } },
                    ai_suggestions: { type: Type.OBJECT,
                      properties: {
                          personal: { type: Type.STRING },
                          summary: { type: Type.STRING },
                          experience: { type: Type.STRING },
                          skills: { type: Type.STRING },
                          projects: { type: Type.STRING },
                          education: { type: Type.STRING },
                      }
                    }
                  }
                }
              }
            });

            const plan = JSON.parse(response.text) as ResumePlan;
            setResumePlan(plan);
            setViewWithHistory('builder');
        } catch (error) {
            console.error("AI Resume Plan Generation Error:", error);
            alert("Failed to generate an AI-powered resume plan. Using a default layout.");
            setResumePlan({
                sections: ['summary', 'experience', 'skills', 'projects', 'education'],
                ai_suggestions: { personal: "Ensure your contact information is up to date.", summary: "Write a powerful summary highlighting your key achievements." }
            });
            setViewWithHistory('builder');
        } finally {
            setIsGeneratingPlan(false);
        }
    };

    // --- Navigation Handlers ---
    const requestLoginForAction = (action: () => void) => {
        setPostLoginAction(() => action);
        setShowLogin(true);
    };

    const handleShowPlans = () => {
        setShowCinematicIntro(true);
    };

    const handleCinematicIntroEnd = () => {
        setShowCinematicIntro(false);
        setViewWithHistory('plans');
    };
    
    const handleExplore = () => setViewWithHistory('builder');
    const handleShowAbout = () => setViewWithHistory('about');
    const handleShowProfile = () => setViewWithHistory('profile');

    const renderView = () => {
        if (isGeneratingPlan) {
            return (
                <div className="h-screen w-screen flex flex-col justify-center items-center">
                    <div className="quantum-core">
                        <div className="quantum-square"></div>
                        <div className="quantum-square"></div>
                    </div>
                    <p className="fetching-text mt-8">GENERATING YOUR AI RESUME PLAN...</p>
                </div>
            )
        }

        switch (view) {
            case 'intro':
                return <Intro onEnter={handleHome} />;
            case 'home':
                return <HomePage onExplore={handleExplore} />;
            case 'companySelection':
                return <CompanySelection onTargetDefined={handleTargetDefined} />;
            case 'builder':
                if (isProUser && !resumePlan) {
                    setViewWithHistory('companySelection');
                    return null;
                }
                return isProUser ? (
                    <PremiumResumeBuilder targetCompany={targetCompany!} targetRole={targetRole!} resumePlan={resumePlan!} />
                ) : (
                    <ResumeBuilder 
                        isLoggedIn={isLoggedIn}
                        requestLogin={requestLoginForAction}
                        onPdfGenerated={handleHome}
                    />
                );
            case 'plans':
                return <PremiumPlans onAcquirePro={handleAcquirePro} onGoToBuilder={handleExplore} />;
            case 'about':
                return <AboutDeveloper />;
            case 'profile':
                 if (isProUser) {
                    setViewWithHistory('companySelection');
                    return null; // Avoid flicker
                }
                return <div className="text-center p-20 mt-16">Profile section coming soon.</div>;
            default:
                return <HomePage onExplore={handleExplore} />;
        }
    };

    return (
        <>
            <Particles />
            {view !== 'intro' && <Navbar 
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setShowLogin(true)}
                onLogoutClick={handleLogout}
                onShowPlans={handleShowPlans}
                onShowAbout={handleShowAbout}
                onShowProfile={handleShowProfile}
            />}
            <main>
                {renderView()}
            </main>

            {isProUser && <FloatingAssistant targetRole={targetRole} />}
             {view !== 'intro' && (
                <NavigationControls 
                    onBack={handleBack}
                    onHome={handleHome}
                    showBack={view !== 'home' && viewHistory.length > 0}
                />
            )}

            {showLogin && (
                <LoginOverlay
                    onClose={() => {
                        setShowLogin(false);
                        setPostLoginAction(null);
                    }}
                    onLogin={handleLogin}
                    onShowRegister={() => { setShowLogin(false); setShowRegister(true); }}
                />
            )}
            {showRegister && (
                <RegisterOverlay
                    onClose={() => setShowRegister(false)}
                    onShowLogin={() => { setShowRegister(false); setShowLogin(true); }}
                />
            )}
            {showPayment && (
                <PaymentPage 
                    onClose={() => setShowPayment(false)}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
            {showFetching && <FetchingAnimation onEnd={handleFetchingEnd} />}
            {showZyraIntro && <ZyraIntroPopup onClose={handleZyraIntroClose} />}
            <CinematicPlansIntro isActive={showCinematicIntro} onEnd={handleCinematicIntroEnd} />
        </>
    );
};

export default App;