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
import HistoricoCrud from './pages/HistoryCrud';
import Register from './pages/Register';

function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('jwt_token'));

  return (
    <Router>
      <div>
        <nav>
          <h1>Gerenciador de<br/>Ordens de Serviço</h1>
          <div>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
            {authenticated && (
              <>
                <a href="/serviceorder">CRUD de Ordens de Serviço</a>
                <a href="/maintainer">CRUD de Manutentores</a>
                <a href="/heritage">CRUD de Patrimônios</a>
                <a href="/ambient">Crud de Ambientes</a>
                <a href="/manager">Crud de Gestores</a>
                <a href="/responsible">Crud de Responsáveis</a>
                <a href="/history">Crud de Histórico</a>
                <a href="/logout">Logout</a>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/register" element={<Register setAuthenticated={setAuthenticated} />} />
          <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/serviceorder" element={authenticated ? <ServiceOrderCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/maintainer" element={authenticated ? <MaintainerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/heritage" element={authenticated ? <HeritageCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/ambient" element={authenticated ? <AmbientCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/manager" element={authenticated ? <ManagerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/responsible" element={authenticated ? <ResponsibleCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/history" element={authenticated ? <HistoricoCrud /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
        </Routes>
        <div>
              Footer
        </div>
      </div>
    </Router>
  );
}

export default App;
