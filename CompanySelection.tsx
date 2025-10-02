import React, { useState } from 'react';

const companies = [
  'Google', 'Apple', 'Meta', 'Amazon', 'Microsoft', 'Netflix', 'Tesla', 'Nvidia',
  'Adobe', 'Salesforce', 'Oracle', 'Intel', 'IBM', 'Cisco', 'Qualcomm', 'Broadcom',
  'AMD', 'Texas Instruments', 'Micron', 'Shopify', 'Spotify', 'Uber', 'Lyft', 'Airbnb',
  'Pinterest', 'X', 'Snap', 'Zoom', 'Slack', 'Atlassian', 'Square', 'PayPal',
  'Stripe', 'Coinbase', 'Robinhood', 'Goldman Sachs', 'J.P. Morgan', 'Morgan Stanley',
  'BlackRock', 'McKinsey & Company', 'Boston Consulting Group', 'Bain & Company',
  'Deloitte', 'PwC', 'EY', 'KPMG', 'Accenture', 'Capgemini', 'Tata Consultancy',
  'Infosys', 'Wipro', 'HCL', 'Cognizant', 'ByteDance', 'Tencent', 'Alibaba',
  'Samsung', 'Sony', 'Toyota', 'Honda', 'Ford', 'General Motors', 'Boeing', 'Lockheed Martin',
  'Northrop Grumman', 'Raytheon', 'SpaceX', 'Blue Origin', 'NASA', 'JPL', 'Disney',
  'Warner Bros Discovery', 'Comcast', 'AT&T', 'Verizon', 'T-Mobile', 'Walmart', 'Target',
  'Costco', 'Home Depot', 'Lowe\'s', 'Starbucks', 'McDonald\'s', 'Coca-Cola', 'PepsiCo',
  'Procter & Gamble', 'Johnson & Johnson', 'Pfizer', 'Moderna', 'Merck', 'Nike',
  'Adidas', 'LVMH', 'Kering', 'Rolex', 'Ferrari', 'Lamborghini', 'Porsche', 'BMW', 'Mercedes-Benz',
  'Intel', 'Oracle', 'SAP', 'VMware', 'Dell', 'HP', 'Lenovo'
];

interface CompanySelectionProps {
    onTargetDefined: (company: string, role: string) => void;
}

const CompanySelection: React.FC<CompanySelectionProps> = ({ onTargetDefined }) => {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [targetRole, setTargetRole] = useState('');

    const handleLogoClick = (company: string) => {
        setSelectedCompany(company);
        setShowRoleModal(true);
    };
    
    const handleRoleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (targetRole.trim()) {
            onTargetDefined(selectedCompany, targetRole);
            setShowRoleModal(false);
        }
    };
    
    return (
        <>
            <div className="company-selection-page">
                <h2 className="company-selection-title">Select Your Target Company</h2>
                <p className="company-selection-subtitle">Click a logo to begin tailoring your resume for your dream job.</p>
                <div className="logo-grid">
                    {companies.map(company => (
                        <div key={company} className="logo-card" title={`Target ${company}`} onClick={() => handleLogoClick(company)}>
                           <div className="logo-img-wrapper">
                             <img 
                                src={`https://logo.clearbit.com/${company.toLowerCase().replace(/\s*(&|\.)\s*/g, '').replace(/\s+/g, '')}.com?size=100`} 
                                alt={`${company} Logo`} 
                                className="company-logo"
                             />
                           </div>
                           <span className="company-name">{company}</span>
                        </div>
                    ))}
                </div>
            </div>

            {showRoleModal && (
                <div className="overlay target-role-modal">
                    <div className="overlay-content">
                        <h2 className="target-role-title">Target Role at {selectedCompany}</h2>
                        <p className="text-center text-gray-300 mb-4">What job title are you applying for?</p>
                        <form onSubmit={handleRoleSubmit}>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    placeholder="e.g., Senior Software Engineer"
                                    className="text-center"
                                    required
                                />
                            </div>
                            <button type="submit" className="continue-btn w-full">
                                Create My AI Resume Plan
                            </button>
                        </form>
                         <button className="absolute top-4 right-4 text-white" onClick={() => setShowRoleModal(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompanySelection;