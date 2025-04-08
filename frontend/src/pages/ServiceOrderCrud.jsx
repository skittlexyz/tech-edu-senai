import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ServiceOrderCrud = () => {
  const [orders, setOrders] = useState([]); // Initialize as empty array
  const [newOrder, setNewOrder] = useState({
    descricao: '',
    status: 'iniciada',
    prioridade: 'media',
    ambiente: '',  // Add ambiente (ID of the ambiente)
    manutentor: '', // Add manutentor (ID of the manutentor)
  });
  const [ambientes, setAmbientes] = useState([]); // Store ambiente options
  const [manutentores, setManutentores] = useState([]); // Store manutentor options
  const [editingOrder, setEditingOrder] = useState(null); // State for editing an order

  // Fetch all orders
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

  // Fetch all ambientes
  const fetchAmbientes = async () => {
    try {
      const response = await axios.get('/data/ambiente/');
      setAmbientes(response.data);
    } catch (error) {
      console.error('Error fetching ambientes:', error);
    }
  };

  // Fetch all manutentores
  const fetchManutentores = async () => {
    try {
      const response = await axios.get('/data/manutentor/');
      setManutentores(response.data);
    } catch (error) {
      console.error('Error fetching manutentores:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchOrders(); // Fetch orders
    fetchAmbientes(); // Fetch ambientes
    fetchManutentores(); // Fetch manutentores
  }, []);

  // Handle creating a new order
  const handleCreateOrder = async () => {
    try {
      await axios.post('/data/ordem-servico/', newOrder);
      fetchOrders(); // Update the order list
      setNewOrder({
        descricao: '',
        status: 'iniciada',
        prioridade: 'media',
        ambiente: '',
        manutentor: '',
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  // Handle updating an existing order
  const handleUpdateOrder = async () => {
    try {
      await axios.put(`/data/ordem-servico/${editingOrder.id}/`, newOrder);
      fetchOrders(); // Update the order list
      setEditingOrder(null); // Clear the editing state
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

  // Handle deleting an order
  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`/data/ordem-servico/${id}/`);
      fetchOrders(); // Update the order list
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Handle selecting an order for editing
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder(order); // Fill the form with the current order's data
  };

  // Generate the list of orders
  const listChildren = () => {
    if (Array.isArray(orders) && orders.length > 0) {
      return orders.map((order) => (
        <li key={order.id}>
          {order.descricao} - {order.status} - {order.prioridade}
          <button onClick={() => handleEditOrder(order)}>Edit</button>
          <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
        </li>
      ));
    } else {
      return <p>No service orders found.</p>;
    }
  };

  return (
    <div>
      <h2>Service Orders</h2>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={newOrder.descricao}
          onChange={(e) => setNewOrder({ ...newOrder, descricao: e.target.value })}
        />
        <select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option value="iniciada">Iniciada</option>
          <option value="em andamento">Em Andamento</option>
          <option value="finalizada">Finalizada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <select
          value={newOrder.prioridade}
          onChange={(e) => setNewOrder({ ...newOrder, prioridade: e.target.value })}
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        {/* Add Ambiente selection */}
        <select
          value={newOrder.ambiente}
          onChange={(e) => setNewOrder({ ...newOrder, ambiente: e.target.value })}
        >
          <option value="">Select Ambiente</option>
          {ambientes.map((ambiente) => (
            <option key={ambiente.id} value={ambiente.id}>
              {ambiente.nome}
            </option>
          ))}
        </select>

        {/* Add Manutentor selection */}
        <select
          value={newOrder.manutentor}
          onChange={(e) => setNewOrder({ ...newOrder, manutentor: e.target.value })}
        >
          <option value="">Select Manutentor</option>
          {manutentores.map((manutentor) => (
            <option key={manutentor.id} value={manutentor.id}>
              {manutentor.nome}
            </option>
          ))}
        </select>

        <button onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}>
          {editingOrder ? 'Update Order' : 'Create Order'}
        </button>
      </div>

      <ul>
        {listChildren()}
      </ul>
    </div>
  );
};

export default ServiceOrderCrud;
