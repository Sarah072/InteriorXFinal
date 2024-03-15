//const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');

const router = express.Router();
router.use(cors());


router.get('/proxy', async (req, res) => {
  try {
    const url = req.query.url;
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/*
router.post('/', async (req, res) => { // Change to POST
  try {
    const { location } = req.query;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&type=restaurant&key=AIzaSyCI9jc0gJjbX4SHxSnREeVRQJdADv1svlg`
    );
    const data = await response.json();
    console.log(data); // Log the data received from Google Places API
    res.json(data);
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
*/

// server.js


// Endpoint to fetch nearby restaurants
/*router.post('/', async (req, res) => {
  try {
    const { location } = req.query;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&type=restaurant&key=AIzaSyCI9jc0gJjbX4SHxSnREeVRQJdADv1svlg`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*///AIzaSyCI9jc0gJjbX4SHxSnREeVRQJdADv1svlg

const API_KEY = 'AIzaSyBNd_ZhL5shksGeje5HDPFjD4MVvSzgNyk';


router.post('/', async (req, res) => {
  const { location } = req.query;
  const radius = 5000; // in meters
  const type = 'furniture_store';

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const minRating = 4.0; // Minimum rating considered high
    data.results = data.results.filter((shop) => {
      return shop.rating >= minRating;
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching nearby shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to fetch details of a restaurant
router.post('/details', async (req, res) => {
  try {
    const { place_id } = req.query;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,geometry,rating,reviews,photos&key=AIzaSyBNd_ZhL5shksGeje5HDPFjD4MVvSzgNyk`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;