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

    // Fetch all gestores
    const fetchGestores = async () => {
        try {
            const response = await axios.get('/data/gestor/');
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchGestores();
    }, []);

    // Handle creating a new gestor
    const handleCreateGestor = async () => {
        try {
            await axios.post('/data/gestor/', newGestor);
            fetchGestores(); // Update gestores list
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error creating gestor:', error);
        }
    };

    // Handle updating an existing gestor
    const handleUpdateGestor = async () => {
        try {
            await axios.put(`/data/gestor/${editingGestor.id}/`, newGestor);
            fetchGestores();
            setEditingGestor(null); // Clear the editing state
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error updating gestor:', error);
        }
    };

    // Handle deleting a gestor
    const handleDeleteGestor = async (id) => {
        try {
            await axios.delete(`/data/gestor/${id}/`);
            fetchGestores();
        } catch (error) {
            console.error('Error deleting gestor:', error);
        }
    };

    // Handle selecting a gestor for editing
    const handleEditGestor = (gestor) => {
        setEditingGestor(gestor);
        setNewGestor(gestor);
    };

    // Generate the list of gestores
    const listChildren = () => {
        if (Array.isArray(gestores) && gestores.length > 0) {
            return gestores.map((gestor) => (
                <li key={gestor.id}>
                    {gestor.nome} - {gestor.ni} - {gestor.area} - {gestor.cargo}
                    <button onClick={() => handleEditGestor(gestor)}>Edit</button>
                    <button onClick={() => handleDeleteGestor(gestor.id)}>Delete</button>
                </li>
            ));
        } else {
            return <p>No gestores found.</p>;
        }
    };

    return (
        <div>
            <h2>Gestores</h2>
            <div>
                <input
                    type="text"
                    placeholder="NI"
                    value={newGestor.ni}
                    onChange={(e) => setNewGestor({ ...newGestor, ni: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newGestor.nome}
                    onChange={(e) => setNewGestor({ ...newGestor, nome: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Área"
                    value={newGestor.area}
                    onChange={(e) => setNewGestor({ ...newGestor, area: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Cargo"
                    value={newGestor.cargo}
                    onChange={(e) => setNewGestor({ ...newGestor, cargo: e.target.value })}
                />
                <button onClick={editingGestor ? handleUpdateGestor : handleCreateGestor}>
                    {editingGestor ? 'Update Gestor' : 'Create Gestor'}
                </button>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default ManagerCrud;
