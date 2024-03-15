const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

const PORT = process.env.PORT || 3003;

app.use(cors());
// Array to store the usernames of users to whom messages will be broadcasted
let allowedUsernames = [];
let id = '';

io.on('connection', (socket) => {
  console.log('A user connected');

 // Server side
socket.on('toggleVisibility', (data) => {
  const { projectID } = data;
  console.log('Received Project ID:', projectID);
  id = projectID;
});

// In the section where you retrieve usernames
socket.on('usernames', (usernames) => {
  console.log('Received usernames:', usernames);
  allowedUsernames = usernames;

  // Emit 'usernames' event back to the socket that requested it
  socket.emit('usernames', usernames);
});

  

  socket.on('message', (message) => {
    console.log('Received message:', message);
    // Check if the sender's username is in the allowedUsernames array
    console.log('message.userame: ', message.username);

    if (allowedUsernames.includes(message.username)) {
     
      const messageWithProjectID = {
        ...message,
        projectID:  id,
      };
  
      // Emit the message with projectID included
      io.emit('message', messageWithProjectID);
   
    }
  });


  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
