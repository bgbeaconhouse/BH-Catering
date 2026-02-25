require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { getBusinessEmailTemplate, getCustomerEmailTemplate } = require('./email-templates');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Email configuration using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'beaconhousecatering@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// API Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Catering Request Form Submission
app.post('/api/catering-request', async (req, res) => {
  try {
    const {
      name,
      organization,
      email,
      phone,
      'event-date': eventDate,
      'event-time': eventTime,
      guests,
      'catering-type': cateringType,
      'event-location': eventLocation,
      message
    } = req.body;

    // Format the catering type for display
    const cateringTypeDisplay = cateringType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Email to business (notification of new request)
 const businessEmailOptions = {
  from: 'beaconhousecatering@gmail.com',
  to: 'beaconhousecatering@gmail.com',
  subject: `New Catering Request from ${name}`,
  html: getBusinessEmailTemplate(req.body),
  replyTo: email
};

    // Confirmation email to customer
 const customerEmailOptions = {
  from: 'beaconhousecatering@gmail.com',
  to: email,
  subject: 'Thank You for Your Catering Request - Beacon House Catering',
  html: getCustomerEmailTemplate(req.body),
  replyTo: 'beaconhousecatering@gmail.com'
};

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessEmailOptions),
      transporter.sendMail(customerEmailOptions)
    ]);

    res.json({ success: true, message: 'Catering request submitted successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit catering request. Please try again or contact us directly.' 
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Also accessible at http://192.168.1.183:${PORT}`);
});