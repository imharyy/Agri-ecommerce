// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Billing() {
//   const [billingName, setBillingName] = useState('');
//   const [billingAddress, setBillingAddress] = useState('');
//   const [billingCity, setBillingCity] = useState('');
//   const [billingState, setBillingState] = useState('');
//   const [billingZip, setBillingZip] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Save billing info to localStorage or context
//     const billingInfo = { billingName, billingAddress, billingCity, billingState, billingZip };
//     localStorage.setItem('billingInfo', JSON.stringify(billingInfo));
//     // For now, just navigate to home or order confirmation page
//     navigate('/');
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Billing Information</h2>
//       <form onSubmit={handleSubmit} className="checkout-form">
//         <label>
//           Name on Card:
//           <input
//             type="text"
//             value={billingName}
//             onChange={e => setBillingName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Billing Address:
//           <input
//             type="text"
//             value={billingAddress}
//             onChange={e => setBillingAddress(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           City:
//           <input
//             type="text"
//             value={billingCity}
//             onChange={e => setBillingCity(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           State:
//           <input
//             type="text"
//             value={billingState}
//             onChange={e => setBillingState(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           ZIP Code:
//           <input
//             type="text"
//             value={billingZip}
//             onChange={e => setBillingZip(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Complete Order</button>
//       </form>
//     </div>
//   );
// }

// export default Billing;






import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Checkout.css';

function Billing() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/checkout/payment');
  };

  return (
    <div className="checkout-container">
      <h2>Billing Information</h2>
      <form className="checkout-form">
        <input type="text" placeholder="Cardholder Name" />
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="MM/YY" />
        <input type="text" placeholder="CVV" />
        <button type="button" onClick={handleContinue}>Proceed to Payment</button>
      </form>
    </div>
  );
}

export default Billing;
