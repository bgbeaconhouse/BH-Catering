// Catering Request Email Templates
// Replace the existing email HTML in server.js with these templates

function getBusinessEmailTemplate(data) {
  const {
    name, organization, email, phone,
    'event-date': eventDate,
    'event-time': eventTime,
    guests,
    'catering-type': cateringType,
    'event-location': eventLocation,
    message
  } = data;

  const cateringTypeDisplay = cateringType
    ? cateringType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'N/A';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="text-align:center; padding: 20px; background: #ffffff; color: #2d3748;">
        <!--[if !mso]><!-->
        <img src="https://raw.githubusercontent.com/bgbeaconhouse/BH-Catering/refs/heads/main/public/images/catering%20services%20%20(2).png"
             alt="Beacon House Catering Logo"
             width="200"
             style="display:block; width:200px; max-width:100%; height:auto; margin: 0 auto 10px;">
        <!--<![endif]-->
        <!--[if mso]>
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
        <h1 style="margin:0 0 5px 0;color:#2d3748;font-size:28px;font-family:Arial,sans-serif">Beacon House</h1>
        <p style="margin:0;color:#2d3748;font-size:18px;font-family:Arial,sans-serif">Catering Services</p>
        </td></tr></table>
        <![endif]-->
        <h2 style="margin: 10px 0 0; font-weight: 400; color: #2d3748;">New Catering Request</h2>
      </div>

      <!-- Body -->
      <div style="padding: 30px; background: white;">
        <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
          You have received a new catering request. Details are below.
        </p>

        <!-- Request Details Box -->
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d3748; margin-top: 0;">Request Details:</h3>
          <p style="color: #4a5568; line-height: 1.8; margin: 5px 0;">
            <strong>Name:</strong> ${name}<br>
            ${organization ? `<strong>Organization:</strong> ${organization}<br>` : ''}
            <strong>Email:</strong> ${email}<br>
            ${phone ? `<strong>Phone:</strong> ${phone}<br>` : ''}
            <strong>Event Date:</strong> ${eventDate || 'N/A'}<br>
            ${eventTime ? `<strong>Event Time:</strong> ${eventTime}<br>` : ''}
            <strong>Number of Guests:</strong> ${guests || 'N/A'}<br>
            <strong>Catering Type:</strong> ${cateringTypeDisplay}<br>
            ${eventLocation ? `<strong>Event Location:</strong> ${eventLocation}<br>` : ''}
          </p>
          ${message ? `
            <p style="color: #4a5568; line-height: 1.8; margin-top: 15px;">
              <strong>Message:</strong><br>
              ${message.replace(/\n/g, '<br>')}
            </p>
          ` : ''}
        </div>

        <!-- Info Block -->
        <div style="margin-top: 20px; padding: 20px; background: #f7fafc; border-left: 4px solid #00a0e0; line-height: 1.8; color: #2d3748;">
          <p style="margin: 0;">
            Please reply to this email or reach out to <strong>${name}</strong> directly at <strong>${email}</strong>${phone ? ` or <strong>${phone}</strong>` : ''} to follow up on their request.
          </p>
        </div>

        <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-top: 30px;">
          — Beacon House Catering Website
        </p>
      </div>

      <!-- Footer -->
      <div style="padding: 20px; background: #f7fafc; text-align: center; color: #718096; font-size: 12px;">
        <p style="margin: 0;">Beacon House Culinary</p>
        <p style="margin: 5px 0;">A social enterprise of The Beacon House Association of San Pedro</p>
        <p style="margin: 5px 0;">beaconhousecatering@gmail.com</p>
      </div>
    </div>
  `;
}

function getCustomerEmailTemplate(data) {
  const {
    name, organization, email, phone,
    'event-date': eventDate,
    'event-time': eventTime,
    guests,
    'catering-type': cateringType,
    'event-location': eventLocation,
    message
  } = data;

  const cateringTypeDisplay = cateringType
    ? cateringType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'N/A';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="text-align:center; padding: 20px; background: #ffffff; color: #2d3748;">
        <!--[if !mso]><!-->
        <img src="https://raw.githubusercontent.com/bgbeaconhouse/BH-Catering/refs/heads/main/public/images/catering%20services%20%20(2).png"
             alt="Beacon House Catering Logo"
             width="200"
             style="display:block; width:200px; max-width:100%; height:auto; margin: 0 auto 10px;">
        <!--<![endif]-->
        <!--[if mso]>
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
        <h1 style="margin:0 0 5px 0;color:#2d3748;font-size:28px;font-family:Arial,sans-serif">Beacon House</h1>
        <p style="margin:0;color:#2d3748;font-size:18px;font-family:Arial,sans-serif">Catering Services</p>
        </td></tr></table>
        <![endif]-->
        <h2 style="margin: 10px 0 0; font-weight: 400; color: #2d3748;">Catering Request Received</h2>
      </div>

      <!-- Body -->
      <div style="padding: 30px; background: white;">
        <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
          Dear ${name},
        </p>

        <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
          Thank you for reaching out to Beacon House Catering! We've received your request and will be in touch shortly to discuss the details and provide a customized quote.
        </p>

        <!-- Request Summary Box -->
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d3748; margin-top: 0;">Your Request Summary:</h3>
          <p style="color: #4a5568; line-height: 1.8; margin: 5px 0;">
            <strong>Event Date:</strong> ${eventDate || 'N/A'}<br>
            ${eventTime ? `<strong>Event Time:</strong> ${eventTime}<br>` : ''}
            <strong>Number of Guests:</strong> ${guests || 'N/A'}<br>
            <strong>Catering Type:</strong> ${cateringTypeDisplay}<br>
            ${eventLocation ? `<strong>Event Location:</strong> ${eventLocation}<br>` : ''}
            ${organization ? `<strong>Organization:</strong> ${organization}<br>` : ''}
          </p>
          ${message ? `
            <p style="color: #4a5568; line-height: 1.8; margin-top: 15px;">
              <strong>Your Message:</strong><br>
              ${message.replace(/\n/g, '<br>')}
            </p>
          ` : ''}
        </div>

        <!-- Mission Info Block -->
        <div style="margin-top: 20px; padding: 20px; background: #f7fafc; border-left: 4px solid #00a0e0; line-height: 1.8; color: #2d3748;">
          <p style="margin: 0 0 10px 0;">
            By choosing Beacon House Catering, you're supporting more than just great food — you're helping fund long-term recovery programs and workforce development for men rebuilding their lives.
          </p>
          <p style="margin: 0;">
            We never deny treatment due to lack of funds, and your support makes that possible. Thank you.
          </p>
        </div>

        <p style="color: #4a5568; font-size: 14px; line-height: 1.6; margin-top: 30px;">
          If you have any questions in the meantime, feel free to reply to this email or contact us directly at <strong>beaconhousecatering@gmail.com</strong>.
        </p>

        <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-top: 30px;">
          Thank you,<br>
          <strong>Beacon House Catering Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="padding: 20px; background: #f7fafc; text-align: center; color: #718096; font-size: 12px;">
        <p style="margin: 0;">Beacon House Culinary</p>
        <p style="margin: 5px 0;">A social enterprise of The Beacon House Association of San Pedro</p>
        <p style="margin: 5px 0;">beaconhousecatering@gmail.com</p>
      </div>
    </div>
  `;
}

module.exports = { getBusinessEmailTemplate, getCustomerEmailTemplate };