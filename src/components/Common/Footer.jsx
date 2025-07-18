import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" style={{ 
      background: '#343a40', 
      color: 'white', 
      padding: '40px 0 20px 0', 
      marginTop: 'auto' 
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="footer-content" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px' 
        }}>
          <div className="footer-section">
            <h3 style={{ marginBottom: '15px' }}>🌾 FarmShop</h3>
            <p>Your trusted partner in agriculture</p>
          </div>
          
          <div className="footer-section">
            <h4 style={{ marginBottom: '15px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><Link to="/products" style={{ color: '#adb5bd', textDecoration: 'none' }}>Marketplace</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/blogs" style={{ color: '#adb5bd', textDecoration: 'none' }}>Blog</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/crop-prices" style={{ color: '#adb5bd', textDecoration: 'none' }}>Crop Prices</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/contact" style={{ color: '#adb5bd', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 style={{ marginBottom: '15px' }}>Contact Info</h4>
            <p>Email: info@farmshop.com</p>
            <p>Phone: +91 123-456-7890</p>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ 
          textAlign: 'center', 
          borderTop: '1px solid #495057', 
          paddingTop: '20px', 
          marginTop: '30px' 
        }}>
          <p>&copy; 2024 FarmShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;