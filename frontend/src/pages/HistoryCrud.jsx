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
                    <tr className='text-left'>
                        <th className='border border-neutral-500 px-2 py-1'>Ordem</th>
                        <th className='border border-neutral-500 px-2 py-1'>Data de Encerramento</th>
                        <th className='border border-neutral-500 px-2 py-1'>Ações</th>
                    </tr>
                    {historicos.map((historico) => (
                        <tr key={historico.id}>
                            <td className='border border-neutral-500 px-2 py-1'>{historico.ordem?.descricao}</td>
                            <td className='border border-neutral-500 px-2 py-1'>{historico.data_encerramento}</td>
                            <td className='border border-neutral-500 px-2 py-1'>
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2 mr-2'
                                    onClick={() => handleEditHistorico(historico)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2'
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
            return <p className='text-neutral-500'>Nenhum histórico encontrado.</p>;
        }
    };

    return (
        <div className='h-full p-8 flex flex-col gap-4'>
            <h2 className='text-2xl'>Históricos</h2>
            <div className='flex gap-4'>
                <select
                    className='border px-2 rounded-md py-1'
                    value={newHistorico.ordem}
                    onChange={(e) => setNewHistorico({ ...newHistorico, ordem: e.target.value })}
                >
                    <option value="">Selecione a Ordem</option>
                    {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                            {order.descricao}
                        </option>
                    ))}
                </select>

                <input
                    className='border px-2 rounded-md py-1'
                    type="datetime-local"
                    value={newHistorico.data_encerramento}
                    onChange={(e) => setNewHistorico({ ...newHistorico, data_encerramento: e.target.value })}
                />

                <button
                    className='border rounded-md cursor-pointer hover:text-red-500 px-2 py-1'
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
