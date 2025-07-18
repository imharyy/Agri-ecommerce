import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState(''); // Renamed to avoid conflict
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      navigate('/products', { state: { searchResults: products } });
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search products..." 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;