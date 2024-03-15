import React, { useState, useEffect,  } from 'react';
import Navbar from './Navbar';
import backgroundImage from './images/pexels-pixabay-459277.jpg';
import { Link } from 'react-router-dom';

function InteriorDesignPins() {

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = '//assets.pinterest.com/js/pinit.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  const [pinEmbedCode, setPinEmbedCode] = useState('');
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);


  useEffect(() => {
    // Set the embed code directly (replace with your logic if needed)
    setPinEmbedCode(`
      <iframe
        src="https://assets.pinterest.com/ext/embed.html?id=10696117857761816"
        height="556"
        width="345"
        frameborder="0"
        scrolling="no"
      ></iframe>
    `);
  }, []);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };
 
 

  return (

    <div className="pins-container">
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
        .pin1{
            
            margin-top: 200px;
            margin-left: 20px; 
        }
        .trendsH{
          margin-top: 300px;
          color: black;
        }
        .carousel-container {
        
          height: 100px; /* Adjust the height as needed */
        }
        .video-container {
          position: relative;
          margin-top: -30px;
          width: 100%;
          height: 640px;
          overflow: hidden;
        }
      
        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      
  
  .overlay {
    margin-top: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Black overlay with 50% opacity */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 70px;
    font-weight: bold;
    text-align: center;
    z-index: 1;
    pointer-events: none; 
    
  }
  .overlay h1{
    width: 700px;
    color: white;
    font-size: 70px;
    font-weight: bold;
    text-align: center;
    margin-top: -100px;

  }
      `}
    </style>
  
    <div className="carousel-container">
       
      </div>

     
      <div className="video-container">
        <video
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/4Xw4byPvl/videoblocks-img_20220225_133546_012_014_hdr_2022-09-29_09-07-05_upload_ha6v4ysfs__019198fa3faaef24957018428a325d55__P360.mp4"
          title="Embedded Video"
          frameborder="0"
          allowfullscreen
          controls={!isVideoPlaying} // Hide controls if the video is playing
          poster="poster-image.jpg"
          autoplay
          loop
          muted
          onPlay={handleVideoPlay}
        ></video>
        <div className="overlay">
          <h1>Trends And Inspiration Boards</h1>
        </div>
      </div>
     
      <div>
        <div
          className="pin1" dangerouslySetInnerHTML={{ __html: `
       
        <a data-pin-do="embedBoard" data-pin-board-width="800" data-pin-scale-height="440" data-pin-scale-width="40" href="https://www.pinterest.com/Ladelicateparenthese/home-d%C3%A9coration/entrance-entr%C3%A9e/">
          View Board on Pinterest
        </a>

        <a data-pin-do="embedBoard" data-pin-board-width="800" data-pin-scale-height="440" data-pin-scale-width="40" href="https://www.pinterest.com/Ladelicateparenthese/home-d%C3%A9coration/workspace-bureaux/">
        View Board on Pinterest
      </a>

        <a href="https://www.pinterest.com/pin/441704675968058858/" data-pin-do="embedPin"</a>

        <a href="https://www.pinterest.com/pin/1022528290388258746/" data-pin-do="embedPin"> </a>

        
        <a href="https://www.pinterest.com/pin/2603712279114777/" data-pin-do="embedPin"> </a>

        <a href="https://www.pinterest.com/pin/597149231866175212/" data-pin-do="embedPin"> </a>
        
        <a href="https://www.pinterest.com/pin/774124928870961/" data-pin-do="embedPin"> </a>

        <a href="https://www.pinterest.com/pin/315252042678305008/" data-pin-do="embedPin"> </a>

        <a
        href="https://www.pinterest.com/thedesignfiles/"
        data-pin-do="embedUser"
        data-pin-board-width="800"
        data-pin-scale-height="440"
        data-pin-scale-width="40">
        </a>

        <a
        href="https://www.pinterest.com/swooneditions/"
        data-pin-do="embedUser"
        data-pin-board-width="800"
        data-pin-scale-height="440"
        data-pin-scale-width="40">
        </a>

       
      ` }} />

      
    </div>
    <Link to="/MoodBoard">MoodBoard</Link>
    </div>
  );
}

export default InteriorDesignPins;


