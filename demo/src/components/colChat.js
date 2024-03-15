import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    // Fetch username from local storage or use a default
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const defaultUsername = prompt('Enter your username:');
      setUsername(defaultUsername);
      localStorage.setItem('username', defaultUsername);
    }

    // Connect to the server
    const newSocket = io('http://localhost:3003');
    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('message', { username, text: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
