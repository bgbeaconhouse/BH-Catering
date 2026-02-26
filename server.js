require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { getBusinessEmailTemplate, getCustomerEmailTemplate } = require('./email-templates');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Gmail transporter - for business notification email
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

// Microsoft 365 transporter - for customer confirmation email
const microsoftTransporter = nodemailer.createTransport({
  host: 'outbound-us1.ppe-hosted.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
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

    // Email to business (sent from Gmail)
    const businessEmailOptions = {
      from: process.env.GMAIL_USER,
      to: 'catering@thebeaconhouse.org',
      subject: `New Catering Request from ${name}`,
      html: getBusinessEmailTemplate(req.body),
      replyTo: email
    };

    // Confirmation email to customer (sent from Microsoft 365)
    const customerEmailOptions = {
      from: 'catering@thebeaconhouse.org',
      to: email,
      subject: 'Thank You for Your Catering Request - Beacon House Catering',
      html: getCustomerEmailTemplate(req.body),
      replyTo: 'catering@thebeaconhouse.org'
    };

    // Send business email via Gmail
    console.log('Sending business email...');
    await gmailTransporter.sendMail(businessEmailOptions);
    console.log('Business email sent successfully');

    // Send customer email via Microsoft 365
    console.log('Sending customer email...');
    await microsoftTransporter.sendMail(customerEmailOptions);
    console.log('Customer email sent successfully');

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
  console.log(`Server running on port ${PORT}`);
});