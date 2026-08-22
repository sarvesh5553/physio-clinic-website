import { Resend } from "resend";

// 1. Response & Input Interfaces
export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface AppointmentDetails {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceOrCondition: string;
  notes?: string;
}

// 2. Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// 3. Email Sending Function
export async function sendAppointmentNotificationEmail(
  appointment: AppointmentDetails
): Promise<ApiResponse> {
  try {
    const hospitalOwnerEmail = process.env.HOSPITAL_OWNER_EMAIL;

    if (!hospitalOwnerEmail) {
      throw new Error("HOSPITAL_OWNER_EMAIL is missing in environment variables.");
    }

    console.log("[EMAIL] Sending appointment notification via Resend to:", hospitalOwnerEmail);

    // Responsive HTML Email Template
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>New Appointment Booked</title>
        <style>
            /* Reset styles for email clients */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            
            /* Responsive layout rules for mobile screens (under 600px) */
            @media screen and (max-width: 600px) {
                .email-container {
                    width: 100% !important;
                    padding: 16px !important;
                }
                .card-padding {
                    padding: 20px 16px !important;
                }
                .responsive-table, .responsive-table tbody, .responsive-table tr, .responsive-table td {
                    display: block !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                .responsive-table tr {
                    margin-bottom: 12px;
                    border-bottom: 1px dashed #e2e8f0;
                    padding-bottom: 8px;
                }
                .responsive-table tr:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .responsive-table td {
                    padding: 2px 0 !important;
                    text-align: left !important;
                }
                .label-col {
                    font-size: 12px !important;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .header-title {
                    font-size: 20px !important;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155;">
        
        <!-- Outer Wrapper -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 20px 0;">
            <tr>
                <td align="center">
                    
                    <!-- Main Container Card -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); overflow: hidden;">
                        <tr>
                            <td class="card-padding" style="padding: 32px 28px;">
                                
                                <!-- Header -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 2px solid #0d9488; padding-bottom: 16px; margin-bottom: 24px;">
                                    <tr>
                                        <td>
                                            <h1 class="header-title" style="color: #0f172a; margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">🚨 New Appointment Alert</h1>
                                            <p style="color: #64748b; margin: 0; font-size: 14px;">A new patient has scheduled an appointment through the website.</p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Appointment Details Box -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; padding: 20px; margin-bottom: 24px;">
                                    <tr>
                                        <td>
                                            <h3 style="margin: 0 0 16px 0; color: #0d9488; font-size: 14px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
                                                Appointment Details
                                            </h3>
                                            
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="responsive-table" style="font-size: 14px;">
                                                <tr>
                                                    <td class="label-col" style="padding: 8px 0; color: #64748b; font-weight: 600; width: 38%;">Patient Name:</td>
                                                    <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${appointment.patientName}</td>
                                                </tr>
                                                <tr>
                                                    <td class="label-col" style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                                                    <td style="padding: 8px 0; color: #0f172a;">
                                                        <a href="tel:${appointment.patientPhone}" style="color: #0d9488; text-decoration: none; font-weight: 700; display: inline-block;">
                                                            📞 ${appointment.patientPhone}
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="label-col" style="padding: 8px 0; color: #64748b; font-weight: 600;">Email Address:</td>
                                                    <td style="padding: 8px 0; color: #0f172a;">
                                                        <a href="mailto:${appointment.patientEmail}" style="color: #0d9488; text-decoration: none; word-break: break-all;">
                                                            ${appointment.patientEmail}
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="label-col" style="padding: 8px 0; color: #64748b; font-weight: 600;">Date & Time:</td>
                                                    <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${appointment.appointmentDate} at ${appointment.appointmentTime}</td>
                                                </tr>
                                                <tr>
                                                    <td class="label-col" style="padding: 8px 0; color: #64748b; font-weight: 600;">Service/Concern:</td>
                                                    <td style="padding: 8px 0; color: #0f172a;">${appointment.serviceOrCondition}</td>
                                                </tr>
                                                ${
                                                  appointment.notes
                                                    ? `
                                                <tr>
                                                    <td class="label-col" style="padding: 8px 0; color: #64748b; font-weight: 600;">Additional Notes:</td>
                                                    <td style="padding: 8px 0; color: #334155; font-style: italic; word-break: break-word;">"${appointment.notes}"</td>
                                                </tr>`
                                                    : ""
                                                }
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Footer -->
                                <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0; line-height: 1.5;">
                                    This automated notification was generated by Dr. Bhagyashri's Physio Clinic Booking System.
                                </p>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;

    // Send via Resend API using EMAIL_FROM environment variable (supports both local development and production custom domain)
    const senderEmail = process.env.EMAIL_FROM || "Physio Clinic <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [hospitalOwnerEmail],
      subject: `🗓️ New Appointment: ${appointment.patientName} - ${appointment.appointmentDate}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[RESEND ERROR]:", error);
      return {
        success: false,
        message: `Failed to send email: ${error.message}`,
      };
    }

    console.log("[EMAIL] Sent successfully with Resend ID:", data?.id);

    return {
      success: true,
      message: "Appointment notification email sent successfully.",
    };
  } catch (emailError: any) {
    console.error("[EMAIL] Error sending appointment notification:", emailError);
    return {
      success: false,
      message: emailError?.message || "Failed to send appointment notification email.",
    };
  }
}