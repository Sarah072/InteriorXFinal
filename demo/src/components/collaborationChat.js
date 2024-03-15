
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './collaborationChat.css';
import bot from './images/professional.png';

const ChatbotPro = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatVisible, setChatVisible] = useState(false); // Track the visibility of the chat
  const [usernames, setUsernames] = useState([]);

  const [socket, setSocket] = useState(null);

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
        const storedProjectID = localStorage.getItem('projectID');
        console.log(storedProjectID,message.projectID === storedProjectID,message.projectID,)
        if (message.projectID === storedProjectID) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
    }
  }, [socket]);
  

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      socket.emit('message', { username, text: inputText });
      setInputText('');
    }
  };

  const toggleChatVisibility = async() => {
    setChatVisible(!chatVisible);
    const projectID = localStorage.getItem('projectID');
    const response = await axios.post('http://localhost:3000/UserRolesPage/get', { projectID: projectID });
    setUsernames(response.data);

   
  if (socket) {
    // Emit 'usernames' event with response.data
    socket.emit('usernames', response.data);

    // Emit 'toggleVisibility' event along with the projectID
    socket.emit('toggleVisibility', { projectID: projectID });
  }

  const variable = localStorage.getItem('projectID');
  if(variable != null){
    const myName = localStorage.getItem('username');
  const response2 = await axios.post('http://localhost:3000/UserRolesPage/getProjectID', { name: myName });
  localStorage.setItem('projectID', response2.data); 
}
  
   // setChatVisible(!chatVisible);
  };

  return (
    <div className="chat-container2" style={{position: 'fixed', bottom: '0', right: '10%'}}>
     
      {chatVisible && (
        <div className="chatbot">
            <h2>🟢 Group Chat</h2>
          <div className="messages-container" style={{backgroundColor: '#add8e6', padding: '10px', marginTop: '10px'}}>
         
            {messages.map((message, index) => (
              <div key={index} >
                <strong>😊  {message.username}: </strong>
                {message.text}
              </div>
            ))}
          </div>
          <div className='input-containerChat'>
            <input
              style={{width: '70%'}}
              type="text"
              value={inputText}
              placeholder='Type your message...'
              onChange={(e) => setInputText(e.target.value)}
            />
            <button style={{marginLeft: '-5px'}} onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <div className="chat-icon" style={{position: 'fixed', bottom: '2%', right: '7%'}} onClick={toggleChatVisibility}>
        <img className="botImg" src={bot} alt="Chat" />
      </div>
    </div>
  );
  
};

export default ChatbotPro;
/*
import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './collaborationChat.css';
import bot from './images/professional.png';

class ChatbotPro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputText: '',
      chatVisible: false,
      usernames: [],
      socket: null,
      username: ''
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.toggleChatVisibility = this.toggleChatVisibility.bind(this);
  }

  componentDidMount() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.setState({ username: storedUsername });
    } else {
      const defaultUsername = prompt('Enter your username:');
      this.setState({ username: defaultUsername });
      localStorage.setItem('username', defaultUsername);
    }

    const newSocket = io('http://localhost:3003');
    this.setState({ socket: newSocket });

    newSocket.on('message', message => {
      const storedProjectID = localStorage.getItem('projectID');
      if (message.projectID === storedProjectID) {
        this.setState(prevState => ({
          messages: [...prevState.messages, message]
        }));
      }
    });
  }

  sendMessage() {
    const { inputText, socket, username } = this.state;
    if (inputText.trim() !== '' && socket) {
      socket.emit('message', { username, text: inputText });
      this.setState({ inputText: '' });
    }
  }

  async toggleChatVisibility() {
    const projectID = localStorage.getItem('projectID');
    const response = await axios.post('http://localhost:3000/UserRolesPage/get', {
      projectID: projectID
    });
    this.setState({ usernames: response.data });

    const { socket } = this.state;
    if (socket) {
      socket.emit('usernames', response.data);
      socket.emit('toggleVisibility', { projectID: projectID });
    }

    const variable = localStorage.getItem('projectID');
    if (variable !== null) {
      const myName = localStorage.getItem('username');
      const response2 = await axios.post('http://localhost:3000/UserRolesPage/getProjectID', {
        name: myName
      });
      localStorage.setItem('projectID', response2.data);
    }

    this.setState(prevState => ({ chatVisible: !prevState.chatVisible }));
  }

  render() {
    const { messages, inputText, chatVisible } = this.state;

    return (
      <div className="chat-container2">
        {chatVisible && (
          <div className="chatbot">
            <h2>🟢 Group Chat</h2>
            <div className="messages-container" style={{ backgroundColor: '#add8e6', padding: '10px', marginTop: '10px' }}>
              {messages.map((message, index) => (
                <div key={index}>
                  <strong>😊 {message.username}: </strong>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="input-container">
              <input
                style={{ width: '30% !important' }}
                type="text"
                value={inputText}
                placeholder="Type your message..."
                onChange={e => this.setState({ inputText: e.target.value })}
              />
              <button style={{ marginLeft: '-5px' }} onClick={this.sendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
        <div className="chat-icon" onClick={this.toggleChatVisibility}>
          <img className="botImg" src={bot} alt="Chat" />
        </div>
      </div>
    );
  }
}

export default ChatbotPro;
*/




