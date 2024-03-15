import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import myImage from './images/green.jpg';
import './LoginFront.css';
import backgroundImage from './images/greenbg.jpg';
const LoginForm = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Navigate the user to the desired route directly
      navigate('/Req');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setMessage(response.data.message);

      // Store the token in local storage if the "Keep me logged in" checkbox is checked
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
      }
      getSavedDesigns();
      navigate('/Req');
    } catch (error) {
      setMessage('Incorrect username or password');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false); // Switch back to the login form
    setMessage(''); // Clear any error message shown during password reset
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/reset-password', { email: resetEmail });
      if (response.data.emailFound) {
        navigate(`/reset-password/${resetEmail}`); // Pass the email as a URL parameter
      } else {
        setMessage('Email not found.');
       
      }
    } catch (error) {
      setMessage('An error occured!');
    }
  };

   // frontend code
const getSavedDesigns = async () => {
  const username = localStorage.getItem('username');

  if (!username) {
      console.log('Username not found in local storage');
      return;
  }

  try {
      const response = await axios.get(`http://localhost:3000/api/getSavedDesigns`, {
          params: { username }, // Pass username as a parameter
      });
      const data = response.data;

      if (data && data.length > 0) {
          data.forEach(savedDesign => {
              const projectDataString = savedDesign.projectData;
              const projectData = JSON.parse(projectDataString);

              localStorage.setItem(`projectData_${localStorage.length}`, JSON.stringify(projectData));
          });

          console.log('Saved designs retrieved and stored in local storage');
      } else {
          console.log('No saved designs found for the username');
      }
  } catch (error) {
      console.error('Error fetching or processing saved designs:', error);
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
      <div className="parent2">
        <div className="child2 child2Img">
          <img className="img1" src={myImage} alt="InteriorX" />
        </div>

        <div className="child2 child21">
          <div className="parent">
            <div className="child">
              <h1 className="signin">Sign In</h1>
            </div>

            <div className="child">
              <Link to="/SignUp" className="signuplink">
                <h1 className="signup">Sign Up</h1>
              </Link>
            </div>
          </div>

          <div className="content">
            <br></br>
            {showForgotPassword ? (
              // Password reset form
              <div className='resetPass'>
              <div className='contentReset'>
                <h2>Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                  <input
                    id="username"
                    type="email"
                    placeholder="Your Email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                  <button className="buttonReset" type="submit">
                    Reset Password
                  </button>
                  <p style={{ color: 'white' }}>{message}</p>
                  
                </form>
                <p>
                  <p className='bckLoginn'>OR</p>
                  <button className="buttonReset" onClick={handleBackToLogin} to="/">
                    Back to Login
                  </button>
                </p>
                </div>
              </div>
            ) : (
              // Login form
              <div className='contentLog'>
              <form onSubmit={handleLogin}>
              
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                />
               
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
                <div className="parent3">
                  <div className="child3 keep">
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      Keep me logged in
                    </label>
                  </div>
                  <div className="child3">
                    <button
                      className="ForgetPassword"
                      type="button"
                      onClick={handleForgotPassword}
                    >
                      Forget password?
                    </button>
                  </div>
                </div>
                <button className="button2" onClick={handleLogin}>
                  SIGN IN
                </button>
                {message && <p style={{ color: 'white' }}>{message}</p>}
              </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
