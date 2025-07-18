import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    paymentStatus: '',
    trackingNumber: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, 'orders', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const orderData = docSnap.data();
          setOrder({ id, ...orderData });
          setFormData({
            status: orderData.status || 'pending',
            paymentStatus: orderData.paymentStatus || 'pending',
            trackingNumber: orderData.trackingNumber || '',
            notes: orderData.notes || ''
          });
        } else {
          alert('Order not found.');
          navigate('/admin');
        }
      } catch (error) {
        alert('Failed to fetch order.');
        console.error(error);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      await updateDoc(doc(db, 'orders', id), {
        ...formData,
        lastUpdated: new Date()
      });
      alert('Order updated successfully!');
      navigate('/admin');
    } catch (error) {
      alert('Failed to update order.');
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="loading">Loading order details...</div>;
  if (!order) return <div className="error">Order not found.</div>;

  return (
    <div className="edit-order-container">
      <div className="edit-order-header">
        <h2>Edit Order #{id.slice(-8)}</h2>
        <button onClick={() => navigate('/admin')} className="btn-back">
          ← Back to Orders
        </button>
      </div>

      <div className="edit-order-content">
        {/* Order Information */}
        <div className="order-info-card">
          <h3>Order Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Order ID:</label>
              <span>{id}</span>
            </div>
            <div className="info-item">
              <label>Order Date:</label>
              <span>{order.orderDate?.toDate?.()?.toLocaleDateString() || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Customer:</label>
              <span>{order.userName || order.userEmail}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{order.userEmail}</span>
            </div>
            <div className="info-item">
              <label>Phone:</label>
              <span>{order.shippingAddress?.phone}</span>
            </div>
            <div className="info-item">
              <label>Total Amount:</label>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="order-items-card">
          <h3>Order Items</h3>
          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || order.products || []).map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="product-info">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="product-thumb" />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="shipping-card">
          <h3>Shipping Address</h3>
          <div className="address-display">
            <p><strong>{order.shippingAddress?.fullName}</strong></p>
            <p>{order.shippingAddress?.addressLine1}</p>
            {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
            <p>Phone: {order.shippingAddress?.phone}</p>
            <p>Email: {order.shippingAddress?.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="edit-form-card">
          <h3>Update Order Status</h3>
          <form onSubmit={handleSave} className="edit-form">
            <div className="form-group">
              <label htmlFor="status">Order Status:</label>
              <select 
                id="status"
                name="status"
                value={formData.status} 
                onChange={handleInputChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="paymentStatus">Payment Status:</label>
              <select 
                id="paymentStatus"
                name="paymentStatus"
                value={formData.paymentStatus} 
                onChange={handleInputChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="trackingNumber">Tracking Number:</label>
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleInputChange}
                placeholder="Enter tracking number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Admin Notes:</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any notes about this order..."
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                disabled={updating}
                className="btn-save"
              >
                {updating ? 'Updating...' : 'Update Order'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/admin')}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;