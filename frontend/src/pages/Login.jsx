import React, { useState } from 'react';
import axios from '../services/axios';

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/token/', { username, password });
            const token = response.data.access;
            localStorage.setItem('jwt_token', token);

            setAuthenticated(true);
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message || 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error during login:', errorMessage);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
