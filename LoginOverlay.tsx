import React, { useState } from 'react';

interface LoginOverlayProps {
    onClose: () => void;
    onLogin: () => void;
    onShowRegister: () => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({ onClose, onLogin, onShowRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = () => {
        if (username === 'Aaquib' && password === 'Khilji') {
            setError('');
            onLogin();
        } else {
            setError('Invalid username or password.');
        }
    };
    
    return (
        <div id="loginOverlay" className="overlay">
            <div className="overlay-content">
                <h2 className="text-2xl font-bold mb-4">Login to Folio.X</h2>
                <div className="social-login">
                    <div className="social-btn google-btn"><i className="fab fa-google mr-2"></i> Google</div>
                    <div className="social-btn facebook-btn"><i className="fab fa-facebook-f mr-2"></i> Facebook</div>
                </div>
                <div className="text-center my-4 text-gray-300">Or login with username/password</div>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full" placeholder="Enter your username"/>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full" placeholder="Enter your password"/>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded mt-4 hover:from-blue-600 hover:to-purple-700 transition" onClick={handleLoginClick}>Login</button>
                <p className="mt-4 text-center text-gray-300">
                    Don't have an account? <a href="#" className="text-blue-400 hover:underline" onClick={onShowRegister}>Register</a>
                </p>
                <button className="absolute top-4 right-4 text-white" onClick={onClose}><i className="fas fa-times"></i></button>
            </div>
        </div>
    );
};

export default LoginOverlay;