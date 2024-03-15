import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');

  const socket = new WebSocket('ws://localhost:3002'); // Replace with your WebSocket server URL

  useEffect(() => {
    // WebSocket connection opened
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
        console.log('Raw Message:', event.data);
        try {
          const newMessage = JSON.parse(event.data);
          console.log('Received Message:', newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
      
      

    // Cleanup function
    return () => {
      socket.close(); // Close WebSocket connection on component unmount
    };
  }, []);

  const sendMessage = () => {
    const messageObject = {
      username,
      target: 'sana'.toLowerCase(), // Ensure it's lowercase
      message: inputMessage,
    };
  
    // Send the message to the server
    socket.send(JSON.stringify(messageObject));
  
    // Clear the input field
    setInputMessage('');
  };
  

  return (
    <div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', marginBottom: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          ))}
        </div>

        <div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
