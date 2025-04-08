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
        <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
            <h2 className="text-2xl">Register</h2>
            <form className='flex flex-col gap-4' onSubmit={handleRegister}>
                <input
                    className='border px-2 rounded-md py-1'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className='border px-2 rounded-md py-1'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className='border px-2 rounded-md py-1'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button className='border rounded-md cursor-pointer hover:text-red-500 px-2 py-1'  type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
