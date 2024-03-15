import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import { FaTrash } from 'react-icons/fa'; // Import the garbage/trash icon
import Footer from './footer';

const FavouriteItems = () => {
  const [favItems, setFavItems] = useState([]);
  const username = localStorage.getItem('username');
  const path = '../';

  const fetchFavItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/favRoutes/get?username=${username}`);
      setFavItems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (itemName) => {
    try {
      // Perform the deletion API call
      await axios.delete(`http://localhost:3000/favRoutes/delete`, {
        params: { username, item: itemName },
      });
  
      // Update the local state after successful deletion
      setFavItems((prevItems) => prevItems.filter((item) => item.item !== itemName));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavItems();
  }, [username]);

  return (
    <div>
      <div className="fav-items">
        <Navbar />
        <div className='container'>
          <h1>Wishlist and Favorites</h1>
          <div className='items-container'>
            {favItems.map((item, index) => (
              <div className='item' key={item._id}>
                <div className="item-content">
                  <img className="item-pic" src={`${path}${item.Image}`} alt={item.item} />
                  <div className='ItemDes' style={{textAlign: 'start'}}>
                    <div style={{margin: '5px', fontSize: '1rem'}}><p>{item.item.split(',')[0]}</p></div>
                    <div style={{margin: '5px', fontSize: '1rem'}}><p>Description: {item.description}</p></div>
                    <div style={{margin: '5px', fontSize: '1rem'}}><p>Carbon Footprint: {item.carbonFootprint} cf</p></div>
                    <div style={{margin: '5px', fontSize: '1rem'}}><p>Color: {item.color}</p></div>
                    <div style={{margin: '5px', fontSize: '1rem'}}><p>Price: {item.item.split(',')[1]}</p></div>
                  </div>
                </div>
                <button
                  className='deleteButton'
                  onClick={() => handleDeleteItem(item.item)}
                  aria-label={`Delete ${item.item}`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          .fav-items {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-image: url(${backgroundImage});
            background-size: cover;
            background-attachment: fixed;
            font-family: Arial, sans-serif;
            padding-bottom: 20px;
          }

          .container {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 80%;
            max-width: 1200px;
          }

          h1 {
            color: #333;
          }

          .items-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;
          }

          .item {
            flex: 0 0 calc(33.333% - 20px);
            margin-bottom: 20px;
            position: relative;
          }

          .item-content {
            background-color: black;
            color: white;
            padding: 10px 10px 30px;
            border-radius: 20px;
          }

          .item-pic {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }

          .deleteButton {
            position: absolute;
            top: 10px;
            right: 10px;
            background: grey;
            border-radius: 50%;
            cursor: pointer;
            padding: 10px;
          }
          .ItemDes p {
            font-size: 17px;
            color: white;
          }
          @media screen and (max-width: 768px) {
            .ItemDes p {
              font-size: 15px;
              color: white;
           
            }
            .items-container {
              display: block;
            }
          }
        `}</style>
      </div>
      <div style={{display: 'block'}}>
        <Footer />
      </div>
    </div>
  );
};

export default FavouriteItems;
