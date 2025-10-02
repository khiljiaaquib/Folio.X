
import React, { useState } from 'react';

interface RegisterOverlayProps {
    onClose: () => void;
    onShowLogin: () => void;
}

const RegisterOverlay: React.FC<RegisterOverlayProps> = ({ onClose, onShowLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        // Dummy registration logic
        alert('Registration successful! Please login.');
        onShowLogin();
    };

    return (
        <div id="registerOverlay" className="overlay">
            <div className="overlay-content">
                <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
                <div className="social-login">
                    <div className="social-btn google-btn"><i className="fab fa-google mr-2"></i> Google</div>
                    <div className="social-btn facebook-btn"><i className="fab fa-facebook-f mr-2"></i> Facebook</div>
                </div>
                <div className="text-center my-4 text-gray-300">Or register with email</div>
                <div className="input-group">
                    <label>Full Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full" placeholder="Enter your full name"/>
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full" placeholder="Enter your email"/>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full" placeholder="Create a password"/>
                </div>
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full" placeholder="Confirm your password"/>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded mt-4 hover:from-blue-600 hover:to-purple-700 transition" onClick={handleRegister}>Register</button>
                <p className="mt-4 text-center text-gray-300">
                    Already have an account? <a href="#" className="text-blue-400 hover:underline" onClick={onShowLogin}>Login</a>
                </p>
                <button className="absolute top-4 right-4 text-white" onClick={onClose}><i className="fas fa-times"></i></button>
            </div>
        </div>
    );
};

export default RegisterOverlay;
