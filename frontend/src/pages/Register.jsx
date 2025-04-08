import React, { useState } from 'react';
import axios from '../services/axios';

const Register = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await axios.post('/register/', userData);
            setSuccessMessage('User registered successfully. Please login.');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message || 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error during registration:', errorMessage);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
