import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HistoricoCrud = () => {
    const [historicos, setHistoricos] = useState([]);
    const [newHistorico, setNewHistorico] = useState({ ordem: '', data_encerramento: '' });
    const [orders, setOrders] = useState([]); // Estado para armazenar ordens de serviço
    const [editingHistorico, setEditingHistorico] = useState(null);

    // Função para buscar históricos
    const fetchHistoricos = async () => {
        try {
            const response = await axios.get('/data/historico/');
            setHistoricos(response.data);
        } catch (error) {
            console.error('Error fetching historicos:', error);
        }
    };

    // Função para buscar ordens de serviço
    const fetchOrders = async () => {
        try {
            const response = await axios.get('/data/ordem-servico/');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchHistoricos();
        fetchOrders(); // Buscar ordens de serviço
    }, []);

    // Função para criar um novo histórico
    const handleCreateHistorico = async () => {
        try {
            await axios.post('/data/historico/', newHistorico);
            fetchHistoricos(); // Atualizar lista de históricos
            setNewHistorico({ ordem: '', data_encerramento: '' }); // Resetar o formulário
        } catch (error) {
            console.error('Error creating historico:', error);
        }
    };

    // Função para atualizar um histórico
    const handleUpdateHistorico = async () => {
        try {
            await axios.put(`/data/historico/${editingHistorico.id}/`, newHistorico);
            fetchHistoricos(); // Atualizar lista de históricos
            setEditingHistorico(null); // Resetar o estado de edição
            setNewHistorico({ ordem: '', data_encerramento: '' }); // Resetar o formulário
        } catch (error) {
            console.error('Error updating historico:', error);
        }
    };

    // Função para excluir um histórico
    const handleDeleteHistorico = async (id) => {
        try {
            await axios.delete(`/data/historico/${id}/`);
            fetchHistoricos(); // Atualizar lista de históricos
        } catch (error) {
            console.error('Error deleting historico:', error);
        }
    };

    // Função para editar um histórico
    const handleEditHistorico = (historico) => {
        setEditingHistorico(historico);
        setNewHistorico(historico);
    };

    // Função para listar os históricos
    const listChildren = () => {
        if (historicos.length > 0) {
            return historicos.map((historico) => (
                <li key={historico.id}>
                    Ordem: {historico.ordem?.descricao} - Data de Encerramento: {historico.data_encerramento}
                    <button onClick={() => handleEditHistorico(historico)}>Edit</button>
                    <button onClick={() => handleDeleteHistorico(historico.id)}>Delete</button>
                </li>
            ));
        } else {
            return <p>No historicos found.</p>;
        }
    };

    return (
        <div>
            <h2>Históricos</h2>
            <div>
                {/* Select dropdown para ordens de serviço */}
                <select
                    value={newHistorico.ordem}
                    onChange={(e) => setNewHistorico({ ...newHistorico, ordem: e.target.value })}
                >
                    <option value="">Select Ordem</option>
                    {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                            {order.descricao}
                        </option>
                    ))}
                </select>

                <input
                    type="datetime-local"
                    placeholder="Data de Encerramento"
                    value={newHistorico.data_encerramento}
                    onChange={(e) => setNewHistorico({ ...newHistorico, data_encerramento: e.target.value })}
                />

                <button onClick={editingHistorico ? handleUpdateHistorico : handleCreateHistorico}>
                    {editingHistorico ? 'Update Historico' : 'Create Historico'}
                </button>
            </div>

            <ul>{listChildren()}</ul>
        </div>
    );
};

export default HistoricoCrud;
