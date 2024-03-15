//K9ia#en.aNSW#%9 openstreetMap API password
//AIzaSyBNd_ZhL5shksGeje5HDPFjD4MVvSzgNyk
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState('');
  const [shops, setShops] = useState([]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json`
      );

      const { lat, lon } = response.data[0];
      const shopResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&lat=${lat}&lon=${lon}&q=furniture`
      );

      setShops(shopResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Find Nearby Furniture Shops</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location..."
          value={location}
          onChange={handleLocationChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {shops.length > 0 ? (
          <ul>
            {shops.map((shop, index) => (
              <li key={index}>{shop.display_name}</li>
            ))}
          </ul>
        ) : (
          <p>No furniture shops found nearby.</p>
        )}
      </div>
    </div>
  );
};

export default App;

/*import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import p3 from './images/p3.jpg';
import './LocalSuppliers.css';
import Navbar from './Navbar';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';


// Mock data for testing
const mockFurnitureShops = [
  {
    place_id: '1',
    name: 'FurnitureShop 1',
    geometry: { location: { lat: 33.685, lng: 73.048 } },
    photos: [{ photo_reference: 'photo1' }, { photo_reference: 'photo2' }],
    reviews: [{ text: 'Good Quality Products', rating: 4 }, { text: 'Nice ambiance', rating: 5 }]
  },
  {
    place_id: '2',
    name: 'FurnitureShop 2',
    geometry: { location: { lat: 33.686, lng: 73.049 } },
    photos: [{ photo_reference: 'photo3' }, { photo_reference: 'photo4' }],
    reviews: [{ text: 'Great service', rating: 5 }, { text: 'Average food', rating: 3 }]
  },
  {
    place_id: '3',
    name: 'FurnitureShop 3',
    geometry: { location: { lat: 33.687, lng: 73.050 } },
    photos: [{ photo_reference: 'photo5' }, { photo_reference: 'photo6' }],
    reviews: [{ text: 'Excellent experience', rating: 5 }, { text: 'Poor service', rating: 2 }]
  }
];


const LocalSuppliers = () => {
  const [FurnitureShops, setFurnitureShops] = useState([]);
  const [selectedFurnitureShop, setSelectedFurnitureShop] = useState(null);
  const [searchLocation, setSearchLocation] = useState('Islamabad, Pakistan');
  const [mapCenter, setMapCenter] = useState({ lat: 33.6844, lng: 73.0479 }); // Default center for Islamabad

  // Function to fetch additional details of a FurnitureShop
/* const fetchFurnitureShopDetails = async (place_id) => {
    try {
      const response = await axios.post(http://localhost:3000/api/places/details?place_id=${place_id});
      const data = response.data;
      setSelectedFurnitureShop(data.result);
    } catch (error) {
      console.error('Error fetching FurnitureShop details:', error);
    }
  };
  
 useEffect(() => {
    // Set mock data for FurnitureShops
    setFurnitureShops(mockFurnitureShops);
  }, []);*/

  // Function to fetch additional details of a FurnitureShop
  /*const fetchFurnitureShopDetails = async (place_id) => {
    const selected = FurnitureShops.find(FurnitureShop => FurnitureShop.place_id === place_id);
    setSelectedFurnitureShop(selected);
  };

  // Function to fetch nearby FurnitureShops
 const fetchNearbyFurnitureShops = async () => {
    try {
      const response = await axios.post(http://localhost:3000/api/places?location=${mapCenter.lat},${mapCenter.lng});
      const data = response.data;
      setFurnitureShops(data.results);
    } catch (error) {
      console.error('Error fetching nearby FurnitureShops:', error);
    }
  };

  useEffect(() => {
    fetchNearbyFurnitureShops();
  }, [mapCenter]);

  const handleFurnitureShopClick = (FurnitureShop) => {
    fetchFurnitureShopDetails(FurnitureShop.place_id);
  };

  const handleLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };


  const handleSearch = async () => {
    try {
      const geocodingResponse = await axios.get(https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=AIzaSyBNd_ZhL5shksGeje5HDPFjD4MVvSzgNyk);
      console.log('Geocoding response:', geocodingResponse.data); // Log the response
      const location = geocodingResponse.data.results[0] && geocodingResponse.data.results[0].geometry && geocodingResponse.data.results[0].geometry.location;
      console.log('Location:', location); // Log the location
      if (location) {
        const { lat, lng } = location;
        setMapCenter({ lat, lng });
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };
  
  //AIzaSyBNd_ZhL5shksGeje5HDPFjD4MVvSzgNyk
  

  return (
    <div> <Navbar />
      <style>
      {`
        html, body {
          background-image: url(${backgroundImage});
          background-size: cover;
          background-attachment: fixed; 
          margin: 0; 
          padding: 0; 
        }
      `}
    </style>
    <div className="container">
     
      <h1>Furniture Shops in {searchLocation}</h1>
      <div className="input-container">
        <input
          type="text"
          value={searchLocation}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="map-list-container">
        <div>
          <h2>Map View</h2>
          <LoadScript
            googleMapsApiKey="AIzaSyBNd_ZhL5shksGeje5HDPFjD4MVvSzgNyk"
            loadingElement={<div style={{ height: '100%' }} />}
          >
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={mapCenter}
              zoom={12}
            >
              {FurnitureShops.map((FurnitureShop) => (
                <Marker
                  key={FurnitureShop.place_id}
                  position={{
                    lat: FurnitureShop.geometry.location.lat,
                    lng: FurnitureShop.geometry.location.lng,
                  }}
                  onClick={() => handleFurnitureShopClick(FurnitureShop)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div>
          <h2>List View</h2>
          <ul className="FurnitureShop-list">
            {FurnitureShops.map((FurnitureShop) => (
              <li key={FurnitureShop.place_id} onClick={() => handleFurnitureShopClick(FurnitureShop)} className="FurnitureShop-item">
                {FurnitureShop.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedFurnitureShop && (
        <div className="selected-FurnitureShop">
          <h2>Selected FurnitureShop</h2>
          <p>Name: {selectedFurnitureShop.name}</p>
          <p>Latitude: {selectedFurnitureShop.geometry.location.lat}</p>
          <p>Longitude: {selectedFurnitureShop.geometry.location.lng}</p>
          {selectedFurnitureShop.photos && (
            <div>
              <h3>Photos</h3>
              <div className="photos-container">
                {selectedFurnitureShop.photos.map((photo, index) => (
                  <img key={index} src={p3} alt={Photo ${index}} className="FurnitureShop-photo" />
                ))}
              </div>
            </div>
          )}
          {selectedFurnitureShop.reviews && (
            <div className='reviews-container'>
              <h3>Reviews</h3>
              <ul>
                {selectedFurnitureShop.reviews.map((review, index) => (
                  <li key={index}>
                    <p>{review.text}</p>
                    <p>Rating: {review.rating}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default LocalSuppliers;*/