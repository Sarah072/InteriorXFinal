import React, { useEffect, useState } from 'react';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import './Community.css';
import Navbar from './Navbar';
import axios from 'axios';
import userContentImg from './images/comm4.jpg';
import Footer from './footer';
import ChatbotUI from '../ChatbotUI';

const CommunityForm = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState(''); // State to store the username
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [selectedImageName, setSelectedImageName] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [comments, setComments] = useState(new Array(images.length).fill([]));

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }

    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getImages');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    // Initial fetch
    fetchImages();

    // Set up an interval to fetch images every X milliseconds (e.g., every 10 seconds)
    const fetchInterval = setInterval(() => {
      fetchImages();
    }, 3000); // Adjust the interval as needed (10,000 milliseconds = 10 seconds)

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  const handleImageUpload = (e) => {
    const selectedFileName = e.target.files[0].name; // Get the filename from the selected file
    setSelectedImageName(selectedFileName); // Update the state with the filename
    setSelectedFile(e.target.files[0]);
  };

  const handlePostClick = async () => {
    if (selectedFile) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('username', username);
      formData.append('date', formattedDate);

      try {
        const response = await axios.post('http://localhost:3000/api/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { imagePath, username, date } = response.data;

        setImages([...images, { image: imagePath, username: username, date: date }]);
        setSelectedFile(null);
        setSelectedImageName('');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleLikeClick = async (index) => {
    try {
      const updatedImages = [...images];
      const likedImage = updatedImages[index];

      // Increment the likes count locally
      likedImage.likes += 1;

      // Update the image's likes count on the server
      await axios.post(`http://localhost:3000/api/likeImage/${likedImage._id}`);

      // Update the state to reflect the new likes count
      setImages(updatedImages);
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  const handleImageHover = (index) => {
    const image = document.getElementById(`image-${index}`);
    image.style.transform = "scale(1.1)";
  };

  const handleImageLeave = (index) => {
    const image = document.getElementById(`image-${index}`);
    image.style.transform = "scale(1)";
  };

  const handleModalClose = () => {
    setSelectedImageIndex(null);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleCommentSubmit = (index, comment) => {
    const updatedComments = [...comments];
    updatedComments[index] = [...updatedComments[index], comment];
    setComments(updatedComments);
  };

  return (
    <div> <Navbar />
    <div className="postContent">
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
     
      <img style={{height: '600px', width: '2000px', marginTop: '-90px'}} src={userContentImg} alt='image'/>
    
<div className="upload-section">
  <label style={{color: 'white', backgroundColor: '#007bdf'}} htmlFor="upload-input" className="upload-button">
    Choose File
  </label>
  <input
    id="upload-input"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="choose-file-input"
  />
  {selectedImageName && (
    <p className="selected-image-name">Selected File: {selectedImageName}</p>
  )}
  <button className="post-button" onClick={handlePostClick}>
    Post
  </button>
</div>



<div className="image-grid">
  {images.map((imageData, index) => (
    <div key={index} className="image-container">
      <div
        className="content-wrapper"
        onMouseEnter={() => handleImageHover(index)}
        onMouseLeave={() => handleImageLeave(index)}
        onClick={() => handleImageClick(index)}
      >
        <img
          id={`image-${index}`}
          src={`http://localhost:3000/${imageData.image}`}
          alt={`Image ${index}`}
        />
        <div className="image-description">
          <p style={{ color: 'black', fontWeight: 'bold' }}>Username: {imageData.username}</p>
          <p style={{ color: 'black' }}>Likes: {imageData.likes}</p>
          <p style={{ color: 'black' }}>Posted on {imageData.date}</p>
        </div>
      </div>
      <button className="like-button2" onClick={() => handleLikeClick(index)}>
        ❤️
      </button>
    </div>
  ))}
</div>


      {selectedImageIndex !== null && (
        <div className="modal">
          <span className="close-button" onClick={handleModalClose}>
            &times;
          </span>
          <div className="modal-content">
           
            <img
              src={`http://localhost:3000/${images[selectedImageIndex].image}`}
              alt={`Image ${selectedImageIndex}`}
              className="modal-image"
            />
            
            <div style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'inline-block'}}>
<button className="prev-button" onClick={handlePrevImage}>
Prev
</button>
<button className="next-button" onClick={handleNextImage}>
Next
</button>
      </div>      
           
          </div>
        </div>
      )}
      
    </div>
    <Footer />
    </div>
  );
};

export default CommunityForm;

