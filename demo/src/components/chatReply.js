import React, { useState, useEffect } from 'react';
import './chat.css';
import WebSocketInstance from './WebSocketInstance'; // WebSocketInstance is a helper class to manage WebSocket connection

const ChatReply = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    WebSocketInstance.connect(username);
    WebSocketInstance.addCallbacks(
      (message) => {
        // Update messages using the callback form of setMessages
        setMessages(prevMessages => [...prevMessages, message]);
      },
      () => console.error('Error in connection'),
      () => console.log('Disconnected from server')
    );
  
    return () => {
      WebSocketInstance.disconnect();
    };
  }, [username]);
  
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    WebSocketInstance.sendMessage(message);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className='message-item'>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='chatFlex'>
          <div>
            <input
              type="text"
              value={message}
              onChange={handleChange}
              placeholder="Type your message..."
            />
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatReply;
