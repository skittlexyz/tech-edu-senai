import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HeritageCrud = () => {
    const [patrimonios, setPatrimonios] = useState([]);
    const [newPatrimonio, setNewPatrimonio] = useState({ ni: '', descricao: '', localizacao: '' });
    const [editingPatrimonio, setEditingPatrimonio] = useState(null); // Estado para edição

    const fetchPatrimonios = async () => {
        try {
            const response = await axios.get('/data/patrimonio/');
            setPatrimonios(response.data);
        } catch (error) {
            console.error('Error fetching patrimonios:', error);
        }
    };

    useEffect(() => {
        fetchPatrimonios();
    }, []);

    const handleCreatePatrimonio = async () => {
        try {
            await axios.post('/data/patrimonio/', newPatrimonio);
            fetchPatrimonios();
            setNewPatrimonio({ ni: '', descricao: '', localizacao: '' });
        } catch (error) {
            console.error('Error creating patrimonio:', error);
        }
    };

    const handleDeletePatrimonio = async (id) => {
        try {
            await axios.delete(`/data/patrimonio/${id}/`);
            fetchPatrimonios();
        } catch (error) {
            console.error('Error deleting patrimonio:', error);
        }
    };

    const handleEditPatrimonio = (patrimonio) => {
        setEditingPatrimonio(patrimonio);
        setNewPatrimonio(patrimonio); // Preenche os campos com os dados do item a ser editado
    };

    const handleUpdatePatrimonio = async () => {
        try {
            await axios.put(`/data/patrimonio/${editingPatrimonio.id}/`, newPatrimonio);
            fetchPatrimonios();
            setEditingPatrimonio(null);
            setNewPatrimonio({ ni: '', descricao: '', localizacao: '' });
        } catch (error) {
            console.error('Error updating patrimonio:', error);
        }
    };

    const listChildren = () => {
        if (patrimonios.length > 0) {
            return patrimonios.map((patrimonio) => (
                <li key={patrimonio.id}>
                    {patrimonio.ni} - {patrimonio.descricao}
                    <button onClick={() => handleEditPatrimonio(patrimonio)}>Edit</button>
                    <button onClick={() => handleDeletePatrimonio(patrimonio.id)}>Delete</button>
                </li>
            ));
        } else {
            return <p>No patrimonios found.</p>;
        }
    };

    return (
        <div>
            <h2>Patrimonios</h2>
            <div>
                <input
                    type="text"
                    placeholder="NI"
                    value={newPatrimonio.ni}
                    onChange={(e) => setNewPatrimonio({ ...newPatrimonio, ni: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newPatrimonio.descricao}
                    onChange={(e) => setNewPatrimonio({ ...newPatrimonio, descricao: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Localização"
                    value={newPatrimonio.localizacao}
                    onChange={(e) => setNewPatrimonio({ ...newPatrimonio, localizacao: e.target.value })}
                />
                <button onClick={editingPatrimonio ? handleUpdatePatrimonio : handleCreatePatrimonio}>
                    {editingPatrimonio ? 'Update Patrimonio' : 'Create Patrimonio'}
                </button>
            </div>
            <ul>{listChildren()}</ul>
        </div>
    );
};

export default HeritageCrud;
