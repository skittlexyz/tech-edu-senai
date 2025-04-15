import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HistoryCrud = () => {
    const [historicos, setHistoricos] = useState([]);
    const [newHistorico, setNewHistorico] = useState({ ordem: '', data_encerramento: '' });
    const [orders, setOrders] = useState([]);
    const [editingHistorico, setEditingHistorico] = useState(null);

    const fetchHistoricos = async () => {
        try {
            const response = await axios.get('/data/historico/');
            setHistoricos(response.data);
        } catch (error) {
            console.error('Error fetching historicos:', error);
        }
    };

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
        fetchOrders();
    }, []);

    const handleCreateHistorico = async () => {
        try {
            await axios.post('/data/historico/', newHistorico);
            fetchHistoricos();
            setNewHistorico({ ordem: '', data_encerramento: '' });
        } catch (error) {
            console.error('Error creating historico:', error);
        }
    };

    const handleUpdateHistorico = async () => {
        try {
            await axios.put(`/data/historico/${editingHistorico.id}/`, newHistorico);
            fetchHistoricos();
            setEditingHistorico(null);
            setNewHistorico({ ordem: '', data_encerramento: '' });
        } catch (error) {
            console.error('Error updating historico:', error);
        }
    };

    const handleDeleteHistorico = async (id) => {
        try {
            await axios.delete(`/data/historico/${id}/`);
            fetchHistoricos();
        } catch (error) {
            console.error('Error deleting historico:', error);
        }
    };

    const handleEditHistorico = (historico) => {
        setEditingHistorico(historico);
        setNewHistorico(historico);
    };

    const listChildren = () => {
        if (historicos.length > 0) {
            return (
                <>
                    <tr>
                        <th>Ordem</th>
                        <th>Data de Encerramento</th>
                        <th>Ações</th>
                    </tr>
                    {historicos.map((historico) => (
                        <tr key={historico.id}>
                            <td>{historico.ordem?.descricao}</td>
                            <td>{historico.data_encerramento}</td>
                            <td>
                                <button
                                   
                                    onClick={() => handleEditHistorico(historico)}
                                >
                                    Edit
                                </button>
                                <button
                                   
                                    onClick={() => handleDeleteHistorico(historico.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </>
            );
        } else {
            return <p>Nenhum histórico encontrado.</p>;
        }
    };

    return (
        <div>
            <h2>Históricos</h2>
            <div>
                <select
                   
                    value={newHistorico.ordem}
                    onChange={(e) => setNewHistorico({ ...newHistorico, ordem: e.target.value })}
                >
                    <option value="" disabled selected>Selecione a Ordem</option>
                    {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                            {order.descricao}
                        </option>
                    ))}
                </select>

                <input
                   
                    type="datetime-local"
                    value={newHistorico.data_encerramento}
                    onChange={(e) => setNewHistorico({ ...newHistorico, data_encerramento: e.target.value })}
                />

                <button
                   
                    onClick={editingHistorico ? handleUpdateHistorico : handleCreateHistorico}
                >
                    {editingHistorico ? 'Atualizar Histórico' : 'Criar Histórico'}
                </button>
            </div>

            <hr />

            <table>
                {listChildren()}
            </table>
        </div>
    );
};

export default HistoryCrud;
