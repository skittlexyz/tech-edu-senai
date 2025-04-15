import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HeritageCrud = () => {
    const [patrimonios, setPatrimonios] = useState([]);
    const [newPatrimonio, setNewPatrimonio] = useState({ ni: '', descricao: '', localizacao: '' });
    const [editingPatrimonio, setEditingPatrimonio] = useState(null);

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
        setNewPatrimonio(patrimonio);
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
            return (
                <>
                    <tr>
                        <th>NI</th>
                        <th>Descrição</th>
                        <th>Localização</th>
                        <th>Ações</th>
                    </tr>
                    {patrimonios.map((patrimonio) => (
                        <tr key={patrimonio.id}>
                            <td>{patrimonio.ni}</td>
                            <td>{patrimonio.descricao}</td>
                            <td>{patrimonio.localizacao}</td>
                            <td>
                                <button
                                   
                                    onClick={() => handleEditPatrimonio(patrimonio)}
                                >
                                    Edit
                                </button>
                                <button
                                   
                                    onClick={() => handleDeletePatrimonio(patrimonio.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </>
            );
        } else {
            return <p>Nenhum patrimônio encontrado.</p>;
        }
    };

    return (
        <div>
            <h2>Patrimônios</h2>
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
                <button
                   
                    onClick={editingPatrimonio ? handleUpdatePatrimonio : handleCreatePatrimonio}
                >
                    {editingPatrimonio ? 'Atualizar Patrimônio' : 'Criar Patrimônio'}
                </button>
            </div>
            <hr />
            <table>
                {listChildren()}
            </table>
        </div>
    );
};

export default HeritageCrud;
