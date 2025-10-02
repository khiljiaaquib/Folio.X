import React, { useState } from 'react';

interface PaymentPageProps {
    onClose: () => void;
    onPaymentSuccess: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onClose, onPaymentSuccess }) => {
    const [selectedMethod, setSelectedMethod] = useState<'googlepay' | 'phonepe' | null>(null);
    const [error, setError] = useState('');

    const handlePayNow = () => {
        if (!selectedMethod) {
            setError('Please select a payment method.');
            return;
        }
        setError('');
        // Simulate payment success and trigger the next step in the upgrade flow
        onPaymentSuccess();
    };

    return (
        <div className="overlay payment-overlay">
            <div className="overlay-content">
                <h2 className="payment-title">Secure Checkout</h2>
                <div className="payment-options">
                    <div 
                        className={`payment-option ${selectedMethod === 'googlepay' ? 'selected' : ''}`}
                        onClick={() => setSelectedMethod('googlepay')}
                    >
                        <i className="fab fa-google-pay payment-icon"></i>
                        <span>Google Pay</span>
                    </div>
                    <div 
                        className={`payment-option ${selectedMethod === 'phonepe' ? 'selected' : ''}`}
                        onClick={() => setSelectedMethod('phonepe')}
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="payment-icon phonepe-icon" />
                        <span>PhonePe</span>
                    </div>
                </div>
                {error && <div className="error-message text-center mb-4">{error}</div>}
                <button className="pay-now-btn" onClick={handlePayNow}>
                    Pay Now - Rs 299/-
                </button>
                <button className="absolute top-4 right-4 text-white" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
