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
                    <tr className='text-left'>
                        <th className='border border-neutral-500 px-2 py-1'>NI</th>
                        <th className='border border-neutral-500 px-2 py-1'>Descrição</th>
                        <th className='border border-neutral-500 px-2 py-1'>Localização</th>
                        <th className='border border-neutral-500 px-2 py-1'>Ações</th>
                    </tr>
                    {patrimonios.map((patrimonio) => (
                        <tr key={patrimonio.id}>
                            <td className='border border-neutral-500 px-2 py-1'>{patrimonio.ni}</td>
                            <td className='border border-neutral-500 px-2 py-1'>{patrimonio.descricao}</td>
                            <td className='border border-neutral-500 px-2 py-1'>{patrimonio.localizacao}</td>
                            <td className='border border-neutral-500 px-2 py-1 gap-2'>
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2 mr-2'
                                    onClick={() => handleEditPatrimonio(patrimonio)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='border rounded-md cursor-pointer hover:text-red-500 px-2'
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
            return <p className='text-neutral-500'>Nenhum patrimônio encontrado.</p>;
        }
    };

    return (
        <div className='h-full p-8 flex flex-col gap-4'>
            <h2 className='text-2xl'>Patrimônios</h2>
            <div className='flex gap-4'>
                <input
                    className='border px-2 rounded-md py-1'
                    type="text"
                    placeholder="NI"
                    value={newPatrimonio.ni}
                    onChange={(e) => setNewPatrimonio({ ...newPatrimonio, ni: e.target.value })}
                />
                <input
                    className='border px-2 rounded-md py-1'
                    type="text"
                    placeholder="Descrição"
                    value={newPatrimonio.descricao}
                    onChange={(e) => setNewPatrimonio({ ...newPatrimonio, descricao: e.target.value })}
                />
                <input
                    className='border px-2 rounded-md py-1'
                    type="text"
                    placeholder="Localização"
                    value={newPatrimonio.localizacao}
                    onChange={(e) => setNewPatrimonio({ ...newPatrimonio, localizacao: e.target.value })}
                />
                <button
                    className='border rounded-md cursor-pointer hover:text-red-500 px-2 py-1'
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
