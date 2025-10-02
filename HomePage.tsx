
import React from 'react';

interface HomePageProps {
    onExplore: () => void;
}

const whyChooseUsCards = [
    { title: "Easier Resumes", description: "Get instant resume on your device." },
    { title: "Custom Templates", description: "Modern templates for every profession." },
    { title: "Information gathering", description: "Optimize your resume with required details." },
    { title: "PDF Export", description: "Download instantly in professional format." },
    { title: "Aesthetic Designs", description: "Beautifully designed resume templates." },
];

const howToUseCards = [
    { title: "1. Enter Details", description: "Add your education, experience, and skills." },
    { title: "2. Select Template", description: "Choose from modern, recruiter-approved templates." },
    { title: "3. Preview & Edit", description: "Customize and perfect your resume." },
    { title: "4. Download", description: "Get a professional PDF ready to send." },
];

const ScrollCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="card w-[300px] md:w-auto">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onExplore }) => {
    return (
        <div className="w-full scroll-smooth pt-16">
            <div className="hero text-center py-20">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Write Your Resume with Folio.X</h1>
                <p className="text-xl md:text-2xl mb-6">Create professional resumes in minutes that get noticed by recruiters.</p>
            </div>

            <h2 className="section-title">Why Choose Us</h2>
            <div className="scroll-section">
                {whyChooseUsCards.map(card => <ScrollCard key={card.title} {...card} />)}
            </div>

            <h2 className="section-title mt-12">How to Use</h2>
            <div className="scroll-section">
                {howToUseCards.map(card => <ScrollCard key={card.title} {...card} />)}
            </div>

            <div className="cta text-center my-20 px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Building Your Future Today</h2>
                <button className="liquid-btn" onClick={onExplore}>Explore Folio.X</button>
            </div>

            <footer className="text-center py-6">
                © 2025 Folio.X | <a href="#" className="text-blue-400">Contact</a> | <a href="#" className="text-blue-400">Privacy</a>
            </footer>
        </div>
    );
};

export default HomePage;
