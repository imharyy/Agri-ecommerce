import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Admin.css';

function AddProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    specifications: '',
    videoUrl: '',
    discount: '',
    imageUrl: '', // Single image URL instead of file upload
    additionalImages: [''] // Additional image URLs
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Ensure user role is admin
    if (user && role !== 'admin') {
      navigate('/');
      return;
    }

    // Ensure user document exists in Firestore
    const ensureUserDoc = async () => {
      if (user && role === 'admin') {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            // Create user document with admin role
            await setDoc(userDocRef, { 
              role: 'admin', 
              email: user.email,
              createdAt: new Date() 
            });
          }
        } catch (error) {
          console.error('Error ensuring user document:', error);
        }
      }
    };

    ensureUserDoc();

    if (productId) {
      fetchProduct();
    }
  }, [productId, user, role, navigate]);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          name: data.name || '',
          price: data.price || '',
          description: data.description || '',
          category: data.category || '',
          specifications: data.specifications || '',
          videoUrl: data.videoUrl || '',
          discount: data.discount || '',
          imageUrl: data.imageUrl || '',
          additionalImages: data.additionalImages || ['']
        });
      } else {
        alert('Product not found');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error fetching product data');
      navigate('/admin');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAdditionalImageChange = (index, value) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.additionalImages.length > 1) {
      const newImages = formData.additionalImages.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        additionalImages: newImages
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'At least one product image URL is required';

    // Validate image URL format
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const priceFloat = parseFloat(formData.price);
      const discountFloat = parseFloat(formData.discount) || 0;
      const discountedPrice = discountFloat > 0 ? 
        priceFloat - (priceFloat * discountFloat / 100) : priceFloat;

      // Filter out empty additional image URLs
      const additionalImages = formData.additionalImages.filter(url => url.trim() !== '');

      const productData = {
        name: formData.name.trim(),
        price: priceFloat,
        description: formData.description.trim(),
        category: formData.category.trim(),
        specifications: formData.specifications.trim(),
        videoUrl: formData.videoUrl.trim(),
        discount: discountFloat,
        discountedPrice,
        imageUrl: formData.imageUrl.trim(), // Main image
        additionalImages, // Additional images array
        createdBy: user.uid,
        updatedAt: new Date(),
      };

      if (productId) {
        await updateDoc(doc(db, 'products', productId), productData);
        alert('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date(),
        });
        alert('Product added successfully!');
      }

      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        specifications: '',
        videoUrl: '',
        discount: '',
        imageUrl: '',
        additionalImages: ['']
      });
      
      navigate('/admin');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="loading">Please log in to continue...</div>;
  }

  if (role !== 'admin') {
    return <div className="error">Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="add-product-container">
      <div className="form-header">
        <h3>{productId ? 'Edit Product' : 'Add New Product'}</h3>
        <button type="button" onClick={() => navigate('/admin')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              <option value="seeds">Seeds</option>
              <option value="fertilizers">Fertilizers</option>
              <option value="equipment">Equipment</option>
              <option value="tools">Tools</option>
              <option value="pesticides">Pesticides</option>
              <option value="irrigation">Irrigation</option>
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows="4"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Specifications</label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleInputChange}
            placeholder="Enter product specifications (optional)"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Product Video URL</label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <div className="form-group">
          <label>Main Product Image URL *</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className={errors.imageUrl ? 'error' : ''}
          />
          {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
          {formData.imageUrl && (
            <div className="image-preview">
              <img 
                src={formData.imageUrl} 
                alt="Main product preview" 
                style={{ width: '200px', height: '200px', objectFit: 'cover', marginTop: '10px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Additional Product Images</label>
          {formData.additionalImages.map((imageUrl, index) => (
            <div key={index} className="additional-image-row">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                placeholder="https://example.com/additional-image.jpg"
                style={{ flex: 1, marginRight: '10px' }}
              />
              {formData.additionalImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
              {imageUrl && (
                <div className="image-preview">
                  <img 
                    src={imageUrl} 
                    alt={`Additional preview ${index + 1}`} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '5px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="add-image-btn"
          >
            + Add Another Image
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              productId ? 'Updating...' : 'Adding...'
            ) : (
              productId ? 'Update Product' : 'Add Product'
            )}
          </button>
        </div>
      </form>

      <div className="image-sources-info">
        <h4>Where to get image URLs:</h4>
        <ul>
          <li><strong>Unsplash:</strong> unsplash.com (free stock photos)</li>
          <li><strong>Pixabay:</strong> pixabay.com (free images)</li>
          <li><strong>Pexels:</strong> pexels.com (free stock photos)</li>
          <li><strong>Google Images:</strong> Right-click → "Copy image address"</li>
          <li><strong>Your own hosting:</strong> Upload to any image hosting service</li>
        </ul>
        <p><small>Make sure to use direct image URLs that end with .jpg, .png, .gif, etc.</small></p>
      </div>
    </div>
  );
}

export default AddProduct;
