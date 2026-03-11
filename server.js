require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const { getBusinessEmailTemplate, getCustomerEmailTemplate } = require('./email-templates');

const app = express();
const PORT = process.env.PORT || 3000;

// Required for Render (proxy) - must be set before rate limiter
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', { extensions: ['html'] }));

// Rate limiter: 5 submissions per 15 minutes per IP
const cateringLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many requests. Please wait a few minutes and try again.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

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

// Input validation helper
function validateCateringRequest(body) {
  const errors = [];

  const allowedCateringTypes = ['buffet', 'table-service', 'boxed-meals', 'private-event', 'custom'];

  // Strip HTML tags from a string
  const sanitize = (str) => (typeof str === 'string' ? str.replace(/<[^>]*>/g, '').trim() : '');

  // Required fields
  if (!sanitize(body.name)) errors.push('Name is required');
  if (!sanitize(body.email)) errors.push('Email is required');
  if (!sanitize(body.phone)) errors.push('Phone is required');
  if (!sanitize(body['event-date'])) errors.push('Event date is required');
  if (!sanitize(body['event-time'])) errors.push('Event time is required');
  if (!sanitize(body.guests)) errors.push('Number of guests is required');
  if (!sanitize(body['event-location'])) errors.push('Event location is required');

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (body.email && !emailRegex.test(sanitize(body.email))) {
    errors.push('Invalid email address');
  }

  // Catering type must be one of the allowed values
  if (!body['catering-type'] || !allowedCateringTypes.includes(body['catering-type'])) {
    errors.push('Invalid catering type');
  }

  // Field length limits
  if (sanitize(body.name).length > 100) errors.push('Name is too long');
  if (sanitize(body.email).length > 200) errors.push('Email is too long');
  if (sanitize(body.message).length > 2000) errors.push('Message is too long (max 2000 characters)');

  return errors;
}

// API Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Catering Request Form Submission
app.post('/api/catering-request', cateringLimiter, async (req, res) => {
  // Validate inputs
  const validationErrors = validateCateringRequest(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: validationErrors[0]
    });
  }

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