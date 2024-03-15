const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();
router.use(cors());

// API endpoint to handle incoming messages from the user
router.post('/', async (req, res) => {
  const { email, message, receiver, sender, password } = req.body;
  console.log(email, message);

  // Check if email and message are provided
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  // Nodemailer transporter setup using values from request body
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sender,  // Use the email from request body
      pass: password,  // You might want to handle the password securely
    },
  });

  // Nodemailer options for sending the email
  const mailOptions = {
    from: email,
    to: receiver,
    subject: 'New Chat Message',
    text: message,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;




// Nodemailer transporter setup (replace with your email configuration)
/*const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sarahnasir555@gmail.com',
    pass: 'lych ntvp ucph orqf',
  },
});*/

// Store messages in-memory (replace this with a database in a production scenario)


// IMAP configuration for fetching emails
/*const imapConfig = {
  user: 'sarahnasir450@gmail.com', // Replace with your Gmail email
  password: 'pkni nepo qlgl xfqr', // Replace with your Gmail password
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
};*/