import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import { Resizable } from 'react-resizable';
import Navbar from './Navbar';
import './MoodBoard.css';

function MoodBoardd() {
  const [currentBoard, setCurrentBoard] = useState('');
  const [boards, setBoards] = useState([]);
  const [boardData, setBoardData] = useState({});
  const [images, setImages] = useState([]);
  const [imageSizes, setImageSizes] = useState({});
  const [textBoxes, setTextBoxes] = useState([]);
  const [createBoardMessage, setCreateBoardMessage] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(false);
  
  const [clickCount, setClickCount] = useState(0);

  // Function to handle double-click on the canvas
 
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const handleCanvasDoubleClick = () => {
    setClickCount(clickCount + 1);
    if (clickCount === 1) {
      setIsDrawing(true);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.lineCap = 'round';
      context.strokeStyle = 'pink';
      context.lineWidth = 5;
      contextRef.current = context;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);


  const handleToggleDraw = () => {
    setDrawMode(!drawMode);
    setIsDrawing(!isDrawing); // Fix: Update the 'isDrawing' state when toggling draw mode.
  };
  const handleImageUpload = (e) => {
    if (!currentBoard) {
      setCreateBoardMessage(true);
      return;
    }

   
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const imageData = {
          id: uuidv4(),
          src: event.target.result,
          position: { x: 0, y: 0 },
          size: { width: img.width, height: img.height },
        };

        const updatedBoardData = {
          ...boardData,
          [currentBoard]: {
            ...boardData[currentBoard],
            images: [...boardData[currentBoard].images, imageData],
          },
        };

        setImages([...images, imageData]);
        setImageSizes({
          ...imageSizes,
          [imageData.id]: { width: img.width, height: img.height },
        });
        setBoardData(updatedBoardData);
      };
      img.src = event.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTextUpload = () => {
    if (!currentBoard) {
      setCreateBoardMessage(true);
      return;
    }

    const newTextBox = { id: uuidv4(), content: '' };

    const updatedBoardData = {
      ...boardData,
      [currentBoard]: {
        ...boardData[currentBoard],
        textBoxes: [...boardData[currentBoard].textBoxes, newTextBox],
      },
    };

    setTextBoxes([...textBoxes, newTextBox]);
    setBoardData(updatedBoardData);
  };

  const handleTextBoxChange = (id, e) => {
    const updatedTextBoxes = textBoxes.map((textBox) => {
      if (textBox.id === id) {
        return { ...textBox, content: e.target.value };
      }
      return textBox;
    });

    const updatedBoardData = {
      ...boardData,
      [currentBoard]: {
        ...boardData[currentBoard],
        textBoxes: updatedTextBoxes,
      },
    };

    setTextBoxes(updatedTextBoxes);
    setBoardData(updatedBoardData);
  };

  const handleTextBoxClose = (id) => {
    const updatedTextBoxes = textBoxes.filter((textBox) => textBox.id !== id);

    const updatedBoardData = {
      ...boardData,
      [currentBoard]: {
        ...boardData[currentBoard],
        textBoxes: updatedTextBoxes,
      },
    };

    setTextBoxes(updatedTextBoxes);
    setBoardData(updatedBoardData);
  };

  const handleCreateBoard = () => {
    const newBoard = `Board ${boards.length + 1}`;

    setBoards([...boards, newBoard]);
    setBoardData({
      ...boardData,
      [newBoard]: { images: [], textBoxes: [] },
    });
    setCurrentBoard(newBoard);
    setCreateBoardMessage(false);
  };

  const handleDeleteBoard = (board) => {
    const updatedBoards = boards.filter((b) => b !== board);

    const { [board]: deletedBoard, ...rest } = boardData;

    setBoards(updatedBoards);
    setBoardData(rest);

    if (currentBoard === board) {
      setCurrentBoard('');
      setImages([]);
      setTextBoxes([]);
    }
  };

  const handleSwitchBoard = (board) => {
    setCurrentBoard(board);
    const boardInfo = boardData[board] || { images: [], textBoxes: [] };
    setImages(boardInfo.images);
    setTextBoxes(boardInfo.textBoxes);
    setCreateBoardMessage(false);
  };

  const handleDragStop = (e, data, image) => {
    const { x, y } = data;
    const updatedImages = images.map((img) => {
      if (img.id === image.id) {
        return { ...img, position: { x, y } };
      }
      return img;
    });
    setImages(updatedImages);
  };

  const handleResize = (e, { size }, imageId) => {
    setImageSizes({
      ...imageSizes,
      [imageId]: { width: size.width, height: size.height },
    });
  };

  const handleCancelImage = (id) => {
    const updatedImages = images.filter((img) => img.id !== id);

    const updatedBoardData = {
      ...boardData,
      [currentBoard]: {
        ...boardData[currentBoard],
        images: updatedImages,
      },
    };
    setImages(updatedImages);
    setBoardData(updatedBoardData);
  };
  const startDrawing = ({ nativeEvent }) => {
    if (!drawMode) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  
  
  return (
    <div className="container">
   
      <div className="sidebar">
        {createBoardMessage && <p>Create a board first.</p>}
        <button className="button" onClick={handleImageUpload}>
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </button>

        <button className="button" onClick={handleTextUpload}>
          Upload Text
        </button>
        <button className="button" onClick={handleCreateBoard}>
          Create Board
        </button>
        <button className="button" onClick={() => handleDeleteBoard(currentBoard)}>
          Delete Board
        </button>

        <button className="button" onClick={handleToggleDraw}>
        {drawMode ? 'Stop Drawing' : 'Start Drawing'}
      </button>

        <div className="dropdown">
          <label>Board</label>
          <select value={currentBoard} onChange={(e) => handleSwitchBoard(e.target.value)}>
            <option value="">Select Board</option>
            {boards.map((board, index) => (
              <option key={index} value={board}>
                {board}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="board">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
      />
        {images.map((image) => (
          <Draggable
            key={image.id}
            onStop={(e, data) => handleDragStop(e, data, image)}
            defaultPosition={image.position}
          >
          
              <div className="resizable-image">
                <img src={image.src} alt="Uploaded" className="draggable-image" />
                <button className="cancel-button" onClick={() => handleCancelImage(image.id)}>
                  X
                </button>
              </div>
           
          </Draggable>
        ))}

        {textBoxes.map((textBox) => (
          <Draggable key={textBox.id}>
            <div className="text-box-container" style={{ position: 'absolute' }}>
              <textarea
                value={textBox.content}
                onChange={(e) => handleTextBoxChange(textBox.id, e)}
                placeholder="Enter text"
                rows={textBox.content.split('\n').length || 1}
                style={{ width: `${Math.max(200, textBox.content.length * 8)}px`, resize: 'none' }}
              ></textarea>
              <button className="cancel-button" onClick={() => handleTextBoxClose(textBox.id)}>
                X
              </button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default MoodBoardd;