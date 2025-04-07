import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Use BrowserRouter for routing
import Login from './pages/Login';
import OrderServiceCrud from './pages/OrderServiceCrud';
import Logout from './pages/Logout';

function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('jwt_token'));

  // Ensure useNavigate is inside Router
  return (
    <Router> {/* Wrap the entire app with Router */}
      <div>
        <nav>
          <Link to="/login">Login</Link>
          {authenticated && (
            <>
              <Link to="/crud">CRUD de Ordens de Serviço</Link>
              <Link to="/logout">Logout</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/crud" element={authenticated ? <OrderServiceCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
