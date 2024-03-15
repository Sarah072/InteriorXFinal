import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Draggable from 'react-draggable';
import Navbar from './Navbar';

const MoodBoard = () => {
  const [images, setImages] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newElement = {
          id: uuidv4(),
          type: 'image',
          url: reader.result,
          position: { x: 0, y: 0 },
        };

        setImages((prevImages) => [...prevImages, newElement]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleElementUpload = () => {
    const newElement = {
      id: uuidv4(),
      type: 'text',
      text: text,
      position: { x: 0, y: 0 },
    };

    setImages((prevImages) => [...prevImages, newElement]);
    setText('');
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleElementDelete = (elementId) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== elementId));
    setSelectedElement(null);
  };

  const handleDrag = (event, { x, y }) => {
    if (selectedElement) {
      const updatedElements = images.map((element) =>
        element.id === selectedElement.id
          ? { ...element, position: { x, y } }
          : element
      );
      setImages(updatedElements);
    }
  };

  const squareSize = 300; // Adjust the size of the square as needed
  const squareSizeW = 500;
  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid #ccc',
        height: '700px',
        fontFamily: 'Arial, sans-serif', // Font family for the entire component
        textAlign: 'center', // Text alignment for the component
        backgroundColor: 'lightgreen',
      }}>
        <Navbar />
        <div style={{ marginTop: '140px'}}>
      <input
        style={{
          margin: '10px 0',
          padding: '5px',
        }}
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageUpload}
      />
      <input
        style={{
          margin: '10px 0',
          padding: '5px',
        }}
        type="text"
        value={text}
        placeholder="Type text here"
        onChange={(e) => setText(e.target.value)}
      />
      <button
        style={{
          margin: '10px 0',
          padding: '8px 15px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50', // Green color for the button
          color: '#fff', // White text color
          border: 'none',
          borderRadius: '4px', // Rounded corners
        }}
        onClick={handleElementUpload}
      >
        Add Text
      </button>
      {images.map((element) => (
        <Draggable
          key={element.id}
          position={element.position}
          onStart={() => handleElementClick(element)}
          onDrag={handleDrag}
        >
          <div
            style={{
              position: 'absolute',
              cursor: 'move',
              width: squareSizeW,
              height: squareSize,
              overflow: 'hidden',
              border:
                selectedElement && selectedElement.id === element.id
                  ? '2px solid #ff0000'
                  : '1px solid #ccc', // Border for selected element
              borderRadius: '8px', // Rounded corners for elements
            }}
          >
            {element.type === 'text' ? (
              <span
                style={{
                  fontSize: '16px',
                  color: '#333', // Text color for text elements
                }}
              >
                {element.text}
              </span>
            ) : (
              <img
                src={element.url}
                alt={`Image ${element.id}`}
                style={{ width: '100%', height: '100%', borderRadius: '8px' }} // Rounded corners for images
              />
            )}
            {selectedElement && selectedElement.id === element.id && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  cursor: 'pointer',
                  padding: '5px',
                  background: '#fff',
                  borderRadius: '0 8px 0 0', // Rounded corners for delete button
                }}
                onClick={() => handleElementDelete(element.id)}
              >
                &#10006;
              </span>
            )}
          </div>
        </Draggable>
      ))}
    </div>
    </div>
  );
};

export default MoodBoard;