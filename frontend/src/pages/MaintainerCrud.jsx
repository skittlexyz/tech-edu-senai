import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const MaintainerCrud = () => {
    const [manutentores, setManutentores] = useState([]);
    const [gestores, setGestores] = useState([]);  // State for gestores
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
            return manutentores.map((manutentor) => (
                <li key={manutentor.id}>
                    {manutentor.nome} - {manutentor.area} - Gestor: {manutentor.gestor}
                    <button onClick={() => handleEditManutentor(manutentor)}>Edit</button>
                    <button onClick={() => handleDeleteManutentor(manutentor.id)}>Delete</button>
                </li>
            ));
        } else {
            return <p>No manutentores found.</p>;
        }
    };

    return (
        <div>
            <h2>Manutentores</h2>
            <div>
                <input
                    type="text"
                    placeholder="NI"
                    value={newManutentor.ni}
                    onChange={(e) => setNewManutentor({ ...newManutentor, ni: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newManutentor.nome}
                    onChange={(e) => setNewManutentor({ ...newManutentor, nome: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Área"
                    value={newManutentor.area}
                    onChange={(e) => setNewManutentor({ ...newManutentor, area: e.target.value })}
                />

                <select
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

                <button onClick={editingManutentor ? handleUpdateManutentor : handleCreateManutentor}>
                    {editingManutentor ? 'Update Manutentor' : 'Create Manutentor'}
                </button>
            </div>
            <ul>{listChildren()}</ul>
        </div>
    );
};

export default MaintainerCrud;
