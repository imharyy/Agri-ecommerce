import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import '../../styles/OrderHistory.css';

function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef, 
          where('userId', '==', user.uid),
          orderBy('orderDate', 'desc')
        );
        const snapshot = await getDocs(q);
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          orderDate: doc.data().orderDate?.toDate()
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'in-transit': return 'orange';
      case 'pending': return 'blue';
      default: return 'gray';
    }
  };

  if (loading) {
    return <div className="container">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="order-history container">
        <h2>Order History</h2>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="order-history container">
      <h2>Order History</h2>
      
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">            <div className="order-header">
              <h3>Order #{order.id.slice(-8)}</h3>
              <div className="order-status">
                <span 
                  className="status" 
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.status?.toUpperCase()}
                </span>
                <span className="payment-status">
                  Payment: {order.paymentStatus?.toUpperCase() || 'PENDING'}
                </span>
              </div>
            </div>
            
            <div className="order-meta">
              <p><strong>Order Date:</strong> {order.orderDate?.toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              {order.trackingNumber && (
                <p><strong>Tracking:</strong> {order.trackingNumber}</p>
              )}
              {order.estimatedDelivery && (
                <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery.seconds * 1000).toLocaleDateString()}</p>
              )}
            </div>
              <div className="order-items">
              <h4>Items:</h4>
              {(order.items || order.products || []).map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="shipping-address">
              <h4>Shipping Address:</h4>
              <p>{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.addressLine1}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;