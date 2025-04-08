import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Use BrowserRouter for routing
import Login from './pages/Login';
import ServiceOrderCrud from './pages/ServiceOrderCrud';
import AmbientCrud from './pages/AmbientCrud';
import Logout from './pages/Logout';
import MaintainerCrud from './pages/MaintainerCrud';
import HeritageCrud from './pages/HeritageCrud';
import ManagerCrud from './pages/ManagerCrud';
import ResponsibleCrud from './pages/ResponsibleCrud';

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
              <Link to="/serviceorder">CRUD de Ordens de Serviço</Link>
              <Link to="/maintainer">CRUD de Manutentores</Link>
              <Link to="/heritage">CRUD de Patrimônios</Link>
              <Link to="/ambient">Crud de Ambientes</Link>
              <Link to="/manager">Crud de Gestores</Link>
              <Link to="/responsible">Crud de Responsáveis</Link>
              <Link to="/logout">Logout</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/serviceorder" element={authenticated ? <ServiceOrderCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/maintainer" element={authenticated ? <MaintainerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/heritage" element={authenticated ? <HeritageCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/ambient" element={authenticated ? <AmbientCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/manager" element={authenticated ? <ManagerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/responsible" element={authenticated ? <ResponsibleCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
