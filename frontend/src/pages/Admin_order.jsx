import React, { useState, useEffect } from 'react';
import "./vieworder.css"

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getorders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Toggle the paid status of an order
  const handlePaymentToggle = async (orderId, paid) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paid: !paid }),
      });
      if (response.ok) {
        fetchOrders(); // Refresh orders list
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  // Render table with orders
  return (
    <div>
      <center><h1>Order Details</h1></center>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ backgroundColor: order.paid ? '#c8e6c9' : '#ffcdd2' }}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>${order.price}</td>
              <td>${order.totalPrice}</td>
              <td>
                <button onClick={() => handlePaymentToggle(order._id, order.paid)}>
                  {order.paid ? 'Paid' : 'Unpaid'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrder;
