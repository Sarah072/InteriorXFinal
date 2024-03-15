import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ProfileSetting.css';
import Navbar from './Navbar';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import { FaCamera } from 'react-icons/fa';
import Footer from './footer';
const ProfileSetting = () => {
  const [user, setUser] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    phoneNo: '',
    address: '',
    image: '',
  });

 // New state variables for notification message and its visibility
 const [notification, setNotification] = useState('');
 const [isNotificationVisible, setIsNotificationVisible] = useState(false);

 // Function to show the notification
 const showNotification = (message) => {
   setNotification(message);
   setIsNotificationVisible(true);
   // Hide the notification after 10 seconds
   setTimeout(() => {
     setIsNotificationVisible(false);
   }, 10000);
 };

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Separate state variables for each field's editing status
  const [isFnameEditing, setIsFnameEditing] = useState(false);
  const [isLnameEditing, setIsLnameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [isNumberEditing, setIsNumberEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);

  // Function to handle edit button click for each field
  const handleEditField = (fieldName) => {
    switch (fieldName) {
      case 'fname':
        setIsFnameEditing(true);
        break;
      case 'lname':
        setIsLnameEditing(true);
        break;
      case 'pp':
        setIsEditing(true);
        break;
      case 'email':
        setIsEmailEditing(true);
        break;
      case 'password':
        setIsPasswordEditing(true);
        break;
      case 'username':
        setIsUsernameEditing(true);
        break;
      case 'address':
        setIsAddressEditing(true);
        break;
      case 'phoneNo':
        setIsNumberEditing(true); // Set isNumberEditing to true for the Phone Number field
        break;
      default:
        break;
    }
  };

  const handleSaveField = async (fieldName) => {
   
    axios
      .put(`http://localhost:3000/profile/user/${user.username}`, { [fieldName]: user[fieldName] })
      .then((res) => {
        // Set the specific field's editing status to false
        switch (fieldName) {
          case 'fname':
            setIsFnameEditing(false);
            showNotification(`First name updated successfully!`);
            break;
          case 'lname':
            setIsLnameEditing(false);
            showNotification(`Last name updated successfully!`);
            break;
          case 'pp':
              setIsEditing(false);
              showNotification(`Profile photo updated successfully!`);
              break;
          case 'email':
            setIsEmailEditing(false);
            showNotification(`Email updated successfully!`);
            break;
          case 'password':
            setIsPasswordEditing(false);
            showNotification(`Password updated successfully!`);
            break;
          case 'username': // Update the fieldName here to 'username'
            setIsUsernameEditing(false);
            showNotification(`Username updated successfully!`);
            break;
          case 'phoneNo':
            setIsNumberEditing(false);
            showNotification(`Phone number updated successfully!`);
             break;
          case 'address':
            setIsAddressEditing(false);
            showNotification(`Address updated successfully!`);
            break;
         
          default:
            break;
        }
        console.log(`${fieldName} saved successfully!`);

        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState(''); // State to store the username
  //const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [selectedImageName, setSelectedImageName] = useState('');
 
  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log('Username from localStorage:', username);
  
    if (username) {
      // Make a request to the server to fetch user details based on the username
      axios.get(`http://localhost:3000/profile/user/${username}`)
      
        .then((response) => {
          // Update the user state with the fetched user details
          console.log('User data response:', response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
   

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    const fetchImages = async (username) => {
      if (username) {
        try {
          const response = await axios.get(`http://localhost:3000/api/fetch-profile2/${username}`);
          // Extract the image URL from the response object
          const imageUrl = response.data.image;
          setImages([{ image: imageUrl }]); // Update the images state with a single object
          console.log('API Response:', response.data);
          console.log('Image URL:', imageUrl);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };
    const fetchInterval = setInterval(() => {
      fetchImages(username);
    }, 3000); // Adjust the interval as needed (10,000 milliseconds = 10 seconds)
  
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      console.log("Image URL: ", images[0].image);
    }
  }, [images]);

  const handleImageUpload = (e) => {
    const selectedFileName = e.target.files[0].name; // Get the filename from the selected file
    setSelectedImageName(selectedFileName); // Update the state with the filename
    setSelectedFile(e.target.files[0]);
  };

  const handlePostClick = async () => {
    if (selectedFile) {
     
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('username', username );
  
      try {
        const response = await axios.post('http://localhost:3000/api/fetch-profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const { imagePath } = response.data;
       
  
        setImages([...images, { image: imagePath }]);
        setSelectedFile(null);
        setSelectedImageName('');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
   
  };
  
  const fileInputRef = useRef(null);

  const handleCameraClick = (e) => {
    e.preventDefault(); // Prevent default behavior of the click event
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
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
      `}
    </style>
      <div className="user-profile">
     

        <div className="profile-pic">
        <div className="image-grid2">
        {images && images.length > 0 ? (
          <div className="image-container2">
            <img
              src={`http://localhost:3000/${images[0].image}`}
              alt={`Image 0`}
              onClick={() => handleImageClick(`http://localhost:3000/${images[0].image}`)}
            />
          </div>
        ) : (
          <p className='notFound'>No image found</p>
        )}
      </div>
      
    
    {selectedImage && (
      <div className="modal">
        <span className="close-button" onClick={() => setSelectedImage(null)}>
          &times;
        </span>
        <div className="modal-content">
          <img src={selectedImage} alt="Selected" className="modal-image" />
        </div>
      </div>
    )}

  

    </div>
    <div className="upload-form">
      <div style={{textAlign: 'center'}}>
    <label htmlFor="upload-input" className="black-icon" onClick={handleCameraClick}>
        <FaCamera />
      </label>
      <input
        ref={fileInputRef}
        id="upload-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }} // Hide file input
        onChange={handleImageUpload}
      />
     
      <p className="selected-image-name">{selectedImageName}</p>
      <button className="black-button" onClick={handlePostClick}>
        Save
      </button>
      </div>
    </div>
        <div className="user-detailsprofile">
  
    <div className="field-container">
      <label>First Name:</label>
      <input
     
        name="fname"
        value={user.fname}
        onChange={handleChange}
        readOnly={!isFnameEditing}
      />
      <div className="edit-btn">
        {isFnameEditing ? (
          <button onClick={() => handleSaveField('fname')}>Save</button>
        ) : (
          <button onClick={() => handleEditField('fname')}>Edit</button>
        )}
      </div>
    </div>

  
    <div className="field-container">
      <label>Last Name:</label>
      <input
      
        name="lname"
        value={user.lname}
        onChange={handleChange}
        readOnly={!isLnameEditing}
      />
      <div className="edit-btn">
        {isLnameEditing ? (
          <button onClick={() => handleSaveField('lname')}>Save</button>
        ) : (
          <button onClick={() => handleEditField('lname')}>Edit</button>
        )}
      </div>
    </div>

  
    <div className="field-container">
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        readOnly={!isEmailEditing}
      />
      <div className="edit-btn">
        {isEmailEditing ? (
          <button onClick={() => handleSaveField('email')}>Save</button>
        ) : (
          <button onClick={() => handleEditField('email')}>Edit</button>
        )}
      </div>
    </div>

 
    <div className="field-container">
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        readOnly={!isPasswordEditing}
      />
      <div className="edit-btn">
        {isPasswordEditing ? (
          <button onClick={() => handleSaveField('password')}>Save</button>
        ) : (
          <button onClick={() => handleEditField('password')}>Edit</button>
        )}
      </div>
    </div>

    <div className="field-container">
    <label>Phone No:</label>
    <input
   
      name="phoneNo"
      value={user.phoneNo}
      onChange={handleChange} // Update the handleChange function to handle phone number changes
      placeholder="add phone number"
      readOnly={!isNumberEditing}
    />
    <div className="edit-btn">
      {isNumberEditing ? (
        <button onClick={() => handleSaveField('phoneNo')}>Save</button> // Update the field name to 'phoneNo'
      ) : (
        <button onClick={() => handleEditField('phoneNo')}>Edit</button>
      )}
    </div>
  </div>
  
    <div className="field-container">
      <label>Address:</label>
      <input
      
        name="address"
        value={user.address}
        onChange={handleChange}
        placeholder='add address'
        readOnly={!isAddressEditing}
      />
      <div className="edit-btn">
        {isAddressEditing ? (
          <button onClick={() => handleSaveField('address')}>Save</button>
        ) : (
          <button onClick={() => handleEditField('address')}>Edit</button>
        )}
      </div>
    </div>

  </div>
</div>
  
  {isNotificationVisible && (
    <div className="notification">
      <span>{notification}</span>
    </div>
)}
</div>
);
};
export default ProfileSetting;