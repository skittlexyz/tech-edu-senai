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
            return ambientes.map((ambiente) => (
                <li key={ambiente.id}>
                    {ambiente.ni} - {ambiente.nome}
                    <button onClick={() => handleEditAmbiente(ambiente)}>Edit</button>
                    <button onClick={() => handleDeleteAmbiente(ambiente.id)}>Delete</button>
                </li>
            ));
        } else {
            return <p>No ambientes found.</p>;
        }
    };

    return (
        <div>
            <h2>Ambientes</h2>
            <div>
                <input
                    type="text"
                    placeholder="NI"
                    value={newAmbiente.ni}
                    onChange={(e) => setNewAmbiente({ ...newAmbiente, ni: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newAmbiente.nome}
                    onChange={(e) => setNewAmbiente({ ...newAmbiente, nome: e.target.value })}
                />
                <button onClick={editingAmbiente ? handleUpdateAmbiente : handleCreateAmbiente}>
                    {editingAmbiente ? 'Update Ambiente' : 'Create Ambiente'}
                </button>
            </div>
            <ul>{listChildren()}</ul>
        </div>
    );
};

export default AmbientCrud;
