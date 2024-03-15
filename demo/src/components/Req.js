import React, { useState, useRef, useEffect} from 'react';
import flat from './images/flat.jpg';
import house from './images/house.jpg';
import SR from './images/singleRoom.png';
import studio from './images/studio.jpg';
import lib from './images/lib.jpg';
import O from './images/office.jpg';
import BR from './images/bedroom.jpeg';
import BTHR from './images/bathroom.jpg';
import LR from './images/livingRoom.jpg';
import KR from './images/kidRoom.jpg';
import KTHN from './images/kitchen.jpg';
import DR from './images/dining.jpg';
import GR from './images/guestRoom.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './Req.css';
import ChatbotUI from '../ChatbotUI';
import backgroundImage from './images/white.jpg';
import TBench3DModel from '../catalog/items/RotatingHouse/rotatingBlock';
import pro from './images/carosel1.jpeg';
import pro2 from './images/house1.jpg';
import pro3 from './images/house2.jpg';
import Footer from './footer';
import carosel4 from './images/carosel4.jpg';
import carosel5 from './images/carosel5.jpg';
import carosel6 from './images/edu.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel"; // Import the Carousel component
// Inside the QuantityCounter component
const QuantityCounter = ({ quantity, setQuantity, isSelected, title}) => {
  const [selected, setSelected] = useState(isSelected);

  const toggleSelection = () => {
    setSelected(!selected); // Toggle the selected state
    if (!selected) {
      setQuantity(quantity + 1);
    } else {
      // Ensure that setQuantity can never be less than 0
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    }
  };

  return (
    <div className="quantity-counter">
      <div>
        <button
          className={`${selected ? 'selected' : ''}`}
          onClick={toggleSelection}
        >
          {selected ? 'Selected' : 'Select'}
        </button>
      <div style={{backgroundColor: 'black', padding: '1px 30px', marginTop: '100px'}}>
      <p style={{color: 'white'}}>{title}</p>
      </div>
      </div>
    </div>
  );
};


const Header = () => (
  <header>
     <p id='getStarted'>.</p>
     <div className='typeOfProjectH'>
    <h1 className='typeOfProject'>What type of project do you want?</h1>
    </div>
  </header>
);

const ImageCard = ({ imageSrc, altText, paragraphText, onClick }) => {
  return (
    <div className="image-card" onClick={onClick}>
      <p>{paragraphText}</p>
      <img src={imageSrc} alt={altText} />
    </div>
  );
};

const RoomSelection = ({ selectedRooms, resetSelection }) => {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const roomData = [
        {
          name: 'Living room',
          imageSrc: LR,
          
        },
        {
          name: 'Kitchen',
          imageSrc: KTHN,
        },
        {
          name: 'Bedroom',
          imageSrc: BR,
        },
        {
            name: 'Dining Room',
            imageSrc: DR,
          },
          {
            name: 'Bathroom',
            imageSrc: BTHR,
          },
          {
            name: 'Office',
            imageSrc: O,
          },
        
          {
            name: 'Guestroom',
            imageSrc: GR,
          },
          {
            name: 'Kids Room',
            imageSrc: KR,
          },
        
          {
            name: 'Library',
            imageSrc: lib,
          },
       
      ];
      const navigate = useNavigate();
    
      const { username } = useParams();
      const [reactPlannerV0, setReactPlannerV0] = useState('');

      const handleClick = (index) => {
        const room = roomData[index];
        const roomName = room.name;
        localStorage.setItem('roomName', roomName);
        setCurrentRoomIndex(index);
      };
      const handleOpenProject = () => {
        const roomName = localStorage.getItem('roomName');
        const username = localStorage.getItem('username');
        
        if (!roomName || !username) {
          console.error('roomName or username not found in local storage');
          return;
        }
        
        fetch(`http://localhost:3000/api/projectRooms/${username}/${roomName}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data && data.reactplannerv0) {
              // Set the 'react-planner-v0' value in local storage
              localStorage.setItem('react-planner_v0', data.reactplannerv0);
              setReactPlannerV0(data.reactplannerv0);
              navigate('/SecondProject'); 
            } else {
              console.error('Response data does not contain reactplannerv0 field');
              // Handle the case where the response does not contain the expected data
              // Display a notification here
              alert('There is no recent project.');
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            // Handle the error, e.g., show an error message to the user
            // Display a notification here
            alert('An error occurred while fetching the project.');
          });
      };

    
      const handleStartNewProject = () =>{
        localStorage.setItem("react-planner_v0", JSON.stringify({}));
        navigate('/SecondProject');
      }

      return (
        <div className="room-selection" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
          <header>
            <p id='getStarted'>.</p>
            <div className='typeOfProjectH'>
              <h1 className='typeOfProject'>Your Selected Rooms</h1>
            </div>
          </header>
        
          <div className="room-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', overflowX: 'auto' }}>
            {selectedRooms.map((quantity, index) => {
              if (quantity > 0 && roomData[index]) {
                const isSelected = currentRoomIndex === index; // Check if this room is selected
                return (
                  <div className="room" key={index} style={{ flex: '1 0 calc(25% - 20px)' }}>
                    <Link className='selectedRooms' onClick={() => handleClick(index)}>
                      <img src={roomData[index].imageSrc} alt={roomData[index].name} style={{ width: '100%', height: 'auto' }} />
                      <p>
                        {roomData[index].name}
                      </p>
                    </Link>
                    {isSelected && (
                      <div>
                        <p>Do you want to:</p>
                        <div className='buttonSet'>
                          <button className='prevProject' onClick={() => handleOpenProject()}>
                            Open Previous Project
                          </button>
                          <p>OR</p>
                          <button className='NewProject' onClick={() => handleStartNewProject()}>
                            Start New Project
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
      

    };
    

const Req = () => {
  const initialQuantities = Array(12).fill(0); // Initial quantities array
  const initialSelectedImage = null; // Initial selectedImage value
  const [quantities, setQuantities] = useState(Array(12).fill(0));
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRoomSelection, setShowRoomSelection] = useState(true);

  const appRef = useRef(null);

  const [isAllSelected, setIsAllSelected] = useState(false); // Track the selected state of all buttons

  const resetSelection = () => {
    // Reset the selected state of all buttons to "false"
    setIsAllSelected(false);
    // Reset quantities to initial value
    setQuantities(initialQuantities);
  };
  
  useEffect(() => {
    const storedSelectedImage = localStorage.getItem('selectedImage');
    const storedQuantities = localStorage.getItem('quantities');
  
    console.log('Stored selectedImage:', storedSelectedImage);
    console.log('Stored quantities:', storedQuantities);
  
    if (storedSelectedImage) {
      setSelectedImage(JSON.parse(storedSelectedImage));
    }
  
    if (storedQuantities) {
      setQuantities(JSON.parse(storedQuantities));
    }
  }, []);
  

  // Save state to local storage whenever the selectedImage or quantities change
  useEffect(() => {
    localStorage.setItem('selectedImage', JSON.stringify(selectedImage));
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [selectedImage, quantities]);

  const updateQuantity = (index, newQuantity) => {
    setQuantities((prevQuantities) => {
      // Create a copy of the previous quantities array
      const newQuantities = [...prevQuantities];
      // Update the quantity for the specified index
      newQuantities[index] = newQuantity;
      return newQuantities; // Return the new array
    });
  };
  

  const handleImageClick = (index, defaultQuantities) => {
    setSelectedImage(index);
    setQuantities(defaultQuantities);

    // Scroll to the next section (app) after image click
    appRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProceedClick = () => {
    setShowRoomSelection(true);
    setSelectedImage(initialSelectedImage); // Reset selectedImage to initial value
    setQuantities(initialQuantities); // Reset quantities to initial value
  };
 
const images = [
  { src: LR, title: 'Living Room' },
  { src: KTHN, title: 'Kitchen' },
  { src: BR, title: 'Bedroom' },
  { src: DR, title: 'Dining Room' },
  { src: BTHR, title: 'Bathroom' },
  { src: O, title: 'Office' },
  { src: GR, title: 'Guest Room' },
  { src: KR, title: "Kid's Room" },
  { src: lib, title: 'Library' }
];
  const [startIndex, setStartIndex] = useState(0);
 
 
  const handleForward = () => {
    if (startIndex + 3 < images.length) {
      setStartIndex(startIndex + 3);
     
    }
  };

  const handleBackward = () => {
    if (startIndex - 3 >= 0) {
      setStartIndex(startIndex - 3);
      
    }
  };

  
const carouselImages = [carosel4, carosel5, carosel6];
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isTextDisplayed, setIsTextDisplayed] = useState(false);

useEffect(() => {
  // Set interval to switch images every 3 seconds
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  // Set interval to display text every 3 seconds
  const textInterval = setInterval(() => {
    setIsTextDisplayed(true);
    setTimeout(() => {
      setIsTextDisplayed(false);
    }, 2000); // Display text for 2 seconds
  }, 3000);

  return () => clearInterval(textInterval);
}, []);

  return (
    
    <div>
     <Navbar />
    <div>
  

    <Carousel showThumbs={false} showStatus={false} infiniteLoop={true}  autoPlay={true} interval={3000} >
   

    <div className="image-container2">
        <img src={pro2} alt="Image 2" style={{height: '560px', width: '90%', marginTop: '70px'}} />
        <div className="shading"></div>
        <h1 className='mainLine mainLine3' style={{ marginTop: '-5px' }}>Infuse Your Signature Style into Every Corner <br></br><span className='mainLineSpan' style={{fontSize: '30px'}}>Craft Your Ideal Room and Furniture Fusion!</span></h1>
        <button className='getStarted'><a href='#getStarted'>Get Started</a></button>
      </div>
      

      <div className="image-container2">
        <img src={pro3} alt="Image 3" style={{height: '560px', width: '90%', marginTop: '70px'}} />
        <div className="shading"></div>
        <h1 className='mainLine mainLine3' style={{ marginTop: '-5px' }}>Where Aesthetics Merge with Functionality <br></br><span style={{fontSize: '30px'}}>Curate Your Space's Style and Furniture Affinity!</span></h1>
        <button className='getStarted'><a href='#getStarted'>Get Started</a></button>
      </div>

      <div className="image-container2">
        <img src={pro} alt="InteriorX" style={{height: '630px', width: '90%', marginBottom: '60px'}} />
        <div className="shading"></div>
        <h1 className='mainLine' style={{ marginTop: '-10px' }}>Where Creativity Meets Comfort <span style={{fontSize: '30px'}}>Discover Your Dream Space Today!</span></h1>
        <button className='getStarted'><a href='#getStarted'>Get Started</a></button>
      </div>

     

    </Carousel>

    <div className="containerReq">
    <div className="left-side">
    <h2 style={{fontSize: '35px'}}>Revolutionize Your Interior Design with Our Innovative Application</h2>
        <p>Our innovative interior design web app revolutionizes the traditional approach to home decor. It offers an intuitive platform for visualizing and experimenting with different design elements in real-time, empowering users to create personalized spaces that reflect their unique style and personality. With a vast library of furniture and customizable features, our app provides a seamless and creative design experience for remodeling or designing homes from scratch.</p>
      </div>
      <div className="right-side">
      
        <div className="carousel-container">
          <img
            src={carouselImages[currentImageIndex]}
            alt="Carousel"
            onLoad={() => setIsTextDisplayed(true)}
          />
        </div>
        {isTextDisplayed && (
          <div className="popup-text">
            <p style={{color: 'white'}}>Redefine Interior Design with Our Dynamic Web App</p>
          </div>
        )}
      </div>
    </div>


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
       <div className="overlay">
        <Header />
        <div className="row">
          <ImageCard
            imageSrc={house}
            altText="Image 1"
            paragraphText="House"
            onClick={() =>
              handleImageClick(0, [1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0])
            }
          />
          <ImageCard
            imageSrc={SR}
            altText="Image 2"
            paragraphText="Single Room"
            onClick={() =>
              handleImageClick(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            }
          />
        </div>
        <div className="row">
          <ImageCard
            imageSrc={flat}
            altText="Image 3"
            paragraphText="Flat"
            onClick={() =>
              handleImageClick(2, [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0])
            }
          />
          <ImageCard
            imageSrc={studio}
            altText="Image 4"
            paragraphText="Studio"
            onClick={() =>
              handleImageClick(3, [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
            }
          />
          </div>
        </div>
      </div>
      <div style={{margin: '0 10%'}}>
      <div>
      <div  ref={appRef}>
        <h1 className="h2" style={{color: 'black'}}>Choose the rooms that compose your project</h1>
        <div className="row2">
          {images.slice(startIndex, startIndex + 4).map((image, index) => (
            <React.Fragment key={index}>
            
              <div className='boxes' style={{ backgroundImage: `url(${image.src})`,  backgroundPosition: 'center', backgroundSize: 'cover'}}>
                <QuantityCounter
                  quantity={quantities[startIndex + index]}
                  setQuantity={(newQuantity) => updateQuantity(startIndex + index, newQuantity)}
                  title={image.title}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="controls">
  <button onClick={handleBackward}>&lt;</button>
  <button onClick={handleForward}>&gt;</button>
</div>
</div>
    
       
       </div>
          {showRoomSelection && (
            <RoomSelection selectedRooms={quantities} resetSelection={resetSelection} />
          )}
        <ChatbotUI />
        <div className="room-selection" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
    <div className="overlay"></div>
    <button className="next" onClick={resetSelection}><b>START AGAIN?</b></button>
    </div>
      </div>
      <Footer />
      </div>
   
    
  );
};

export default Req;
 {/* <h1 className='mainLine'>Experience the magic of interior design in stunning 3D detail</h1> 
  <div className="house" style={{borderRadius: '30%', overflow: 'hidden', marginTop: '250px'}}>
       
        <TBench3DModel />
      </div>
      */}