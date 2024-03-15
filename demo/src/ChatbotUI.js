import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatbot.css';
import bot from './botIcon.jpg'

const ChatbotUI = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatVisible, setChatVisible] = useState(false); // Track the visibility of the chat

  useEffect(() => {
    const initializeChatbot = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/init'); // Use the correct server URL
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    initializeChatbot();
  }, []);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5000/api/sendMessage', { text: inputText }); // Use the correct server URL
        setMessages([
          ...messages,
          { sender: 'User', text: inputText },
          { sender: 'Bot', text: response.data },
        ]);
        setInputText('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleChatVisibility = () => {
    setChatVisible(!chatVisible);
  };

  return (
    
    <div className="chat-container">
      {chatVisible && (
        <div className='chatbot'>
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <span>{message.sender}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <form className="input-containerBot" onSubmit={handleSubmit}>
            <input
              style={{width: '70% !important'}}
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button type="submit">Senddd</button>
          </form>
        </div>
      )}
      <div className="chat-icon" onClick={toggleChatVisibility}>
        <img className="botImg" src={bot} alt="Chat" />
      </div>
    </div>
  );
}

export default ChatbotUI;
