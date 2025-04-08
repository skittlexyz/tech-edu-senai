import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const MaintainerCrud = () => {
    const [manutentores, setManutentores] = useState([]);
    const [gestores, setGestores] = useState([]);
    const [newManutentor, setNewManutentor] = useState({ ni: '', nome: '', area: '', gestor: '' });
    const [editingManutentor, setEditingManutentor] = useState(null);

    const fetchManutentores = async () => {
        try {
            const response = await axios.get('/data/manutentor/');
            setManutentores(response.data);
        } catch (error) {
            console.error('Error fetching manutentores:', error);
        }
    };

    const fetchGestores = async () => {
        try {
            const response = await axios.get('/data/gestor/');
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    useEffect(() => {
        fetchManutentores();
        fetchGestores();
    }, []);

    const handleCreateManutentor = async () => {
        try {
            await axios.post('/data/manutentor/', newManutentor);
            fetchManutentores();
            setNewManutentor({ ni: '', nome: '', area: '', gestor: '' });
        } catch (error) {
            console.error('Error creating manutentor:', error);
        }
    };

    const handleDeleteManutentor = async (id) => {
        try {
            await axios.delete(`/data/manutentor/${id}/`);
            fetchManutentores();
        } catch (error) {
            console.error('Error deleting manutentor:', error);
        }
    };

    const handleEditManutentor = (manutentor) => {
        setEditingManutentor(manutentor);
        setNewManutentor(manutentor);
    };

    const handleUpdateManutentor = async () => {
        try {
            await axios.put(`/data/manutentor/${editingManutentor.id}/`, newManutentor);
            fetchManutentores();
            setEditingManutentor(null);
            setNewManutentor({ ni: '', nome: '', area: '', gestor: '' });
        } catch (error) {
            console.error('Error updating manutentor:', error);
        }
    };

    const listChildren = () => {
        if (manutentores.length > 0) {
            return (
                <table>
                    <tr className='text-left'>
                        <th className="border border-neutral-500 px-2 py-1">Nome</th>
                        <th className="border border-neutral-500 px-2 py-1">NI</th>
                        <th className="border border-neutral-500 px-2 py-1">Área</th>
                        <th className="border border-neutral-500 px-2 py-1">Gestor</th>
                        <th className="border border-neutral-500 px-2 py-1">Ações</th>
                    </tr>
                    {manutentores.map((manutentor) => (
                        <tr key={manutentor.id}>
                            <td className="border border-neutral-500 px-2 py-1">{manutentor.ni}</td>
                            <td className="border border-neutral-500 px-2 py-1">{manutentor.nome}</td>
                            <td className="border border-neutral-500 px-2 py-1">{manutentor.area}</td>
                            <td className="border border-neutral-500 px-2 py-1">
                                {gestores.find((gestor) => gestor.id === manutentor.gestor)?.nome || 'N/A'}
                            </td>
                            <td className="border border-neutral-500 px-2 py-1">
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2 mr-2'
                                    onClick={() => handleEditManutentor(manutentor)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2'
                                    onClick={() => handleDeleteManutentor(manutentor.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            );
        } else {
            return <p className='text-neutral-500'>Nenhum manutentor encontrado.</p>;
        }
    };

    return (
        <div className="h-full p-8 flex flex-col gap-4">
            <h2 className="text-2xl">Manutentores</h2>
            <div className="flex gap-4">
                <input
                    className="border px-2 py-1 rounded-md"
                    type="text"
                    placeholder="NI"
                    value={newManutentor.ni}
                    onChange={(e) => setNewManutentor({ ...newManutentor, ni: e.target.value })}
                />
                <input
                    className="border px-2 py-1 rounded-md"
                    type="text"
                    placeholder="Nome"
                    value={newManutentor.nome}
                    onChange={(e) => setNewManutentor({ ...newManutentor, nome: e.target.value })}
                />
                <input
                    className="border px-2 py-1 rounded-md"
                    type="text"
                    placeholder="Área"
                    value={newManutentor.area}
                    onChange={(e) => setNewManutentor({ ...newManutentor, area: e.target.value })}
                />
                <select
                    className="border px-2 py-1 rounded-md"
                    value={newManutentor.gestor}
                    onChange={(e) => setNewManutentor({ ...newManutentor, gestor: e.target.value })}
                >
                    <option value="">Select Gestor</option>
                    {gestores.map((gestor) => (
                        <option key={gestor.id} value={gestor.id}>
                            {gestor.nome}
                        </option>
                    ))}
                </select>
                <button
                    className="border rounded-md cursor-pointer hover:text-red-500 px-2 py-1"
                    onClick={editingManutentor ? handleUpdateManutentor : handleCreateManutentor}
                >
                    {editingManutentor ? 'Update Manutentor' : 'Create Manutentor'}
                </button>
            </div>
            <hr />
            {listChildren()}
        </div>
    );
};

export default MaintainerCrud;
