import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ServiceOrderCrud = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    descricao: '',
    status: '',
    prioridade: '',
    ambiente: '',
    manutentor: '',
  });
  const [ambientes, setAmbientes] = useState([]);
  const [manutentores, setManutentores] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/data/ordem-servico/');
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchAmbientes = async () => {
    try {
      const response = await axios.get('/data/ambiente/');
      setAmbientes(response.data);
    } catch (error) {
      console.error('Error fetching ambientes:', error);
    }
  };

  const fetchManutentores = async () => {
    try {
      const response = await axios.get('/data/manutentor/');
      setManutentores(response.data);
    } catch (error) {
      console.error('Error fetching manutentores:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchAmbientes();
    fetchManutentores();
  }, []);

  const handleCreateOrder = async () => {
    try {
      await axios.post('/data/ordem-servico/', newOrder);
      fetchOrders();
      setNewOrder({
        descricao: '',
        status: '',
        prioridade: '',
        ambiente: '',
        manutentor: '',
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await axios.put(`/data/ordem-servico/${editingOrder.id}/`, newOrder);
      fetchOrders();
      setEditingOrder(null);
      setNewOrder({
        descricao: '',
        status: 'iniciada',
        prioridade: 'media',
        ambiente: '',
        manutentor: '',
      });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`/data/ordem-servico/${id}/`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder(order);
  };

  const listChildren = () => {
    if (Array.isArray(orders) && orders.length > 0) {
      return (
        <>
          <tr className='text-left'>
            <th className='border border-neutral-500 px-2 py-1'>Descrição</th>
            <th className='border border-neutral-500 px-2 py-1'>Status</th>
            <th className='border border-neutral-500 px-2 py-1'>Prioridade</th>
            <th className='border border-neutral-500 px-2 py-1'>Ações</th>
          </tr>
          <tr>
            {orders.map((order) => (
              <>
                <td className='border border-neutral-500 px-2 py-1' key={order.id}>{order.descricao}</td>
                <td className='border border-neutral-500 px-2 py-1' key={order.id}>{order.status}</td>
                <td className='border border-neutral-500 px-2 py-1' key={order.id}>{order.prioridade}</td>
                <td className='border border-neutral-500 px-2 py-1 gap-2'>
                  <button className='border rounded-md cursor-pointer hover:text-red-500 px-2 mr-2' onClick={() => handleEditOrder(order)}>Edit</button>
                  <button className='border rounded-md cursor-pointer hover:text-red-500 px-2' onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                </td>
              </>
            ))}
          </tr>
        </>
      )
    } else {
      return <p className='text-neutral-500'>Nenhuma ordem de serviço encontrada.</p>;
    }
  };

  return (
    <div className='h-full p-8 flex flex-col gap-4'>
      <h2 className='text-2xl'>Ordens de Serviço</h2>
      <div className='flex gap-4'>
        <input
          className='border px-2 rounded-md py-1'
          type="text"
          placeholder="Descrição"
          value={newOrder.descricao}
          onChange={(e) => setNewOrder({ ...newOrder, descricao: e.target.value })}
        />
        <select
          className='border px-2 rounded-md py-1'
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option className='text-black' selected value="">Selecione o Andamento</option>
          <option className='text-black' value="iniciada">Iniciada</option>
          <option className='text-black' value="em andamento">Em Andamento</option>
          <option className='text-black' value="finalizada">Finalizada</option>
          <option className='text-black' value="cancelada">Cancelada</option>
        </select>
        <select
          className='border px-2 rounded-md py-1'
          value={newOrder.prioridade}
          onChange={(e) => setNewOrder({ ...newOrder, prioridade: e.target.value })}
        >
          <option className='text-black' selected value="">Selecione a Prioridade</option>
          <option className='text-black' value="alta">Alta</option>
          <option className='text-black' value="media">Média</option>
          <option className='text-black' value="baixa">Baixa</option>
        </select>

        <select
          className='border px-2 rounded-md py-1'
          value={newOrder.ambiente}
          onChange={(e) => setNewOrder({ ...newOrder, ambiente: e.target.value })}
        >
          <option className='text-black' value="">Selecione o Ambiente</option>
          {ambientes.map((ambiente) => (
            <option className='text-black' key={ambiente.id} value={ambiente.id}>
              {ambiente.nome}
            </option>
          ))}
        </select>

        <select
          className='border px-2 rounded-md py-1'
          value={newOrder.manutentor}
          onChange={(e) => setNewOrder({ ...newOrder, manutentor: e.target.value })}
        >
          <option className='text-black' value="">Selecione o Manutentor</option>
          {manutentores.map((manutentor) => (
            <option className='text-black' key={manutentor.id} value={manutentor.id}>
              {manutentor.nome}
            </option>
          ))}
        </select>

        <button className='border rounded-md cursor-pointer hover:text-red-500 px-2 py-1' onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}>
          {editingOrder ? 'Atualizar Ordem' : 'Criar Ordem'}
        </button>
      </div>
      <hr />
      <table>
        {listChildren()}
      </table>
    </div>
  );
};

export default ServiceOrderCrud;
