const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Add your routes and email sending logic here

app.use(express.static(path.join(__dirname, 'build')));

// Serve the index.html for all routes not handled by other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});



app.get('/login', (req, res) => {
    res.send('This is the login page.');
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 3000,
  ignoreTLS: true,
});

const sendPasswordResetEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: 'your_email@example.com',
      to: email,
      subject: 'Password Reset',
      text: 'Here is your password reset link.',
    });
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
};

// Usage: sendPasswordResetEmail('user@example.com');
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;
    // Perform validation on the email address
  
    sendPasswordResetEmail(email);
  
    res.sendStatus(200);
  });
  
