// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';
// import '../../styles/Header.css';

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
  
//   // Safe context usage with error handling
//   let user = null;
//   let role = null;
//   let cart = [];
  
//   try {
//     const authContext = useAuth();
//     user = authContext?.user;
//     role = authContext?.role;
    
//     const cartContext = useCart();
//     cart = cartContext?.cart || [];
//   } catch (error) {
//     console.error('Error accessing context in Header:', error);
//   }

//   const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

//   const handleLogout = async () => {
//     try {
//       const { signOut } = await import('firebase/auth');
//       const { auth } = await import('../../firebase');
//       await signOut(auth);
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <header className="header">
//       <div className="container">
//         <Link to="/" className="logo">
//           🌾 FarmShop
//         </Link>
        
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="search-input"
//           />
//           <button className="search-btn">🔍</button>
//         </div>
        
//         <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
//           <Link to="/products" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
//           <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>Blog</Link>
//           <Link to="/crop-prices" onClick={() => setIsMenuOpen(false)}>Crop Prices</Link>
//           <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          
//           {user && (
//             <>
//               <Link to="/order-history" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
//               {role === 'admin' && (
//                 <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
//               )}
//             </>
//           )}
          
//           <Link to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)}>
//             🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//           </Link>
          
//           {user ? (
//             <div className="user-menu">
//               <Link to="/account" onClick={() => setIsMenuOpen(false)}>👤 Account</Link>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </div>
//           ) : (
//             <div className="auth-links">
//               <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
//               <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
//             </div>
//           )}
//         </nav>
        
//         <button 
//           className="menu-toggle"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;











import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import '../../styles/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  let user = null;
  let role = null;
  let cart = [];

  try {
    const authContext = useAuth();
    user = authContext?.user;
    role = authContext?.role;

    const cartContext = useCart();
    cart = cartContext?.cart || [];
  } catch (error) {
    console.error('Error accessing context in Header:', error);
  }

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const handleLogout = async () => {
    try {
      const { signOut } = await import('firebase/auth');
      const { auth } = await import('../../firebase');
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          🌾 FarmShop
        </Link>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        {/* Nav Links */}
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
          <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link to="/crop-prices" onClick={() => setIsMenuOpen(false)}>Crop Prices</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

          {user && (
            <>
              <Link to="/order-history" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              {role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
              )}
            </>
          )}

          <Link to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)}>
            🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-actions">
              <Link to="/account" onClick={() => setIsMenuOpen(false)}>👤 Account</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </div>
          )}
        </nav>

        {/* Hamburger Toggle Button */}
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
