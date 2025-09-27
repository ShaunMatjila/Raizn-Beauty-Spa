import nodemailer from "nodemailer";

// Create transporter for Brevo (Sendinblue)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Unified formal invoice-style template generator
const generateInvoiceEmail = (booking, type) => {
  let title,
    subjectSuffix,
    statusText,
    statusColor,
    notes,
    showPaymentInstructions;

  switch (type) {
    case "confirmation":
      title = "BOOKING CONFIRMATION";
      subjectSuffix = "Booking Confirmation";
      statusText = "Confirmed";
      statusColor = "#27ae60";
      notes =
        "Thank you for your booking. Please arrive 10 minutes early. Cancellations within 24 hours may incur a fee.";
      showPaymentInstructions = true;
      break;

    case "reminder":
      title = "APPOINTMENT REMINDER";
      subjectSuffix = "Appointment Reminder";
      statusText = "Upcoming";
      statusColor = "#e67e22";
      notes =
        "This is a reminder of your appointment tomorrow. Please arrive 10–15 minutes early.";
      showPaymentInstructions = false;
      break;

    case "admin":
      title = "NEW BOOKING NOTIFICATION";
      subjectSuffix = "New Booking (Admin)";
      statusText = "Pending Confirmation";
      statusColor = "#3498db";
      notes = "Please review and confirm this booking in the system.";
      showPaymentInstructions = false;
      break;
  }

  return {
    subject: `Invoice #${booking.invoiceNumber || booking.id} - ${booking.service} ${subjectSuffix}`,
    html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 20px; color: #333; background-color: #f9f9f9;">
      
      <!-- Company Header -->
      <table style="width: 100%; border-bottom: 2px solid #2c3e50; padding-bottom: 10px; margin-bottom: 20px;">
        <tr>
          <td style="width: 60%;">
            <h1 style="margin: 0; font-size: 22px; font-weight: bold; color: #2c3e50;">
              ${process.env.COMPANY_NAME || "Your Business"}
            </h1>
            <p style="margin: 2px 0; font-size: 12px; color: #7f8c8d;">
              ${process.env.COMPANY_ADDRESS || "Business Address"}
            </p>
            <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
              ${process.env.COMPANY_PHONE || "Phone"} | ${
      process.env.COMPANY_EMAIL || "Email"
    }
            </p>
          </td>
          <td style="width: 40%; text-align: right; vertical-align: top;">
            <h2 style="margin: 0; font-size: 18px; color: #2c3e50;">${title}</h2>
            <p style="margin: 0; font-size: 12px; color: #7f8c8d;">${new Date().toLocaleDateString()}</p>
          </td>
        </tr>
      </table>

      <!-- Client & Invoice Details -->
      <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse; background: white; border: 1px solid #e0e0e0;">
        <tr>
          <td style="width: 50%; padding: 10px; vertical-align: top;">
            <h3 style="font-size: 14px; margin-bottom: 8px; color: #2c3e50;">${
              type === "admin" ? "Customer Details" : "Bill To"
            }</h3>
            <p style="margin: 4px 0; font-size: 13px;"><strong>${
              booking.customerName
            }</strong></p>
            <p style="margin: 4px 0; font-size: 13px;">${
              booking.customerEmail
            }</p>
            <p style="margin: 4px 0; font-size: 13px;">${
              booking.customerPhone
            }</p>
          </td>
          <td style="width: 50%; padding: 10px; vertical-align: top;">
            <h3 style="font-size: 14px; margin-bottom: 8px; color: #2c3e50;">Invoice Details</h3>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Invoice #:</strong> ${
              booking.invoiceNumber || booking.id
            }</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Status:</strong> <span style="color: ${statusColor};">${statusText}</span></p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </td>
        </tr>
      </table>

      <!-- Service Details -->
      <h3 style="font-size: 14px; color: #2c3e50; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Service Details</h3>
      <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #e0e0e0; margin-bottom: 20px;">
        <thead style="background-color: #2c3e50; color: white;">
          <tr>
            <th style="text-align: left; padding: 8px; font-size: 13px;">Service</th>
            <th style="text-align: left; padding: 8px; font-size: 13px;">Date</th>
            <th style="text-align: left; padding: 8px; font-size: 13px;">Time</th>
            <th style="text-align: right; padding: 8px; font-size: 13px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; font-size: 13px; border-top: 1px solid #e0e0e0;">
              <strong>${booking.service}</strong><br>
              <span style="color: #7f8c8d;">Duration: ${booking.duration}</span>
            </td>
            <td style="padding: 8px; font-size: 13px; border-top: 1px solid #e0e0e0;">${
              booking.date
            }</td>
            <td style="padding: 8px; font-size: 13px; border-top: 1px solid #e0e0e0;">${
              booking.time
            }</td>
            <td style="padding: 8px; font-size: 13px; border-top: 1px solid #e0e0e0; text-align: right;">${
              booking.price
            }</td>
          </tr>
        </tbody>
      </table>

      <!-- Payment Summary -->
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="width: 70%;"></td>
          <td style="width: 30%;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px; font-size: 13px;">Subtotal</td>
                <td style="padding: 4px; font-size: 13px; text-align: right;">${
                  booking.price
                }</td>
              </tr>
              <tr>
                <td style="padding: 4px; font-size: 13px;">VAT (15%)</td>
                <td style="padding: 4px; font-size: 13px; text-align: right;">${
                  (() => {
                    const priceStr = booking.price || '0';
                    const priceNum = parseFloat(priceStr.replace(/[^0-9.-]/g, ''));
                    const vat = priceNum * 0.15;
                    return `R${vat.toFixed(2)}`;
                  })()
                }</td>
              </tr>
              <tr>
                <td style="padding: 4px; font-size: 13px; font-weight: bold;">Total</td>
                <td style="padding: 4px; font-size: 13px; font-weight: bold; text-align: right;">${
                  (() => {
                    const priceStr = booking.price || '0';
                    const priceNum = parseFloat(priceStr.replace(/[^0-9.-]/g, ''));
                    const vat = priceNum * 0.15;
                    const total = priceNum + vat;
                    return `R${total.toFixed(2)}`;
                  })()
                }</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Payment Instructions (only for confirmation) -->
      ${
        showPaymentInstructions
          ? `
      <div style="background-color: #f4f6f7; padding: 15px; border-left: 4px solid #2c3e50; margin-bottom: 20px;">
        <h4 style="margin: 0 0 5px; font-size: 13px; color: #2c3e50;">Payment Instructions</h4>
        <p style="margin: 0; font-size: 12px;">Payment will be collected at the time of service. We accept cash, cards, and bank transfers.</p>
      </div>`
          : ""
      }

      <!-- Notes -->
      <div style="background-color: #f4f6f7; padding: 15px; border-left: 4px solid ${statusColor}; margin-bottom: 20px;">
        <h4 style="margin: 0 0 5px; font-size: 13px; color: #2c3e50;">Notes</h4>
        <p style="margin: 0; font-size: 12px;">${notes}</p>
      </div>

      <!-- Admin Link -->
      ${
        type === "admin"
          ? `
      <p style="font-size: 12px; color: #333;">
        To manage this booking, log into your admin dashboard: 
        <a href="${process.env.ADMIN_DASHBOARD_URL || "#"}">${
              process.env.ADMIN_DASHBOARD_URL || "Dashboard Link"
            }</a>
      </p>`
          : ""
      }

      <!-- Footer -->
      <div style="font-size: 11px; color: #7f8c8d; border-top: 1px solid #e0e0e0; padding-top: 10px; text-align: center;">
        <p style="margin: 0;">
          <strong>${process.env.COMPANY_NAME || "Your Business"}</strong> | 
          ${process.env.COMPANY_PHONE || "Phone"} | 
          ${process.env.COMPANY_EMAIL || "Email"} | 
          ${process.env.COMPANY_ADDRESS || "Address"}
        </p>
        <p style="margin: 4px 0 0;">
          ${
            type === "admin"
              ? "Automated notification for administrators."
              : "This is an official invoice and booking record."
          }
        </p>
      </div>
    </div>
    `,
  };
};

// Email templates
export const emailTemplates = {
  bookingConfirmation: (booking) =>
    generateInvoiceEmail(booking, "confirmation"),
  bookingReminder: (booking) => generateInvoiceEmail(booking, "reminder"),
  adminNotification: (booking) => generateInvoiceEmail(booking, "admin"),
  completionThankYou: (booking) => {
    // Helper function to format the date consistently
    const formatDate = (date) => {
      if (!date) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    // Company details (fallbacks if environment variables are missing)
    const companyName = process.env.COMPANY_NAME || "RaiZN Cosmetic Boutique";
    const companyAddress =
      process.env.COMPANY_ADDRESS || "170 Roux Street, Danville";
    const companyPhone = process.env.COMPANY_PHONE || "082 730 1151";
    const companyEmail = process.env.COMPANY_EMAIL || "info@raizncosmetics.com";

    // Current date string for the email header
    const currentDate = formatDate(new Date());

    return {
      subject: `Thank you for choosing ${companyName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 680px; margin: 0 auto; background-color: #f9f9f9; padding: 30px 20px; color: #333;">
          
          <!-- Company Header Section -->
          <table style="width: 100%; border-bottom: 3px solid #2c3e50; padding-bottom: 15px; margin-bottom: 30px;">
            <tr>
              <td style="width: 65%; vertical-align: top;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #2c3e50;">${companyName}</h1>
                <p style="margin: 5px 0 2px; font-size: 13px; color: #7f8c8d;">${companyAddress}</p>
                <p style="margin: 0; font-size: 13px; color: #7f8c8d;">
                  Phone: ${companyPhone} | Email: <a href="mailto:${companyEmail}" style="color: #2c3e50; text-decoration: none;">${companyEmail}</a>
                </p>
              </td>
              <td style="width: 35%; text-align: right; vertical-align: top;">
                <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #2c3e50;">Thank You</h2>
                <p style="margin: 5px 0 0; font-size: 13px; color: #7f8c8d;">${currentDate}</p>
              </td>
            </tr>
          </table>

          <!-- Personalized Greeting -->
          <section style="margin-bottom: 25px;">
            <p style="font-size: 15px; color: #555; line-height: 1.6;">
              Dear <strong>${
                booking.customerName || booking.clientName || "Valued Client"
              }</strong>,
            </p>
            <p style="font-size: 15px; color: #555; line-height: 1.6;">
              We sincerely appreciate you choosing ${companyName} for your beauty needs. It was our pleasure to provide you with the <strong>${
        booking.service
      }</strong> service. We trust that your experience was exceptional and that you left feeling refreshed and radiant.
            </p>
            <p style="font-size: 15px; color: #555; line-height: 1.6;">
              Your satisfaction and confidence are at the heart of everything we do. Should you have any questions about your treatment, need post-service advice, or wish to schedule a follow-up appointment, please do not hesitate to contact us.
            </p>
          </section>

          <!-- Service Summary Table -->
          <section style="margin-bottom: 30px;">
            <h3 style="font-size: 16px; color: #2c3e50; border-bottom: 2px solid #ccc; padding-bottom: 6px; margin-bottom: 15px;">Service Details</h3>
            <table style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #dcdcdc;">
              <tbody>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4; font-weight: 600; color: #374151; width: 35%;">Invoice #</td>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4;">${
                    booking.invoiceNumber || booking.id
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4; font-weight: 600; color: #374151; width: 35%;">Service</td>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4;">${
                    booking.service
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4; font-weight: 600; color: #374151;">Date</td>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4;">${formatDate(
                    booking.date
                  )}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4; font-weight: 600; color: #374151;">Time</td>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4;">${
                    booking.time
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4; font-weight: 600; color: #374151;">Duration</td>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4;">${
                    booking.duration
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4; font-weight: 600; color: #374151;">Subtotal</td>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4;">${
                    booking.price
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4; font-weight: 600; color: #374151;">VAT (15%)</td>
                  <td style="padding: 10px 15px; border-bottom: 1px solid #e4e4e4;">${
                    (() => {
                      const priceStr = booking.price || '0';
                      const priceNum = parseFloat(priceStr.replace(/[^0-9.-]/g, ''));
                      const vat = priceNum * 0.15;
                      return `R${vat.toFixed(2)}`;
                    })()
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 15px; font-weight: 700; color: #374151;">Total Investment</td>
                  <td style="padding: 10px 15px; font-weight: 700;">${
                    (() => {
                      const priceStr = booking.price || '0';
                      const priceNum = parseFloat(priceStr.replace(/[^0-9.-]/g, ''));
                      const vat = priceNum * 0.15;
                      const total = priceNum + vat;
                      return `R${total.toFixed(2)}`;
                    })()
                  }</td>
                </tr>
              </tbody>
            </table>
          </section>

          <!-- Gratitude & Encouragement Block -->
          <section style="background-color: #f4f6f7; border-left: 5px solid #2c3e50; padding: 20px; margin-bottom: 40px;">
            <p style="font-size: 15px; color: #333; line-height: 1.6; margin: 0;">
              At ${companyName}, we believe that true beauty radiates from confidence and self-care. Thank you for trusting us to be part of your journey. We look forward to welcoming you back and helping you continue to shine.
            </p>
          </section>

          <!-- Closing and Contact Reminder -->
          <section style="margin-bottom: 25px;">
            <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0;">
              Warm regards,<br>
              <strong>The ${companyName} Team</strong>
            </p>
            <p style="font-size: 13px; color: #7f8c8d; margin-top: 12px;">
              Should you wish to schedule your next appointment or have any questions, please contact us at <a href="tel:${companyPhone}" style="color: #2c3e50; text-decoration: none;">${companyPhone}</a> or email <a href="mailto:${companyEmail}" style="color: #2c3e50; text-decoration: none;">${companyEmail}</a>.
            </p>
          </section>

          <!-- Footer Section -->
          <footer style="border-top: 1px solid #e0e0e0; padding-top: 15px; font-size: 11px; color: #7f8c8d; text-align: center;">
            <p style="margin: 0 0 5px 0;">
              ${companyName} | ${companyPhone} | <a href="mailto:${companyEmail}" style="color: #7f8c8d; text-decoration: none;">${companyEmail}</a> | ${companyAddress}
            </p>
            <p style="margin: 0;">
              You received this email because you recently completed a service with us. If you have any questions or concerns, please do not hesitate to reach out.
            </p>
          </footer>

        </div>
      `,
    };
  },
};

// Send email
export async function sendEmail({ to, subject, html, from = null }) {
  try {
    const mailOptions = {
      from:
        from ||
        `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    };
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
}

// Pre-made senders
export async function sendBookingConfirmation(booking) {
  const template = emailTemplates.bookingConfirmation(booking);
  return sendEmail({
    to: booking.customerEmail,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendBookingReminder(booking) {
  const template = emailTemplates.bookingReminder(booking);
  return sendEmail({
    to: booking.customerEmail,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendAdminNotification(booking) {
  const template = emailTemplates.adminNotification(booking);
  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendCompletionThankYou(booking) {
  const template = emailTemplates.completionThankYou(booking);
  return sendEmail({
    to: booking.customerEmail || booking.clientEmail,
    subject: template.subject,
    html: template.html,
  });
}
