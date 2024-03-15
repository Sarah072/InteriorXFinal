import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FurnitureEstimator.css'; // Import the CSS file
import backgroundImage from './images/edu.png';
import Navbar from './Navbar';

const api = axios.create({
  baseURL: 'http://localhost:2001', // Update with your Flask app's URL
});

const FurnitureEstimator = () => {
  const [description, setDescription] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEstimateClick = async () => {
    setIsLoading(true);
  
    try {
      const response = await api.post('/estimate_price', {
        description: description,
      });
  
      console.log('Response:', response); // Print the entire response object
  
      setEstimatedPrice(response.data.estimated_price);
      console.log('Estimated Price:', response.data.estimated_price);
    } catch (error) {
      console.error('Error estimating price:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  return (
    <div>
      <Navbar />
    <div className="room-selection" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', paddingTop: '5px', paddingBottom: '185px'}}>
   
    <div className="container">
      
      <h1 className="heading">Furniture Cost Estimator</h1>
      <p>Enter description (format: furniture name, furniture type, sale (0%-100%))</p>
      <textarea
        rows="3"
        cols="20"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Light beige children's bedroom in gray,Hub Furniture,0%"
        className="textarea"
      />
      <button onClick={handleEstimateClick} className="button" disabled={isLoading}>
        {isLoading ? 'Estimating...' : 'Estimate Price'}
      </button>
      {isLoading && <div className="loading">Estimating price...</div>}
      {estimatedPrice !== null && !isLoading && <p className="price">Estimated Price: ${estimatedPrice}</p>}
    </div>
    </div>
    </div>
  );
};

export default FurnitureEstimator;
