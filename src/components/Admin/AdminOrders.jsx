import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('orderDate');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersCol = collection(db, 'orders');
        const q = query(ordersCol, orderBy('orderDate', 'desc'));
        const ordersSnapshot = await getDocs(q);
        const ordersList = ordersSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          orderDate: doc.data().orderDate?.toDate()
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus, newPaymentStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { 
        status: newStatus, 
        paymentStatus: newPaymentStatus,
        lastUpdated: new Date()
      });
      
      setOrders(orders =>
        orders.map(order =>
          order.id === orderId 
            ? { ...order, status: newStatus, paymentStatus: newPaymentStatus } 
            : order
        )
      );
      
      alert('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
        setOrders(orders => orders.filter(order => order.id !== orderId));
        alert('Order deleted successfully!');
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      'in-transit': 'status-transit',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return `status-badge ${statusClasses[status] || 'status-default'}`;
  };

  const getPaymentStatusBadge = (status) => {
    const statusClasses = {
      pending: 'payment-pending',
      paid: 'payment-paid',
      failed: 'payment-failed'
    };
    return `payment-badge ${statusClasses[status] || 'payment-default'}`;
  };
  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h3>Manage Orders ({filteredOrders.length})</h3>
        
        {/* Filters */}
        <div className="admin-filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Statistics */}
      <div className="order-stats">
        <div className="stat-card">
          <h4>Total Orders</h4>
          <span className="stat-number">{orders.length}</span>
        </div>
        <div className="stat-card">
          <h4>Pending</h4>
          <span className="stat-number">{orders.filter(o => o.status === 'pending').length}</span>
        </div>
        <div className="stat-card">
          <h4>In Transit</h4>
          <span className="stat-number">{orders.filter(o => o.status === 'in-transit').length}</span>
        </div>
        <div className="stat-card">
          <h4>Delivered</h4>
          <span className="stat-number">{orders.filter(o => o.status === 'delivered').length}</span>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found for the selected filter.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card-admin">
              <div className="order-card-header">
                <div className="order-id">
                  <strong>#{order.id.slice(-8)}</strong>
                  <span className="order-date">
                    {order.orderDate?.toLocaleDateString()}
                  </span>
                </div>
                <div className="order-actions">
                  <button 
                    onClick={() => navigate(`/admin/edit-order/${order.id}`)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteOrder(order.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="order-info">
                <div className="customer-info">
                  <p><strong>Customer:</strong> {order.userName || order.userEmail}</p>
                  <p><strong>Email:</strong> {order.userEmail}</p>
                  <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
                </div>

                <div className="order-status-section">
                  <div className="status-badges">
                    <span className={getStatusBadge(order.status)}>
                      {order.status?.toUpperCase()}
                    </span>
                    <span className={getPaymentStatusBadge(order.paymentStatus)}>
                      {order.paymentStatus?.toUpperCase() || 'PENDING'}
                    </span>
                  </div>

                  <div className="quick-actions">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value, order.paymentStatus)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <select 
                      value={order.paymentStatus || 'pending'} 
                      onChange={(e) => handleStatusUpdate(order.id, order.status, e.target.value)}
                      className="payment-select"
                    >
                      <option value="pending">Payment Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Payment Failed</option>
                    </select>
                  </div>
                </div>

                <div className="order-details">
                  <div className="order-items">
                    <h5>Items ({(order.items || order.products || []).length}):</h5>
                    <div className="items-list">
                      {(order.items || order.products || []).slice(0, 3).map((item, index) => (
                        <span key={index} className="item-tag">
                          {item.name} x{item.quantity}
                        </span>
                      ))}
                      {(order.items || order.products || []).length > 3 && (
                        <span className="more-items">
                          +{(order.items || order.products || []).length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="order-amounts">
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    {order.trackingNumber && (
                      <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                    )}
                  </div>
                </div>

                <div className="shipping-address">
                  <h5>Shipping Address:</h5>
                  <p>{order.shippingAddress?.fullName}</p>
                  <p>{order.shippingAddress?.addressLine1}</p>
                  <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;