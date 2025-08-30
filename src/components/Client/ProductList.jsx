import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCart } from '../../context/CartContext';
import '../../styles/Product.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductCard = ({ product }) => {
    const mainImage = product.imageUrl;
    const additionalImages = product.additionalImages || [];

    return (
      <div className="product-card">
        <Link to={`/product/${product.id}`}>
          <div className="product-image">
            <img
              src={mainImage || '/placeholder-image.jpg'}
              alt={product.name}
              onError={e => { e.target.src = '/placeholder-image.jpg'; }}
            />
            {product.discount > 0 && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>
        </Link>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="category">{product.category}</p>
          <p className="description">{product.description.substring(0, 100)}...</p>
          <div className="price-info">
            {product.discount > 0 ? (
              <>
                <span className="original-price">₹{product.price}</span>
                <span className="discounted-price">₹{product.discountedPrice}</span>
              </>
            ) : (
              <span className="price">₹{product.price}</span>
            )}
          </div>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="product-list-container">
      <h2 className="marketplace-heading">🛍️ Marketplace</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="product-grid">
        {filteredProducts.length === 0 && <p>No products found.</p>}
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;












