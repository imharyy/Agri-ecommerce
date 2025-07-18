// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CropPrices() {
//   const [prices, setPrices] = useState([]);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         // Mock API - Replace with a real agricultural price API
//         const response = await axios.get('https://api.mockapi.io/crop-prices');
//         setPrices(response.data);
//       } catch (err) {
//         console.error(err);
//         setPrices([
//           { crop: 'Wheat', price: 2500 },
//           { crop: 'Rice', price: 3000 },
//           { crop: 'Corn', price: 2000 },
//         ]); // Fallback data
//       }
//     };

//     fetchPrices();
//   }, []);

//   return (
//     <div className="crop-prices container">
//       <h2>Live Crop Prices</h2>
//       <ul>
//         {prices.map((item, index) => (
//           <li key={index}>{item.crop}: ₹{item.price}/month</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CropPrices;














import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import '../../styles/CropPrices.css';

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
