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
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>NI</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responsaveis.map((responsavel) => (
                            <tr key={responsavel.id}>
                                <td>{responsavel.nome}</td>
                                <td>{responsavel.ni}</td>
                                <td>
                                    <button
                                       
                                        onClick={() => handleEditResponsavel(responsavel)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                       
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
            return <p>Nenhum responsável encontrado.</p>;
        }
    };

    return (
        <div>
            <h2>Responsáveis</h2>
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
                <button
                   
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
