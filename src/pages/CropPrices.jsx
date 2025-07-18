// import React, { useState, useEffect } from 'react';

// function CropPrices() {
//   const [prices, setPrices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Using a mock API - replace with actual crop price API
//     const fetchCropPrices = async () => {
//       try {
//         // Mock data - replace with actual API call
//         const mockData = [
//           { crop: 'Rice', price: '₹2,200/quintal', change: '+2.5%', trend: 'up' },
//           { crop: 'Wheat', price: '₹2,100/quintal', change: '-1.2%', trend: 'down' },
//           { crop: 'Maize', price: '₹1,800/quintal', change: '+0.8%', trend: 'up' },
//           { crop: 'Sugarcane', price: '₹350/quintal', change: '+1.5%', trend: 'up' },
//           { crop: 'Cotton', price: '₹5,200/quintal', change: '-0.5%', trend: 'down' },
//           { crop: 'Soybean', price: '₹4,100/quintal', change: '+3.2%', trend: 'up' },
//         ];
        
//         // Simulate API delay
//         setTimeout(() => {
//           setPrices(mockData);
//           setLoading(false);
//         }, 1000);
        
//       } catch {
//         setError('Failed to fetch crop prices');
//         setLoading(false);
//       }
//     };

//     fetchCropPrices();
//   }, []);

//   if (loading) {
//     return <div className="container">Loading crop prices...</div>;
//   }

//   if (error) {
//     return <div className="container error">{error}</div>;
//   }

//   return (
//     <div className="crop-prices container">
//       <h2>Live Crop Prices</h2>
//       <p className="last-updated">Last updated: {new Date().toLocaleString()}</p>
      
//       <div className="prices-grid">
//         {prices.map((item, index) => (
//           <div key={index} className="price-card">
//             <h3>{item.crop}</h3>
//             <div className="price">{item.price}</div>
//             <div className={`change ${item.trend}`}>
//               {item.change} {item.trend === 'up' ? '↗️' : '↘️'}
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="market-info">
//         <h3>Market Information</h3>
//         <p>Prices are indicative and may vary based on quality, location, and market conditions.</p>
//         <p>For real-time trading prices, please contact your local mandi or commodity exchange.</p>
//       </div>
//     </div>
//   );
// }

// export default CropPrices;









import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import '../styles/CropPrices.css';

function CropPrices() {
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    const fetchCropPrices = async () => {
      const querySnapshot = await getDocs(collection(db, 'cropPrices'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCropData(data);
    };
    fetchCropPrices();
  }, []);

  return (
    <div className="crop-prices-container">
      <h2>🌾 Crop Prices Dashboard</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cropData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#4caf50" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="table-container">
        <table className="crop-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Price (₹)</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {cropData.map((item) => (
              <tr key={item.id}>
                <td>{item.crop}</td>
                <td>₹{item.price}</td>
                <td>{item.location || 'N/A'}</td>
                <td>{item.date || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CropPrices;
