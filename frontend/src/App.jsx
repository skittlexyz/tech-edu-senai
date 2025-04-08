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
      <div className='w-screen h-screen bg-neutral-800 text-white flex flex-col'>
        <nav className='bg-neutral-900 w-screen h-fit py-4 flex justify-between items-start gap-8 px-4'>
          <h1 className='text-xl font-bold'>Gerenciador<br/><span className='text-red-500'>SENAI</span></h1>
          <div className='flex gap-8 flex-wrap'>
            <a className='hover:underline' href="/register">Register</a>
            <a className='hover:underline' href="/login">Login</a>
            {authenticated && (
              <>
                <a className='hover:underline' href="/serviceorder">CRUD de Ordens de Serviço</a>
                <a className='hover:underline' href="/maintainer">CRUD de Manutentores</a>
                <a className='hover:underline' href="/heritage">CRUD de Patrimônios</a>
                <a className='hover:underline' href="/ambient">Crud de Ambientes</a>
                <a className='hover:underline' href="/manager">Crud de Gestores</a>
                <a className='hover:underline' href="/responsible">Crud de Responsáveis</a>
                <a className='hover:underline' href="/history">Crud de Histórico</a>
                <a className='hover:underline' href="/logout">Logout</a>
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
        <div className='bg-neutral-900 w-screen flex justify-center text-neutral-500 py-4'>
              SENAI 2025
        </div>
      </div>
    </Router>
  );
}

export default App;
