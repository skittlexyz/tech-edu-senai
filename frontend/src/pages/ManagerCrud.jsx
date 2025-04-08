import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ManagerCrud = () => {
    const [gestores, setGestores] = useState([]);
    const [newGestor, setNewGestor] = useState({
        ni: '',
        nome: '',
        area: '',
        cargo: '',
    });
    const [editingGestor, setEditingGestor] = useState(null);

    const fetchGestores = async () => {
        try {
            const response = await axios.get('/data/gestor/');
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    useEffect(() => {
        fetchGestores();
    }, []);

    const handleCreateGestor = async () => {
        try {
            await axios.post('/data/gestor/', newGestor);
            fetchGestores();
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error creating gestor:', error);
        }
    };

    const handleUpdateGestor = async () => {
        try {
            await axios.put(`/data/gestor/${editingGestor.id}/`, newGestor);
            fetchGestores();
            setEditingGestor(null);
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error updating gestor:', error);
        }
    };

    const handleDeleteGestor = async (id) => {
        try {
            await axios.delete(`/data/gestor/${id}/`);
            fetchGestores();
        } catch (error) {
            console.error('Error deleting gestor:', error);
        }
    };

    const handleEditGestor = (gestor) => {
        setEditingGestor(gestor);
        setNewGestor(gestor);
    };

    const listChildren = () => {
        if (Array.isArray(gestores) && gestores.length > 0) {
            return (
                <table className="w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="border border-neutral-500 px-2 py-1">Nome</th>
                            <th className="border border-neutral-500 px-2 py-1">NI</th>
                            <th className="border border-neutral-500 px-2 py-1">Área</th>
                            <th className="border border-neutral-500 px-2 py-1">Cargo</th>
                            <th className="border border-neutral-500 px-2 py-1">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gestores.map((gestor) => (
                            <tr key={gestor.id}>
                                <td className="border border-neutral-500 px-2 py-1">{gestor.nome}</td>
                                <td className="border border-neutral-500 px-2 py-1">{gestor.ni}</td>
                                <td className="border border-neutral-500 px-2 py-1">{gestor.area}</td>
                                <td className="border border-neutral-500 px-2 py-1">{gestor.cargo}</td>
                                <td className="border border-neutral-500 px-2 py-1 gap-2">
                                    <button
                                        className="border rounded-md cursor-pointer hover:text-red-500 px-2 mr-2"
                                        onClick={() => handleEditGestor(gestor)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="border rounded-md cursor-pointer hover:text-red-500 px-2"
                                        onClick={() => handleDeleteGestor(gestor.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return <p className="text-neutral-500">Nenhum gestor encontrado.</p>;
        }
    };

    return (
        <div className="h-full p-8 flex flex-col gap-4">
            <h2 className="text-2xl">Gestores</h2>
            <div className="flex gap-4">
                <input
                    className="border px-2 rounded-md py-1"
                    type="text"
                    placeholder="NI"
                    value={newGestor.ni}
                    onChange={(e) => setNewGestor({ ...newGestor, ni: e.target.value })}
                />
                <input
                    className="border px-2 rounded-md py-1"
                    type="text"
                    placeholder="Nome"
                    value={newGestor.nome}
                    onChange={(e) => setNewGestor({ ...newGestor, nome: e.target.value })}
                />
                <input
                    className="border px-2 rounded-md py-1"
                    type="text"
                    placeholder="Área"
                    value={newGestor.area}
                    onChange={(e) => setNewGestor({ ...newGestor, area: e.target.value })}
                />
                <input
                    className="border px-2 rounded-md py-1"
                    type="text"
                    placeholder="Cargo"
                    value={newGestor.cargo}
                    onChange={(e) => setNewGestor({ ...newGestor, cargo: e.target.value })}
                />
                <button
                    className="border rounded-md cursor-pointer hover:text-red-500 px-2 py-1"
                    onClick={editingGestor ? handleUpdateGestor : handleCreateGestor}
                >
                    {editingGestor ? 'Atualizar Gestor' : 'Criar Gestor'}
                </button>
            </div>
            <hr />
            {listChildren()}
        </div>
    );
};

export default ManagerCrud;
