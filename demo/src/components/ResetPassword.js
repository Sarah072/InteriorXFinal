
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import the useParams hook
import './ResetPassword.css'; 

import backgroundImage from './images/abstract-smooth-brown-wall-background-layout-designstudioroomweb-templatebusiness-report-with-smooth.jpg';

import { Link } from 'react-router-dom';
const ResetPassword = () => {
  const { email } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(''); // Initialize username state

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/reset/${email}`, { password });
      console.log(response.data); // Add this line to see the response in the console
      setMessage(response.data.message);
      setUsername(response.data.username);
    } catch (error) {
      console.error(error); // Add this line to see any errors in the console
      setMessage('An error occurred');
    }
    
  };

  return (
    <div className='body'>
    <style>
        {`
          html, body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>
    <div className='resetDiv'>

      <h2>Reset Password</h2>
      {message && <p style={{ color: 'black' }}>{message}</p>}
       
      <form onSubmit={handleResetPassword}>
       <p>Username: {username}</p>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='resetInput'
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='resetInput'
        />
       
        <button className="resetbtn" type="submit">Reset Password</button>
      </form>
      <div className='bck'>
                 <p>
                  <Link className='bckLogin' to="/">
                    Back to Login
                  </Link>
                </p>
                </div>
    </div>
    </div>
  );
};

export default ResetPassword;
