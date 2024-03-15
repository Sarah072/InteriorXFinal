const WebSocket = require('ws');
const http = require('http');
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
const clients = new Set();

// Listen for WebSocket connections
wss.on('connection', (ws) => {
  // Add the new client to the set
  clients.add(ws);

  // Listen for messages from clients
  ws.on('message', (message) => {
    // Broadcast the message to all connected clients
    broadcast(message, ws);
  });

  // Listen for the WebSocket connection to close
  ws.on('close', () => {
    // Remove the client from the set when it closes
    clients.delete(ws);
  });
});

// Function to broadcast a message to all clients except the sender
function broadcast(message, sender) {
  clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Start the HTTP server on port 3001
server.listen(3002, () => {
  console.log('WebSocket server is listening on port 3002');
});
