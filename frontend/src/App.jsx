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
      <main>
        <nav>
          <span>
            <h1>💾</h1>
            <h1>Gerenciador<br/><span>SENAI</span></h1>
          </span>
          <div>
            {authenticated ? (
              <>
                <a href="/serviceorder">Ordens de Serviço</a>
                <a href="/maintainer">Manutentores</a>
                <a href="/heritage">Patrimônios</a>
                <a href="/ambient">Ambientes</a>
                <a href="/manager">Gestores</a>
                <a href="/responsible">Responsáveis</a>
                <a href="/history">Histórico</a>
                <a href="/logout">Logout</a>
              </>
            ) : (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
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
        <footer>
          © 2025 Gerenciador SENAI. Todos os direitos reservados. 
        </footer>
      </main>
    </Router>
  );
}

export default App;
