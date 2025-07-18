import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../../styles/Checkout.css';

function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(total * 0.05); // 5% tax
  const shipping = total > 500 ? 0 : 50; // Free shipping above ₹500
  const finalTotal = total + tax + shipping;

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, orderSuccess]);

  useEffect(() => {
    if (user) {
      setAddress(prev => ({
        ...prev,
        email: user.email || ''
      }));
    }
  }, [user]);
  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const validateStep1 = () => {
    const required = ['fullName', 'phone', 'email', 'addressLine1', 'city', 'state', 'pincode'];
    return required.every(field => address[field].trim());
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 1) {
      alert('Please fill all required fields');
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        userName: address.fullName,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl || '',
          category: item.category || ''
        })),
        products: cart, // Keep for backward compatibility
        subtotal: total,
        tax: tax,
        shipping: shipping,
        totalAmount: finalTotal,
        shippingAddress: {
          fullName: address.fullName,
          phone: address.phone,
          email: address.email,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode
        },
        paymentMethod: paymentMethod,
        status: 'pending',
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
        orderDate: serverTimestamp(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        trackingNumber: `TRK${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Send order confirmation email (simulation)
      console.log('Order placed successfully:', docRef.id);
      
      clearCart();
      setOrderSuccess(true);
      setCurrentStep(4); // Success step
      
      // Navigate to order history after 3 seconds
      setTimeout(() => {
        navigate('/order-history');
      }, 3000);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // Step 1: Address Form
  const renderAddressStep = () => (
    <div className="checkout-step">
      <h3>Shipping Address</h3>
      <div className="form-grid">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          value={address.fullName}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          value={address.phone}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={address.email}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1 *"
          value={address.addressLine1}
          onChange={handleInputChange}
          required
          className="full-width"
        />
        
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2 (Optional)"
          value={address.addressLine2}
          onChange={handleInputChange}
          className="full-width"
        />
        
        <input
          type="text"
          name="city"
          placeholder="City *"
          value={address.city}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="state"
          placeholder="State *"
          value={address.state}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="pincode"
          placeholder="Pincode *"
          value={address.pincode}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );

  // Step 2: Payment Method
  const renderPaymentStep = () => (
    <div className="checkout-step">
      <h3>Payment Method</h3>
      <div className="payment-options">
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery</span>
          <small>Pay when your order is delivered</small>
        </label>
        
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="phonepe"
            checked={paymentMethod === 'phonepe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>PhonePe</span>
          <small>Pay securely with PhonePe</small>
        </label>
        
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>UPI Payment</span>
          <small>Pay with any UPI app</small>
        </label>
      </div>
    </div>
  );

  // Step 3: Order Review
  const renderReviewStep = () => (
    <div className="checkout-step">
      <h3>Review Your Order</h3>
      
      <div className="review-section">
        <h4>Shipping Address</h4>
        <div className="address-review">
          <p><strong>{address.fullName}</strong></p>
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p>Phone: {address.phone}</p>
          <p>Email: {address.email}</p>
        </div>
      </div>

      <div className="review-section">
        <h4>Payment Method</h4>
        <p>{paymentMethod === 'cod' ? 'Cash on Delivery' : 
           paymentMethod === 'phonepe' ? 'PhonePe' : 'UPI Payment'}</p>
      </div>

      <div className="review-section">
        <h4>Order Items</h4>
        {cart.map((item) => (
          <div key={item.id} className="review-item">
            <img src={item.imageUrl || '/placeholder.png'} alt={item.name} />
            <div className="item-details">
              <h5>{item.name}</h5>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price} each</p>
            </div>
            <div className="item-total">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 4: Success
  const renderSuccessStep = () => (
    <div className="checkout-step success-step">
      <div className="success-icon">✓</div>
      <h3>Order Placed Successfully!</h3>
      <p>Thank you for your order. You will receive a confirmation email shortly.</p>
      <p>Redirecting to order history...</p>
    </div>
  );

  if (orderSuccess) {
    return (
      <div className="checkout container">
        {renderSuccessStep()}
      </div>
    );
  }
  return (
    <div className="checkout container">
      <h2>Checkout</h2>
      
      {/* Progress Indicator */}
      <div className="checkout-progress">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Address</p>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Payment</p>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <span>3</span>
          <p>Review</p>
        </div>
      </div>

      <div className="checkout-layout">
        {/* Left Side - Form Steps */}
        <div className="checkout-form-container">
          {currentStep === 1 && renderAddressStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && renderReviewStep()}
          
          {/* Navigation Buttons */}
          <div className="checkout-navigation">
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={handlePrevStep}
                className="btn btn-secondary"
              >
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                type="button" 
                onClick={handleNextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn btn-success"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.imageUrl || '/placeholder.png'} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </div>
            <div className="price-row">
              <span>Tax (5%):</span>
              <span>₹{tax}</span>
            </div>
            <div className="price-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="price-row total-row">
              <strong>Total: ₹{finalTotal}</strong>
            </div>
          </div>

          {total > 500 && (
            <div className="free-shipping-notice">
              🎉 You get free shipping!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;