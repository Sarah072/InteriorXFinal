// ClientComponent.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './chat.css';

function ClientComponent() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [sender, setSender] = useState('');
  const [found, setFound ] = useState(false);

  useEffect(() => {
    const savedSender = localStorage.getItem('username');
    if (savedSender) {
      setSender(savedSender);
    } else {
      const username = prompt('Please enter your username:');
      if (username) {
        setSender(username);
        localStorage.setItem('username', username);
      }
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      console.log('Message received:', event.data);
      const newMessage = JSON.parse(event.data);
      const username = localStorage.getItem('username');
      console.log(newMessage.receiver == username, newMessage.receiver, username);
      if(newMessage.receiver == username){
      setMessages([...messages, newMessage]);
      }
    };

    return () => {
      socket.close();
    };
  }, [messages]);

  const sendMessage = async () => {
 
    const url = `http://localhost:3000/proChat?username=${receiver}`;
  
    try {
      const response = await axios.post(url);
      const found = response.data.found;
      setFound(found);
    
  
      if (found) {
        console.log('User found');
        if (message.trim() && receiver.trim()) {
          const newMessage = {
            sender: sender,
            receiver: receiver,
            message: message
          };
          setMessages([...messages, newMessage]);
          setMessage('');
    
          const socket = new WebSocket('ws://localhost:8080');
          socket.onopen = () => {
            console.log('Connected to server');
            socket.send(JSON.stringify(newMessage));
          
          };
    
        }
      } else {
        alert(`No user with username ${receiver} is found.`);
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error sending message:', error); 
    }
  };

  return (
    <div className='ParentChatCover'>
    <div className="chat-container2">
      <h2>Chat With Us</h2>
      {found && (
        <h4 style={{marginTop: '-20px'}}>Currently chatting with {receiver}</h4>
      )}
     
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message-item">
            <strong>{msg.sender}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <div>
        <div className='chatBlock'>
          
        <input
          type="text"
          placeholder="Receiver's Username"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        </div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </div>
  );
}

export default ClientComponent;
