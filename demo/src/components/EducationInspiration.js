import React from 'react';
import './EducationInspiration.css'; // Import the CSS file for styles
import { Link } from 'react-router-dom'; 

import Navbar from './Navbar';
import ChatbotUI from '../ChatbotUI';
import backgroundImage from './images/edu.png';

const EducationInspiration = () => {
  return (
    <div className="options-container">
      <style>
        {`
          html, body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-attachment: fixed;
          }
        `}
      </style>
      <Navbar />
      <div className='firstOpt'>
        <Link to="/DesignInspirationIdeas" className="option-box" style={{ backgroundColor: '#20B2AA' }}>
          <h2>IDEAS</h2>
          <p className='eduParas'>Design inspiration and ideas</p>
        </Link>
        <Link to="/DesignTrendsArticle" className="option-box" style={{ backgroundColor: '#3CB371' }}>
          <h2>ARTICLES</h2>
          <p className='eduParas'>Expert advice and articles</p>
        </Link>
      </div>

      <div className='firstOpt'>
        <Link to="/EducationInspirationNews" className="option-box" style={{ backgroundColor: '#2E8B57' }}>
          <h2>NEWS</h2>
          <p className='eduParas'>Industry news and updates</p>
        </Link>
        <Link to="/Community" className="option-box" style={{ backgroundColor: '#8FBC8F' }}>
          <h2>COMMUNITY</h2>
          <p className='eduParas'>User-generated content and community features</p>
        </Link>
      </div>
      <ChatbotUI />
    </div>
  );
};

export default EducationInspiration;
