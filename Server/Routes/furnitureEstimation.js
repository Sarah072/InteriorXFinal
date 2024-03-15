// furnitureEstimation.js
const axios = require('axios');

const estimateFurniturePrice = async (description) => {
     // return Math.floor(Math.random() * 4500) + 500;
  try {
    // Make a POST request to the API endpoint on your server
    const response = await axios.post('http://your-flask-api-url:3001/api/furniture/estimate', {
      description,
    });

    // Return the estimated price from the response
    return response.data.estimatedPrice;
  } catch (error) {
    console.error('Error estimating furniture price:', error);
    return null;
  }
};

module.exports = {
  estimateFurniturePrice,
};

  