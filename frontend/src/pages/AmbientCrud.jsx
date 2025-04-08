import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const AmbientCrud = () => {
    const [ambientes, setAmbientes] = useState([]);
    const [newAmbiente, setNewAmbiente] = useState({ ni: '', nome: '' });
    const [editingAmbiente, setEditingAmbiente] = useState(null);

    const fetchAmbientes = async () => {
        try {
            const response = await axios.get('/data/ambiente/');
            setAmbientes(response.data);
        } catch (error) {
            console.error('Error fetching ambientes:', error);
        }
    };

    useEffect(() => {
        fetchAmbientes();
    }, []);

    const handleCreateAmbiente = async () => {
        try {
            await axios.post('/data/ambiente/', newAmbiente);
            fetchAmbientes();
            setNewAmbiente({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error creating ambiente:', error);
        }
    };

    const handleDeleteAmbiente = async (id) => {
        try {
            await axios.delete(`/data/ambiente/${id}/`);
            fetchAmbientes();
        } catch (error) {
            console.error('Error deleting ambiente:', error);
        }
    };

    const handleEditAmbiente = (ambiente) => {
        setEditingAmbiente(ambiente);
        setNewAmbiente(ambiente);
    };

    const handleUpdateAmbiente = async () => {
        try {
            await axios.put(`/data/ambiente/${editingAmbiente.id}/`, newAmbiente);
            fetchAmbientes();
            setEditingAmbiente(null);
            setNewAmbiente({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error updating ambiente:', error);
        }
    };

    const listChildren = () => {
        if (ambientes.length > 0) {
            return (
                <>
                    <tr className='text-left'>
                        <th className='border border-neutral-500 px-2 py-1'>NI</th>
                        <th className='border border-neutral-500 px-2 py-1'>Nome</th>
                        <th className='border border-neutral-500 px-2 py-1'>Ações</th>
                    </tr>
                    {ambientes.map((ambiente) => (
                        <tr key={ambiente.id}>
                            <td className='border border-neutral-500 px-2 py-1'>{ambiente.ni}</td>
                            <td className='border border-neutral-500 px-2 py-1'>{ambiente.nome}</td>
                            <td className='border border-neutral-500 px-2 py-1 gap-2'>
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2 mr-2'
                                    onClick={() => handleEditAmbiente(ambiente)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2'
                                    onClick={() => handleDeleteAmbiente(ambiente.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </>
            );
        } else {
            return <p className='text-neutral-500'>Nenhum ambiente encontrado.</p>;
        }
    };

    return (
        <div className='h-full p-8 flex flex-col gap-4'>
            <h2 className='text-2xl'>Ambientes</h2>
            <div className='flex gap-4'>
                <input
                    className='border px-2 rounded-md py-1'
                    type="text"
                    placeholder="NI"
                    value={newAmbiente.ni}
                    onChange={(e) => setNewAmbiente({ ...newAmbiente, ni: e.target.value })}
                />
                <input
                    className='border px-2 rounded-md py-1'
                    type="text"
                    placeholder="Nome"
                    value={newAmbiente.nome}
                    onChange={(e) => setNewAmbiente({ ...newAmbiente, nome: e.target.value })}
                />
                <button
                    className='border rounded-md cursor-pointer hover:text-red-500 px-2 py-1'
                    onClick={editingAmbiente ? handleUpdateAmbiente : handleCreateAmbiente}
                >
                    {editingAmbiente ? 'Atualizar Ambiente' : 'Criar Ambiente'}
                </button>
            </div>
            <hr />
            <table>
                {listChildren()}
            </table>
        </div>
    );
};

export default AmbientCrud;
