// Catering Request Email Templates
// Table-based layout with solid colors for Outlook compatibility

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
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#121c4e;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#121c4e;">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#121c4e; font-family: Arial, sans-serif;">

        <!-- Logo -->
        <tr>
          <td align="center" style="padding: 20px 30px 10px 30px;">
            <img src="https://raw.githubusercontent.com/bgbeaconhouse/BH-Catering/refs/heads/main/public/images/catering%20services%20%20(2).png"
                 alt="Beacon House Catering Logo"
                 width="200"
                 style="display:block; width:200px; height:auto;">
          </td>
        </tr>

        <!-- Intro Text -->
        <tr>
          <td style="padding: 10px 30px 0 30px;">
            <p style="color:#ffffff; font-size:16px; line-height:1.6; margin:0;">
              You have received a new catering request. Details are below.
            </p>
          </td>
        </tr>

        <!-- Request Details Box -->
        <tr>
          <td style="padding: 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1e2d6e; border-radius:8px;">
              <tr>
                <td style="padding: 20px;">
                  <p style="color:#00a0e0; font-size:18px; font-weight:bold; margin:0 0 15px 0;">Request Details:</p>
                  <table width="100%" cellpadding="4" cellspacing="0" border="0">
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; width:40%; vertical-align:top;">Name:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${name}</td>
                    </tr>
                    ${organization ? `<tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Organization:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${organization}</td>
                    </tr>` : ''}
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Email:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${email}</td>
                    </tr>
                    ${phone ? `<tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Phone:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${phone}</td>
                    </tr>` : ''}
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Event Date:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${eventDate || 'N/A'}</td>
                    </tr>
                    ${eventTime ? `<tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Event Time:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${eventTime}</td>
                    </tr>` : ''}
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Guests:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${guests || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Catering Type:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${cateringTypeDisplay}</td>
                    </tr>
                    ${eventLocation ? `<tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Event Location:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${eventLocation}</td>
                    </tr>` : ''}
                    ${message ? `<tr>
                      <td colspan="2" style="color:#ffffff; font-size:15px; padding-top:12px; vertical-align:top;">
                        <strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}
                      </td>
                    </tr>` : ''}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Info Block -->
        <tr>
          <td style="padding: 0 30px 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1e2d6e; border-left:4px solid #00a0e0; border-radius:4px;">
              <tr>
                <td style="padding: 20px;">
                  <p style="color:#ffffff; font-size:15px; line-height:1.8; margin:0;">
                    Please reply to this email or reach out to <strong>${name}</strong> directly at <strong>${email}</strong>${phone ? ` or <strong>${phone}</strong>` : ''} to follow up on their request.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Sign-off -->
        <tr>
          <td style="padding: 0 30px 20px 30px;">
            <p style="color:#aaaaaa; font-size:14px; line-height:1.6; margin:0;">— Beacon House Catering Website</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding: 20px 30px; background-color:#0d1538;">
            <p style="color:#aaaaaa; font-size:12px; margin:0;">Beacon House Culinary</p>
            <p style="color:#aaaaaa; font-size:12px; margin:5px 0;">A social enterprise of The Beacon House Association of San Pedro</p>
            <p style="color:#aaaaaa; font-size:12px; margin:5px 0;">beaconhousecatering@gmail.com</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
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
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#121c4e;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#121c4e;">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#121c4e; font-family: Arial, sans-serif;">

        <!-- Logo -->
        <tr>
          <td align="center" style="padding: 20px 30px 10px 30px;">
            <img src="https://raw.githubusercontent.com/bgbeaconhouse/BH-Catering/refs/heads/main/public/images/catering%20services%20%20(2).png"
                 alt="Beacon House Catering Logo"
                 width="200"
                 style="display:block; width:200px; height:auto;">
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding: 10px 30px 0 30px;">
            <p style="color:#ffffff; font-size:16px; line-height:1.6; margin:0 0 15px 0;">Dear ${name},</p>
            <p style="color:#ffffff; font-size:16px; line-height:1.6; margin:0;">
              Thank you for reaching out to Beacon House Catering! We've received your request and will be in touch shortly to discuss the details and provide a customized quote.
            </p>
          </td>
        </tr>

        <!-- Request Summary Box -->
        <tr>
          <td style="padding: 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1e2d6e; border-radius:8px;">
              <tr>
                <td style="padding: 20px;">
                  <p style="color:#00a0e0; font-size:18px; font-weight:bold; margin:0 0 15px 0;">Your Request Summary:</p>
                  <table width="100%" cellpadding="4" cellspacing="0" border="0">
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; width:40%; vertical-align:top;">Event Date:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${eventDate || 'N/A'}</td>
                    </tr>
                    ${eventTime ? `<tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Event Time:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${eventTime}</td>
                    </tr>` : ''}
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Number of Guests:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${guests || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Catering Type:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${cateringTypeDisplay}</td>
                    </tr>
                    ${eventLocation ? `<tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Event Location:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${eventLocation}</td>
                    </tr>` : ''}
                    ${organization ? `<tr>
                      <td style="color:#ffffff; font-size:15px; font-weight:bold; vertical-align:top;">Organization:</td>
                      <td style="color:#ffffff; font-size:15px; vertical-align:top;">${organization}</td>
                    </tr>` : ''}
                    ${message ? `<tr>
                      <td colspan="2" style="color:#ffffff; font-size:15px; padding-top:12px; vertical-align:top;">
                        <strong>Your Message:</strong><br>${message.replace(/\n/g, '<br>')}
                      </td>
                    </tr>` : ''}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contact note -->
        <tr>
          <td style="padding: 0 30px 20px 30px;">
            <p style="color:#cccccc; font-size:14px; line-height:1.6; margin:0;">
              If you have any questions in the meantime, feel free to reply to this email or contact us directly at
              <strong style="color:#ffffff;">beaconhousecatering@gmail.com</strong>.
            </p>
          </td>
        </tr>

        <!-- Sign-off -->
        <tr>
          <td style="padding: 0 30px 20px 30px;">
            <p style="color:#ffffff; font-size:16px; line-height:1.6; margin:0;">
              Thank you,<br>
              <strong>Beacon House Catering Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding: 20px 30px; background-color:#0d1538;">
            <p style="color:#aaaaaa; font-size:12px; margin:0;">Beacon House Culinary</p>
            <p style="color:#aaaaaa; font-size:12px; margin:5px 0;">A social enterprise of The Beacon House Association of San Pedro</p>
            <p style="color:#aaaaaa; font-size:12px; margin:5px 0;">beaconhousecatering@gmail.com</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
  `;
}

module.exports = { getBusinessEmailTemplate, getCustomerEmailTemplate };