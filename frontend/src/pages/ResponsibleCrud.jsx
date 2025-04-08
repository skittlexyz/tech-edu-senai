import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ResponsibleCrud = () => {
    const [responsaveis, setResponsaveis] = useState([]);
    const [newResponsavel, setNewResponsavel] = useState({
        ni: '',
        nome: '',
    });
    const [editingResponsavel, setEditingResponsavel] = useState(null);

    const fetchResponsaveis = async () => {
        try {
            const response = await axios.get('/data/responsavel/');
            setResponsaveis(response.data);
        } catch (error) {
            console.error('Error fetching responsaveis:', error);
        }
    };

    useEffect(() => {
        fetchResponsaveis();
    }, []);

    const handleCreateResponsavel = async () => {
        try {
            await axios.post('/data/responsavel/', newResponsavel);
            fetchResponsaveis();
            setNewResponsavel({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error creating responsavel:', error);
        }
    };

    const handleUpdateResponsavel = async () => {
        try {
            await axios.put(`/data/responsavel/${editingResponsavel.id}/`, newResponsavel);
            fetchResponsaveis();
            setEditingResponsavel(null);
            setNewResponsavel({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error updating responsavel:', error);
        }
    };

    const handleDeleteResponsavel = async (id) => {
        try {
            await axios.delete(`/data/responsavel/${id}/`);
            fetchResponsaveis();
        } catch (error) {
            console.error('Error deleting responsavel:', error);
        }
    };

    const handleEditResponsavel = (responsavel) => {
        setEditingResponsavel(responsavel);
        setNewResponsavel(responsavel);
    };

    const listChildren = () => {
        if (Array.isArray(responsaveis) && responsaveis.length > 0) {
            return (
                <table className="w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="border border-neutral-500 px-2 py-1">Nome</th>
                            <th className="border border-neutral-500 px-2 py-1">NI</th>
                            <th className="border border-neutral-500 px-2 py-1">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responsaveis.map((responsavel) => (
                            <tr key={responsavel.id}>
                                <td className="border border-neutral-500 px-2 py-1">{responsavel.nome}</td>
                                <td className="border border-neutral-500 px-2 py-1">{responsavel.ni}</td>
                                <td className="border border-neutral-500 px-2 py-1 gap-2">
                                    <button
                                        className="border rounded-md cursor-pointer hover:text-red-500 px-2 mr-2"
                                        onClick={() => handleEditResponsavel(responsavel)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="border rounded-md cursor-pointer hover:text-red-500 px-2"
                                        onClick={() => handleDeleteResponsavel(responsavel.id)}
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
            return <p className="text-neutral-500">Nenhum responsável encontrado.</p>;
        }
    };

    return (
        <div className="h-full p-8 flex flex-col gap-4">
            <h2 className="text-2xl">Responsáveis</h2>
            <div className="flex gap-4">
                <input
                    className="border px-2 rounded-md py-1"
                    type="text"
                    placeholder="NI"
                    value={newResponsavel.ni}
                    onChange={(e) => setNewResponsavel({ ...newResponsavel, ni: e.target.value })}
                />
                <input
                    className="border px-2 rounded-md py-1"
                    type="text"
                    placeholder="Nome"
                    value={newResponsavel.nome}
                    onChange={(e) => setNewResponsavel({ ...newResponsavel, nome: e.target.value })}
                />
                <button
                    className="border rounded-md cursor-pointer hover:text-red-500 px-2 py-1"
                    onClick={editingResponsavel ? handleUpdateResponsavel : handleCreateResponsavel}
                >
                    {editingResponsavel ? 'Atualizar Responsável' : 'Criar Responsável'}
                </button>
            </div>
            <hr />
            {listChildren()}
        </div>
    );
};

export default ResponsibleCrud;
