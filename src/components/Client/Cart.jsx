// import React from 'react';
// import { useCart } from '../../context/CartContext';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/Cart.css';

// function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
//   const navigate = useNavigate();

//   const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const handleCheckout = () => {
//     navigate('/checkout');
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="cart-container">
//         <h2>Your Cart is Empty</h2>
//         <Link to="/products">Go to Marketplace</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
//       <ul className="cart-list">
//         {cart.map(item => (
//           <li key={item.id} className="cart-item">
//             <img src={item.imageUrl || '/placeholder.png'} alt={item.name} />
//             <div className="cart-item-details">
//               <h3>{item.name}</h3>
//               <p>Price: ₹{item.price}</p>
//               <label>
//                 Quantity:
//                 <input
//                   type="number"
//                   min="1"
//                   value={item.quantity}
//                   onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
//                 />
//               </label>
//               <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <h3>Total: ₹{totalPrice}</h3>
//       <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button>
//     </div>
//   );
// }

// export default Cart;















import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout/address');
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>My Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.imageUrl || '/placeholder.png'} alt={item.name} />
              <div className="details">
                <h4>{item.name}</h4>
                <p className="price">₹{item.discountedPrice || item.price}</p>
                <div className="qty">
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cart.length}</p>
          <p className="total">Total: ₹{total.toFixed(2)}</p>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
