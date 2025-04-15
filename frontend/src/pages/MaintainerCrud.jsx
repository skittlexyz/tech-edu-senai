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
                    <tr>
                        <th>Nome</th>
                        <th>NI</th>
                        <th>Área</th>
                        <th>Gestor</th>
                        <th>Ações</th>
                    </tr>
                    {manutentores.map((manutentor) => (
                        <tr key={manutentor.id}>
                            <td>{manutentor.ni}</td>
                            <td>{manutentor.nome}</td>
                            <td>{manutentor.area}</td>
                            <td>
                                {gestores.find((gestor) => gestor.id === manutentor.gestor)?.nome || 'N/A'}
                            </td>
                            <td>
                                <button
                                   
                                    onClick={() => handleEditManutentor(manutentor)}
                                >
                                    Edit
                                </button>
                                <button
                                   
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
            return <p>Nenhum manutentor encontrado.</p>;
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
                    <option value="" disabled selected>Selecione o Gestor</option>
                    {gestores.map((gestor) => (
                        <option key={gestor.id} value={gestor.id}>
                            {gestor.nome}
                        </option>
                    ))}
                </select>
                <button
                   
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
