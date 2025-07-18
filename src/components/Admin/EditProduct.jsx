import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    specifications: '',
    discount: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
          setFormData(docSnap.data());
        } else {
          alert('Product not found.');
          navigate('/admin');
        }
      } catch (error) {
        alert('Failed to fetch product.');
        console.error(error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'products', id), formData);
      alert('Product updated successfully!');
      navigate('/admin');
    } catch (error) {
      alert('Failed to update product.');
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h2>Edit Product</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Specifications:</label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Discount:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={() => navigate('/admin')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditProduct;