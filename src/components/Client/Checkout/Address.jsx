// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Address() {
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zip, setZip] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Save address info to localStorage or context for next steps
//     const shippingAddress = { address, city, state, zip };
//     localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
//     navigate('/checkout/payment');
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Shipping Address</h2>
//       <form onSubmit={handleSubmit} className="checkout-form">
//         <label>
//           Address:
//           <input
//             type="text"
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           City:
//           <input
//             type="text"
//             value={city}
//             onChange={e => setCity(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           State:
//           <input
//             type="text"
//             value={state}
//             onChange={e => setState(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           ZIP Code:
//           <input
//             type="text"
//             value={zip}
//             onChange={e => setZip(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Next: Payment</button>
//       </form>
//     </div>
//   );
// }

// export default Address;










import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Checkout.css';

function Address() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContinue = () => {
    localStorage.setItem('checkoutAddress', JSON.stringify(formData));
    navigate('/checkout/billing');
  };

  return (
    <div className="checkout-container">
      <h2>Shipping Address</h2>
      <form className="checkout-form">
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required />
        <button type="button" onClick={handleContinue}>Continue to Billing</button>
      </form>
    </div>
  );
}

export default Address;
