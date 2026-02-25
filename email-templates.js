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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #121c4e;">

   <!-- Header / Logo -->
  <div style="text-align:center; padding: 10px 20px 0 20px;">
    <img src="https://raw.githubusercontent.com/bgbeaconhouse/BH-Catering/refs/heads/main/public/images/catering%20services%20%20(2).png"
         alt="Beacon House Catering Logo"
         width="200"
         style="display:block; width:200px; max-width:100%; height:auto; margin: 0 auto;">
  </div>

  <!-- Body -->
  <div style="padding: 15px 30px 30px 30px;">
        <p style="color: #ffffff; font-size: 16px; line-height: 1.6;">
          You have received a new catering request. Details are below.
        </p>

        <!-- Request Details Box -->
        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #00a0e0; margin-top: 0;">Request Details:</h3>
          <p style="color: #ffffff; line-height: 1.8; margin: 5px 0;">
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
            <p style="color: #ffffff; line-height: 1.8; margin-top: 15px;">
              <strong>Message:</strong><br>
              ${message.replace(/\n/g, '<br>')}
            </p>
          ` : ''}
        </div>

        <!-- Info Block -->
        <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.1); border-left: 4px solid #00a0e0; border-radius: 4px; line-height: 1.8;">
          <p style="color: #ffffff; margin: 0;">
            Please reply to this email or reach out to <strong>${name}</strong> directly at <strong>${email}</strong>${phone ? ` or <strong>${phone}</strong>` : ''} to follow up on their request.
          </p>
        </div>

        <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-top: 30px;">
          — Beacon House Catering Website
        </p>
      </div>

      <!-- Footer -->
      <div style="padding: 20px; background: rgba(0,0,0,0.3); text-align: center; color: rgba(255,255,255,0.5); font-size: 12px;">
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #121c4e;">

   <!-- Header / Logo -->
  <div style="text-align:center; padding: 10px 20px 0 20px;">
    <img src="https://raw.githubusercontent.com/bgbeaconhouse/BH-Catering/refs/heads/main/public/images/catering%20services%20%20(2).png"
         alt="Beacon House Catering Logo"
         width="200"
         style="display:block; width:200px; max-width:100%; height:auto; margin: 0 auto;">
  </div>

  <!-- Body -->
  <div style="padding: 15px 30px 30px 30px;">
        <p style="color: #ffffff; font-size: 16px; line-height: 1.6;">
          Dear ${name},
        </p>

        <p style="color: #ffffff; font-size: 16px; line-height: 1.6;">
          Thank you for reaching out to Beacon House Catering! We've received your request and will be in touch shortly to discuss the details and provide a customized quote.
        </p>

        <!-- Request Summary Box -->
        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #00a0e0; margin-top: 0;">Your Request Summary:</h3>
          <p style="color: #ffffff; line-height: 1.8; margin: 5px 0;">
            <strong>Event Date:</strong> ${eventDate || 'N/A'}<br>
            ${eventTime ? `<strong>Event Time:</strong> ${eventTime}<br>` : ''}
            <strong>Number of Guests:</strong> ${guests || 'N/A'}<br>
            <strong>Catering Type:</strong> ${cateringTypeDisplay}<br>
            ${eventLocation ? `<strong>Event Location:</strong> ${eventLocation}<br>` : ''}
            ${organization ? `<strong>Organization:</strong> ${organization}<br>` : ''}
          </p>
          ${message ? `
            <p style="color: #ffffff; line-height: 1.8; margin-top: 15px;">
              <strong>Your Message:</strong><br>
              ${message.replace(/\n/g, '<br>')}
            </p>
          ` : ''}
        </div>

        <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.6; margin-top: 30px;">
          If you have any questions in the meantime, feel free to reply to this email or contact us directly at <strong style="color: #ffffff;">beaconhousecatering@gmail.com</strong>.
        </p>

        <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-top: 30px;">
          Thank you,<br>
          <strong>Beacon House Catering Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="padding: 20px; background: rgba(0,0,0,0.3); text-align: center; color: rgba(255,255,255,0.5); font-size: 12px;">
        <p style="margin: 0;">Beacon House Culinary</p>
        <p style="margin: 5px 0;">A social enterprise of The Beacon House Association of San Pedro</p>
        <p style="margin: 5px 0;">beaconhousecatering@gmail.com</p>
      </div>
    </div>
  `;
}

module.exports = { getBusinessEmailTemplate, getCustomerEmailTemplate };