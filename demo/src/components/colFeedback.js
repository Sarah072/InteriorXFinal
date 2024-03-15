import React, { useState } from 'react';
import './colFeedback.css';
import backgroundImage from './images/pexels-johannes-plenio-1103970.jpg';
import axios from 'axios';
import Navbar from './Navbar';


const Notification = ({ message, onClose }) => (
    <div className="notificationFeedback">
      <p>{message}</p>
      <button className="closeButton" onClick={onClose}>×</button>
    </div>
  );

const FeedbackForm = () => {
  const [userInterfaceRating, setUserInterfaceRating] = useState(null);
  const [designFeaturesRating, setDesignFeaturesRating] = useState(null);
  const [realTimeCollaborationRating, setRealTimeCollaborationRating] = useState(null);
  const [performanceRating, setPerformanceRating] = useState(null);
  const [navigationRating, setnavigationRating] = useState(null);
  const [suggestionsForImprovement, setSuggestionsForImprovement] = useState(''); 
  const [notification, setNotification] = useState(null);

  const handleRatingChange = (question, value) => {
    switch (question) {
      case 'userInterface':
        setUserInterfaceRating(value);
        break;
      case 'designFeatures':
        setDesignFeaturesRating(value);
        break;
      case 'realTimeCollaboration':
        setRealTimeCollaborationRating(value);
        break;
      case 'performance':
        setPerformanceRating(value);
        break;
      case 'navigation':
        setnavigationRating(value);
        break;
     
      default:
        break;
    }
  };
const handleSubmit = async () => {
    try {
        const username = localStorage.getItem('username');
      const response = await axios.post('http://localhost:3000/colFeedback', {
        username,
        userInterfaceRating,
        designFeaturesRating,
        realTimeCollaborationRating,
        performanceRating,
        navigationRating,
        suggestionsForImprovement,
      });

      setNotification({ message: response.data.message, type: 'success' });
      
      // Reset form or navigate to the next page as needed
      setUserInterfaceRating(null);
      setDesignFeaturesRating(null);
      setRealTimeCollaborationRating(null);
      setPerformanceRating(null);
      setnavigationRating(null);
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
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
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
      `}
    </style>
        <div className='mainDivFeedback'>
        <h2>{String.fromCodePoint(0x1F44B)} Help us improve</h2>

      <div className='quesParas'>
      <div>
        <p>How intuitive did you find the design tool for creating floor plans and adding furniture?</p>
        {['Very Intuitive', 'Intuitive', 'Somewhat Intuitive', 'Not Intuitive'].map((option) => (
          <label key={option}>
            <input type="radio" name="userInterface" value={option} onChange={() => handleRatingChange('userInterface', option)} checked={userInterfaceRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>


      <div>
        <p>Did you encounter any issues while making changes to the room layout or adding furniture?</p>
        {['No Issues', 'Minor Issues', 'Some Issues', 'Major Issues'].map((option) => (
          <label key={option}>
            <input type="radio" name="designFeatures" value={option} onChange={() => handleRatingChange('designFeatures', option)} checked={designFeaturesRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div>
        <p>How well did the real-time collaboration feature work for you?</p>
        {['Seamless', 'Mostly Seamless', 'Occasionally Laggy', 'Frequently Laggy'].map((option) => (
          <label key={option}>
            <input type="radio" name="realTimeCollaboration" value={option} onChange={() => handleRatingChange('realTimeCollaboration', option)} checked={realTimeCollaborationRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div>
        <p>Did you experience any lag or delays while working on the collaborative design?</p>
        {['Smooth', 'Generally Smooth', 'Occasionally Slow', 'Frequently Slow'].map((option) => (
          <label key={option}>
            <input type="radio" name="performance" value={option} onChange={() => handleRatingChange('performance', option)} checked={performanceRating === option} />
            <span>{option}</span>
          </label>
        ))}
      </div>
      

      <div>
        <p>Was it easy for you to navigate through the collaborative design space and explore the changes?</p>
        {['Very Easy', 'Easy', 'Somewhat Difficult', 'Difficult'].map((option) => (
          <label key={option}>
            <input type="radio" name="navigation" value={option} onChange={() => handleRatingChange('navigation', option)} checked={navigationRating === option} />
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

export default FeedbackForm;
