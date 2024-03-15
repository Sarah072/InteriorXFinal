import React, { useState } from 'react';
import Navbar from './Navbar'; // Adjust the path based on your project structure
import Footer from './footer';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import mailImg from './images/istockphoto-1226858848-612x612.jpg';
import { FaUser } from 'react-icons/fa';

const ContactForm = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const sendFormData = async (formData) => {
    try {
     
      const response = await fetch('http://localhost:3000/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

     
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      if (responseData) {
        setMessage({ text: responseData.message, type: 'success' });
    
       
      } else {
        setMessage({ text: 'Failed to submit the form. Please try again.', type: 'error' });
      
      }
    } catch (error) {
      setMessage({ text: 'An error occurred. Please try again later.', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const userMessage = e.target.elements.message.value;

    const formData = {
        name,
        email,
        message: userMessage};
        console.log('formData', formData);

    await sendFormData(formData);
  };


  return (
    <div>
      <Navbar />

      <style>
        {`
          html, body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-attachment: fixed; 
            margin: 0; 
            padding: 0; 
          }

          form {
            max-width: 60%;
            margin: 20px auto;
            padding-left: 3%;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 50px;
            margin-top: 10%;
          }

          label {           
            margin-bottom: 8px;
            font-weight: bold;
          }

          .contactForm input[type="text"],
          .contactForm input[type="email"],
          .contactFormtextarea {
            width: 80%;
            padding: 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
            border: 1px solid #7e7e7e;
            border-radius: 4px;
            font-size: 14px;
            background-color: #f5f5f5; /* Grey background */
          }

          textarea {
            width: 80%;
            padding: 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
            border: 1px solid #7e7e7e;
            border-radius: 4px;
            font-size: 14px;
            resize: vertical;
            background-color: #f5f5f5; /* Grey background */
          }

          button {
            background-color: #4B0082;
            color: #fff;
            padding: 3% 30%; 
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 10%;
            border-radius: 20px;
          }

          button:hover {
            background-color: #45a049;
          }

          .home {
            margin-left: 600px;
          }

          .contactUsH {
            text-align: center;
            margin-top: 50px;
            color: #010101;
            color: #4B0082;
            font-size: 45px;
          }

          .success-message {
            color: #4caf50;
            margin-top: 10px;
          }

          .error-message {
            color: #f44336;
            margin-top: 10px;
          }

          @media (max-width: 768px) {
            .contactFormImage img {
              display: none;
            }
            .contactUsH {
               
                font-size: 30px;
              }
          }
        `}
      </style>

    

      <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          
            <div className='contactForm'>
              <h1 className="contactUsH">Contact Us</h1>
              <input placeholder='Name' type="text" id="name" name="name" required />
              <input type="email" placeholder='Email' id="email" name="email" required />
              <textarea placeholder='Message' id="message" name="message" rows="8" required></textarea>
              {message && (
        <p className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </p>
      )}
              <button type="submit">Submit</button>
            
            </div>

            <div className='contactFormImage'>
              <img
                src={mailImg}
                alt={`ImageMail`}
                style={{height: '100%', width: '100%'}}
              />
            </div>
        </div>       
      </form>
    
      <Footer />
    </div>
  );
};

export default ContactForm;
