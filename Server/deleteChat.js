const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

const wss = new WebSocket.Server({ server });

// Store connected clients
const connectedClients = new Map();

// Listen for WebSocket connections
wss.on('connection', (ws) => {
  // Add the new client to the map using a unique identifier (e.g., username)
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.username) {
        addConnectedClient(parsedMessage.username.toLowerCase(), ws);
      }
      console.log('Received Message:', parsedMessage);
      // Check if the message includes a target username
       // Check if the message includes a target username
       const targetUsername = parsedMessage.target && parsedMessage.target.toLowerCase();
       if (targetUsername && connectedClients.has(targetUsername)) {
         // Send the message only to the targeted user
         connectedClients.get(targetUsername).send(JSON.stringify(parsedMessage));
       } else {
         // Log the connected clients for debugging
         console.log('Connected Clients:', connectedClients);
        // Handle the case where the target user is not found
        console.error('Target user not found:', parsedMessage.target);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
  
  ws.on('close', () => {
    // Remove the client from the map when it closes
    removeDisconnectedClient(ws);

    // Log the connected clients after removal for debugging
    console.log('Connected Clients after removal:', connectedClients);
  });
});

// Function to add a connected client to the map
// Function to add a connected client to the map
function addConnectedClient(username, ws) {
  connectedClients.set(username.toLowerCase(), ws);
}


// Function to remove a disconnected client from the map
function removeDisconnectedClient(ws) {
  connectedClients.forEach((client, key) => {
    if (client === ws) {
      connectedClients.delete(key);
    }
  });
}

// Start the HTTP server on port 3001
server.listen(3002, () => {
  console.log('WebSocket server is listening on port 3002');
});
