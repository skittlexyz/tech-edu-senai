import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthenticated }) => {
  const navigate = useNavigate(); // Now you can safely use navigate here

  useEffect(() => {
    localStorage.removeItem('jwt_token'); // Remove the token
    setAuthenticated(false); // Update state
    navigate('/login'); // Navigate to login page after logout
  }, [navigate, setAuthenticated]);

  return (
    <div>
      <h2>Logout</h2>
      <p>Você foi desconectado com sucesso.</p>
    </div>
  );
};

export default Logout;
