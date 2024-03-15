const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');
const cors = require('cors');

const app = express();
const port = 5000;

const projectId = 'interiorx-392114'; // Replace with your Dialogflow project ID
const sessionId = '12349'; // Replace with any string you prefer, used to track the session

// Set the environment variable for the credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = './chatbot/interiorx-392114-02eba940fdd8.json';

// Create a new session client
const sessionClient = new SessionsClient();

// Create a new session path
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON in request bodies
app.use(express.json());

// API endpoint to initialize the chatbot
app.get('/api/init', async (req, res) => {
  try {
    // Perform any necessary initialization here
    res.json({ messages: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to send a user message to Dialogflow
app.post('/api/sendMessage', async (req, res) => {
  try {
    const { text } = req.body;

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: 'en-US', // Replace with your preferred language code
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.json(result.fulfillmentText);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
