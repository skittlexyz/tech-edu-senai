import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/token/', { username, password });
            const token = response.data.access;
            localStorage.setItem('jwt_token', token);
            setAuthenticated(true);
            navigate("/serviceorder")
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message || 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error during login:', errorMessage);
        }
    };

    return (
        <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
            <h2 className="text-2xl">Login</h2>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <input
                    className='border px-2 rounded-md py-1'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='border px-2 rounded-md py-1'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className='border rounded-md cursor-pointer hover:text-red-500 px-2 py-1' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
