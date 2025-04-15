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
          <tr>
            <th>Descrição</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Ações</th>
          </tr>
          <tr>
            {orders.map((order) => (
              <>
                <td key={order.id}>{order.descricao}</td>
                <td key={order.id}>{order.status}</td>
                <td key={order.id}>{order.prioridade}</td>
                <td>
                  <button onClick={() => handleEditOrder(order)}>Edit</button>
                  <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                </td>
              </>
            ))}
          </tr>
        </>
      )
    } else {
      return <p>Nenhuma ordem de serviço encontrada.</p>;
    }
  };

  return (
    <div>
      <h2>Ordens de Serviço</h2>
      <div>
        <input
         
          type="text"
          placeholder="Descrição"
          value={newOrder.descricao}
          onChange={(e) => setNewOrder({ ...newOrder, descricao: e.target.value })}
        />
        <select
         
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option disabled selected value="">Selecione o Andamento</option>
          <option value="iniciada">Iniciada</option>
          <option value="em andamento">Em Andamento</option>
          <option value="finalizada">Finalizada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <select
         
          value={newOrder.prioridade}
          onChange={(e) => setNewOrder({ ...newOrder, prioridade: e.target.value })}
        >
          <option disabled selected value="">Selecione a Prioridade</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        <select
         
          value={newOrder.ambiente}
          onChange={(e) => setNewOrder({ ...newOrder, ambiente: e.target.value })}
        >
          <option disabled selected value="">Selecione o Ambiente</option>
          {ambientes.map((ambiente) => (
            <option key={ambiente.id} value={ambiente.id}>
              {ambiente.nome}
            </option>
          ))}
        </select>

        <select
         
          value={newOrder.manutentor}
          onChange={(e) => setNewOrder({ ...newOrder, manutentor: e.target.value })}
        >
          <option disabled selected value="">Selecione o Manutentor</option>
          {manutentores.map((manutentor) => (
            <option key={manutentor.id} value={manutentor.id}>
              {manutentor.nome}
            </option>
          ))}
        </select>

        <button onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}>
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
