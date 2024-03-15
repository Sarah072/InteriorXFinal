import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './images/greenbg.jpg';
import myImage from './images/green.jpg';
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({}); // New state for validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          username: '',
          fname: '',
          lname: '',
          email: '',
          password: '',
        });
        navigate('/LoginForm');
      } else {
        // Handle validation errors
        if (response.status === 400) {
          // Use alert for validation errors
          alert(data.errorMessage);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div>
      <style>
        {`
          html, body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-attachment: fixed;
          }
        `}
      </style>
      <div className="FirstParent">
        <div className="child2">
          <img className="couch1" src={myImage} alt="InteriorX" />
        </div>

        <div className="parent4">
          <div className="child2 child211">
            <div className="parent">
              <div className="child">
                <h1 className="signin">Sign Up</h1>
              </div>

              <div className="child">
              <Link to="/LoginForm" className="signuplink">
              <h1 className="signin  signin2">Sign In</h1>
              </Link>
              
            </div>
            </div>

            <div className="content">
              <br />
              <label htmlFor="username">Username</label>
              <br />
              <input
                id="username2"
                type="text"
                name="username" // Add the name attribute
                value={formData.username}
                onChange={handleChange}
              />
              <br />
              <br />
              <label htmlFor="fname">First name</label>
              <br />
              <input
                id="fname"
                type="text"
                name="fname" // Add the name attribute
                value={formData.fname}
                onChange={handleChange}
              />
              <br />
              <br />
              <label htmlFor="lname">Last name</label>
              <br />
              <input
                id="lname"
                type="text"
                name="lname" // Add the name attribute
                value={formData.lname}
                onChange={handleChange}
              />
              <br />
              <br />
              <label htmlFor="email">Your email</label>
              <br />
              <input
                id="emailS"
                type="email"
                name="email" // Add the name attribute
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <br />
              <label htmlFor="pass">Password</label>
              <br />
              <input
                id="passS"
                type="password"
                name="password" // Add the name attribute
                value={formData.password}
                onChange={handleChange}
              />
              <br />
              <br />
            
           

              <button className="buttonsignup" onClick={handleSignup}>
                SIGN UP
              </button>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
