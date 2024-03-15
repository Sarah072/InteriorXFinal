import React, { useState } from 'react';
import './colFeedback.css';
import backgroundImage from './images/pexels-johannes-plenio-1103970.jpg';
import axios from 'axios';


const Notification = ({ message, onClose }) => (
    <div className="notificationFeedback">
      <p>{message}</p>
      <button className="closeButton" onClick={onClose}>×</button>
    </div>
  );

const VRFeedbackForm = () => {
  const [UsabilityRating, setUsabilityRating] = useState(null);
  const [FurnitureInteractionRating, setFurnitureInteractionRating] = useState(null);
  const [RealismRating, setRealismRating] = useState(null);
  const [ComfortRating, setComfortRating] = useState(null);
  const [PerformanceRating, setPerformanceRating] = useState(null);
  const [suggestionsForImprovement, setSuggestionsForImprovement] = useState(''); 
  const [notification, setNotification] = useState(null);

  const handleRatingChange = (question, value) => {
    switch (question) {
      case 'userInterface':
        setUsabilityRating(value);
        break;
      case 'designFeatures':
        setFurnitureInteractionRating(value);
        break;
      case 'realTimeCollaboration':
        setRealismRating(value);
        break;
      case 'performance':
        setComfortRating(value);
        break;
      case 'navigation':
        setPerformanceRating(value);
        break;
     
      default:
        break;
    }
  };
const handleSubmit = async () => {
    try {
        const username = localStorage.getItem('username');
      const response = await axios.post('http://localhost:3000/VRfeedback', {
        username,
        UsabilityRating,
        FurnitureInteractionRating,
        RealismRating,
        ComfortRating,
        PerformanceRating,
        suggestionsForImprovement,
      });

      setNotification({ message: response.data.message, type: 'success' });
      
      // Reset form or navigate to the next page as needed
      setUsabilityRating(null);
      setFurnitureInteractionRating(null);
      setRealismRating(null);
      setComfortRating(null);
      setPerformanceRating(null);
      setSuggestionsForImprovement('');
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Error submitting feedback', type: 'error' });
     
      // Handle error
    }
  };

  
  const closeNotification = () => {
    setNotification(null);
  };
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
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
        <div className='mainDivFeedback'>
        <h2>{String.fromCodePoint(0x1F3A5)} Help us improve</h2>


      <div className='quesParas'>
      <div>
        <p>How easy was it to navigate and interact with the 3D floor plan in VR?</p>
        {['Very Easy', 'Somewhat easy', 'Neutral', 'Difficult'].map((option) => (
          <label key={option}>
            <input type="radio" name="userInterface" value={option} onChange={() => handleRatingChange('userInterface', option)} checked={UsabilityRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div>
        <p>How satisfied were you with the way furniture was presented and interacted with in VR?</p>
        {['Very satisfied', 'Somewhat satisfied', 'Neutral', 'Not satisfied at all'].map((option) => (
          <label key={option}>
            <input type="radio" name="designFeatures" value={option} onChange={() => handleRatingChange('designFeatures', option)} checked={FurnitureInteractionRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div>

   
        <p>How realistic did the 2D floor plan and furniture appear in the VR environment?</p>
        {['Very realistic and immersive', 'Somewhat realistic and immersive', 'Neutral', 'Not realistic or immersive'].map((option) => (
          <label key={option}>
            <input type="radio" name="realTimeCollaboration" value={option} onChange={() => handleRatingChange('realTimeCollaboration', option)} checked={RealismRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div>
        <p>Did you experience any discomfort, motion sickness, or fatigue during or after the VR experience?</p>
        {[' Very comfortable', 'Somewhat comfortable', 'Neutral', 'Very uncomfortable'].map((option) => (
          <label key={option}>
            <input type="radio" name="performance" value={option} onChange={() => handleRatingChange('performance', option)} checked={ComfortRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>
      

      <div>
        <p>How was the overall performance of the VR application? Did you experience any lag or delays?</p>
        {['Excellent performance', 'Good performance', 'Neutral', 'Poor performance'].map((option) => (
          <label key={option}>
            <input type="radio" name="navigation" value={option} onChange={() => handleRatingChange('navigation', option)} checked={PerformanceRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div>
        <p>Suggestions for Improvement:</p>
        <textarea value={suggestionsForImprovement} onChange={(e) => setSuggestionsForImprovement(e.target.value)} />
      </div>
      </div>

      <button onClick={handleSubmit}>Submit Feedback</button>
      {notification && (
          <Notification message={notification.message} onClose={closeNotification} />
        )}
    </div>
    </div>
  );
};

export default VRFeedbackForm;
