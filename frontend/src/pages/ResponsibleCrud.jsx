import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ResponsibleCrud = () => {
    const [responsaveis, setResponsaveis] = useState([]);
    const [newResponsavel, setNewResponsavel] = useState({
        ni: '',
        nome: '',
    });
    const [editingResponsavel, setEditingResponsavel] = useState(null);

    // Fetch all responsaveis
    const fetchResponsaveis = async () => {
        try {
            const response = await axios.get('/data/responsavel/');
            setResponsaveis(response.data);
        } catch (error) {
            console.error('Error fetching responsaveis:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchResponsaveis();
    }, []);

    // Handle creating a new responsavel
    const handleCreateResponsavel = async () => {
        try {
            await axios.post('/data/responsavel/', newResponsavel);
            fetchResponsaveis(); // Update responsaveis list
            setNewResponsavel({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error creating responsavel:', error);
        }
    };

    // Handle updating an existing responsavel
    const handleUpdateResponsavel = async () => {
        try {
            await axios.put(`/data/responsavel/${editingResponsavel.id}/`, newResponsavel);
            fetchResponsaveis();
            setEditingResponsavel(null); // Clear the editing state
            setNewResponsavel({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error updating responsavel:', error);
        }
    };

    // Handle deleting a responsavel
    const handleDeleteResponsavel = async (id) => {
        try {
            await axios.delete(`/data/responsavel/${id}/`);
            fetchResponsaveis();
        } catch (error) {
            console.error('Error deleting responsavel:', error);
        }
    };

    // Handle selecting a responsavel for editing
    const handleEditResponsavel = (responsavel) => {
        setEditingResponsavel(responsavel);
        setNewResponsavel(responsavel);
    };

    // Generate the list of responsaveis
    const listChildren = () => {
        if (Array.isArray(responsaveis) && responsaveis.length > 0) {
            return responsaveis.map((responsavel) => (
                <li key={responsavel.id}>
                    {responsavel.nome} - {responsavel.ni}
                    <button onClick={() => handleEditResponsavel(responsavel)}>Edit</button>
                    <button onClick={() => handleDeleteResponsavel(responsavel.id)}>Delete</button>
                </li>
            ));
        } else {
            return <p>No responsaveis found.</p>;
        }
    };

    return (
        <div>
            <h2>Responsaveis</h2>
            <div>
                <input
                    type="text"
                    placeholder="NI"
                    value={newResponsavel.ni}
                    onChange={(e) => setNewResponsavel({ ...newResponsavel, ni: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newResponsavel.nome}
                    onChange={(e) => setNewResponsavel({ ...newResponsavel, nome: e.target.value })}
                />
                <button onClick={editingResponsavel ? handleUpdateResponsavel : handleCreateResponsavel}>
                    {editingResponsavel ? 'Update Responsavel' : 'Create Responsavel'}
                </button>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default ResponsibleCrud;
