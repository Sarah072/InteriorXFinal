import React, { useState, useEffect } from 'react';
import './Professional.css';
import Navbar from './Navbar';
import axios from 'axios';
import pro1 from './images/pro1.jpg';
import ClientComponent from './chat.js';
import bot from '../bot2.png';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import Footer from './footer.js';

const Professional = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [cost, setCost] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [isChatOpen, setChatOpen] = useState(false);

  const FetchProfessionals = () => {
    console.log("clicked");
    fetchProfessionals();
  }

  const fetchProfessionals = async () => {
    try {
      // Make a request to your backend API endpoint
      const response = await axios.get(`http://localhost:3000/Professionals/?specializedIn=${selectedOption}&minimumBudget=${cost}`);
      setProfessionals(response.data);
    } catch (error) {
      console.error('Error fetching professionals:', error);
    }
  };

  // Function to toggle the chat box visibility
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  return (
<div>
    <div>
      <Navbar/>

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
<div className='mainProCon'>
 
  <div className="container" style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
  <h1>Chat With Our Professionals</h1>
    <div className="options-group">
      <p style={{ fontFamily: 'Arial', fontSize: '18px', color: 'black' }}>Do you need help with Floor Planning or Interior Designing?</p>
      <div style={{display: 'flex', textAlign: 'center'}}>
        <div className="option-box" onClick={() => handleOptionChange('Interior Designing')} style={{ backgroundColor: selectedOption === 'Interior Designing' ? '#6DA4C4': 'lightblue', cursor: 'pointer', fontWeight: 'bold', color: 'rgb(52, 52, 52)', fontSize: '20px' }}>
          Interior Designing
        </div>
        <div className="option-box" onClick={() => handleOptionChange('Floor Planning')} style={{ backgroundColor: selectedOption === 'Floor Planning' ? '#6DA4C4': 'lightblue', cursor: 'pointer', fontWeight: 'bold', color: 'rgb(52, 52, 52)', fontSize: '20px' }}>
          Floor <br></br>Planning
        </div>
      </div>
    </div>
    <div className="text-input-group">
      <p style={{ fontFamily: 'Arial', fontSize: '18px', color: 'black'  }}>What is your budget?</p>
      <label>
        <CustomInput value={cost} onChange={handleCostChange} />
      </label>
    </div>
    <div style={{textAlign: 'center'}}>
      <button style={{padding: '10px 100px', backgroundColor: '#6DA4C4', fontWeight: 'bold', fontFamily: 'Arial', fontSize: '16px'}} onClick={() => FetchProfessionals()}>Submit</button>
    </div>
    <div className='profession'>
      <h2 style={{ fontFamily: 'Arial', fontSize: '24px', marginBottom: '10px' }}>List of Professionals</h2>
      {professionals.length === 0 ? (
        <p style={{ fontFamily: 'Arial', fontSize: '18px' }}>None</p>
      ) : (
        <ul>
          {professionals.map((professional) => (
            <div className='ProParent' key={professional._id}>
              <li className='ProDes'>
                <b style={{ fontSize: '18px', margin: '4%' }}>Username: {professional.P_username}</b>
                <div style={{ fontSize: '16px', margin: '4%' }}>Specialized in: {professional.specialized_In}</div>
                <div style={{ fontSize: '16px', margin: '4%' }}>Minimum Budget: {professional.minimum_Budget}</div>
                <div style={{ fontSize: '16px', margin: '4%' }}>Experience: {professional.experience}</div>
                <div style={{ fontSize: '16px' , margin: '4%'}}>Rating: {professional.rating}</div>
                <div style={{ fontSize: '14px' , margin: '4%', backgroundColor: 'lightblue', padding: '10px', color: 'black', borderRadius: '10px'}}><b>You can chat with our professionals by clicking the chat icon on bottom-right</b></div>
              </li>
              <li className='ProImg'><img src={pro1} alt="Image" height={'100%'} width={'90%'} /></li>
             
            </div>
          ))}
        </ul>
      )}
    </div>
    <div className="chat-icon" onClick={toggleChat}>
      <img className="botImg" src={bot} alt="Chat" />
    </div>
    {isChatOpen && (
      <div>
        <ClientComponent />
      </div>
    )}
  </div>
</div>

    </div>
   
   
    </div>
  );
};

const CustomInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder='$'
      style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid black',
        outline: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'rgb(52, 52, 52)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default Professional;
