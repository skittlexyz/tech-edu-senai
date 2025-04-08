import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('jwt_token');
    setAuthenticated(false);
    navigate('/login');
  }, [navigate, setAuthenticated]);

  return (
    <div>
      <h2>Logout</h2>
      <p>Você foi desconectado com sucesso.</p>
    </div>
  );
};

export default Logout;
