// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { useCart } from '../../context/CartContext';
// import '../../styles/Product.css';

// function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const docRef = doc(db, 'products', id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setProduct({ id: docSnap.id, ...docSnap.data() });
//       } else {
//         navigate('/notfound');
//       }
//     };
//     fetchProduct();
//   }, [id, navigate]);

//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//     navigate('/cart');
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="product-details-container">
//       <h2>{product.name}</h2>
//       <img src={product.imageUrl || '/placeholder.png'} alt={product.name} />
//       <p>{product.description}</p>
//       <p>Price: ₹{product.price}</p>
//       <label>
//         Quantity:
//         <input
//           type="number"
//           min="1"
//           value={quantity}
//           onChange={e => setQuantity(parseInt(e.target.value) || 1)}
//         />
//       </label>
//       <button onClick={handleAddToCart}>Buy Now</button>
//     </div>
//   );
// }

// export default ProductDetails;










import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCart } from '../../context/CartContext';
import '../../styles/Product.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        setProduct(data);
        setMainImage(data.imageUrl);
      } else {
        navigate('/notfound');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (!product) return <div className="loading">Loading...</div>;

  const images = [product.imageUrl, ...(product.additionalImages || [])];

  return (
    <div className="product-details-container">
      {/* Image Section */}
      <div className="product-image-section">
        <img
          src={mainImage || '/placeholder.png'}
          alt={product.name}
          className="main-image"
          onError={(e) => (e.target.src = '/placeholder.png')}
        />
        <div className="thumbnail-row">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumbnail-${i}`}
              className={`thumbnail ${mainImage === img ? 'active' : ''}`}
              onClick={() => setMainImage(img)}
              onError={(e) => (e.target.src = '/placeholder.png')}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="product-info-section">
        <h2>{product.name}</h2>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>

        <div className="price-block">
          {product.discount > 0 ? (
            <>
              <span className="original-price">₹{product.price}</span>
              <span className="discounted-price">₹{product.discountedPrice}</span>
              <span className="discount-badge">-{product.discount}%</span>
            </>
          ) : (
            <span className="price">₹{product.price}</span>
          )}
        </div>

        <div className="quantity-control">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            min="1"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          />
        </div>

        <button className="buy-now-btn" onClick={handleAddToCart}>
          🛒 Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;














