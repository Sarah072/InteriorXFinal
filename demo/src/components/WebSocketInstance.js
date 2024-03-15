// WebSocketInstance.js
class WebSocketInstance {
    constructor() {
      this.socket = null;
      this.callbacks = {
        message: null,
        error: null,
        close: null,
      };
    }
      
    connect(receiver) {
        this.socket = new WebSocket(`ws://localhost:8080/?receiver=${encodeURIComponent(receiver)}`);
        this.socket.onopen = () => {
          console.log('Connected to server');
        // Send the receiver to the server when the connection is established
        this.sendMessage(receiver);
      };
      this.socket.onmessage = (event) => {
        const message = event.data;
        if (this.callbacks.message) {
          this.callbacks.message(message);
        }
      };
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (this.callbacks.error) {
          this.callbacks.error(error);
        }
      };
      this.socket.onclose = () => {
        console.log('Disconnected from server');
        if (this.callbacks.close) {
          this.callbacks.close();
        }
      };
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  
    addCallbacks(messageCallback, errorCallback, closeCallback) {
      this.callbacks.message = messageCallback;
      this.callbacks.error = errorCallback;
      this.callbacks.close = closeCallback;
    }
  
    sendMessage(message) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.error('WebSocket is not open. Cannot send message.');
      }
    }
  }
  
  const instance = new WebSocketInstance();
  export default instance;
  