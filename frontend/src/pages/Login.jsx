import React, { useState } from 'react';
import axios from '../services/axios';

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handling the login
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        try {
            const response = await axios.post('/token/', { username, password });
            const token = response.data.access; // Assuming the token is returned as "access" in the response
            localStorage.setItem('jwt_token', token); // Store the token

            // Update UI state (You can add a callback here to notify the parent component about authentication)
            setAuthenticated(true);

            // Redirect to another page or handle UI state change as needed
            // For example: window.location.href = "/dashboard"; 

        } catch (error) {
            // Handle error (Axios error object)
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
                    type="text"  // Use type="password" for password input
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if there is one */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
