// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
 
    try {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.receiver) {
        wss.clients.forEach(function each(client) {
          console.log(parsedMessage.sender !== parsedMessage.receiver);
          if (client.readyState === WebSocket.OPEN && parsedMessage.sender !== parsedMessage.receiver) {
            client.send(JSON.stringify(parsedMessage)); 
          }
        });
      }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
    
    
  });
});
