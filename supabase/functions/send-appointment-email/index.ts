import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@^6.9.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentPayload {
  name?: string;
  phone?: string;
  email?: string;
  appointment_date?: string;
  appointment_time?: string;
  doctor_or_service?: string;
  symptoms_notes?: string;
  reference_id?: string;
}

function buildHtmlReceipt(data: Required<AppointmentPayload>, submissionTime: string): string {
  const cleanPhone = data.phone.replace(/[^0-9]/g, "");
  const whatsappNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappText = encodeURIComponent(
    `Hello ${data.name}, this is Shri Sai Clinic regarding your appointment inquiry (${data.reference_id}) for ${data.appointment_date} at ${data.appointment_time}.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Inquiry Receipt - Shri Sai Clinic</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 28px -6px rgba(13, 148, 136, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04); border: 1px solid #ccfbf1;">
          
          <!-- Header Banner: Healing Teal Gradient (#0D9488) -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%); padding: 36px 24px; text-align: center;">
              <!-- Official Clinic Logo (Same as Navbar) -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto 14px auto;">
                <tr>
                  <td style="background-color: #ffffff; width: 68px; height: 68px; border-radius: 18px; text-align: center; vertical-align: middle; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18); border: 2px solid rgba(255, 255, 255, 0.85);">
                    <img
                      src="https://shrisaiclinic1812-jaimin-projects1.vercel.app/assets/images/logo.png"
                      alt="Shri Sai Clinic Logo"
                      width="52"
                      height="52"
                      style="width: 52px; height: 52px; object-fit: contain; display: block; margin: 0 auto;"
                    />
                  </td>
                </tr>
              </table>
              <h1 style="margin: 0; color: #ffffff; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">
                Shri Sai Clinic
              </h1>
              <p style="margin: 6px 0 0 0; color: #ccfbf1; font-size: 14px; font-weight: 500; letter-spacing: 0.01em;">
                Gentle Healing, Lasting Relief &bull; Vansda, Gujarat
              </p>
              <div style="margin-top: 16px;">
                <span style="background-color: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid rgba(255, 255, 255, 0.35); display: inline-block;">
                  Appointment Booking Receipt
                </span>
              </div>
            </td>
          </tr>

          <!-- Status Bar: Completed Enquiry -->
          <tr>
            <td style="padding: 18px 30px; background-color: #f0fdfa; border-bottom: 1px solid #ccfbf1;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <span style="font-size: 11px; color: #0f766e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Inquiry Status</span>
                    <div style="margin-top: 4px;">
                      <span style="background-color: #ccfbf1; color: #0f766e; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1px solid #99f6e4; display: inline-block;">
                        ✅ Completed Enquiry
                      </span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; color: #0f766e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Reference ID</span>
                    <div style="font-size: 15px; font-weight: 800; color: #0d9488; margin-top: 4px; font-family: 'Outfit', monospace; letter-spacing: 0.02em;">
                      #${data.reference_id}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking Details Grid -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 16px 0; font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em; display: flex; align-items: center; gap: 8px;">
                📋 Patient &amp; Consultation Summary
              </h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <tr style="background-color: #f0fdfa; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #0f766e; width: 35%;">Patient Name</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0f172a;">${data.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0; background-color: #ffffff;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Mobile Number</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0d9488;">
                    <a href="tel:${data.phone}" style="color: #0d9488; text-decoration: none;">📞 ${data.phone}</a>
                  </td>
                </tr>
                <tr style="background-color: #f0fdfa; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #0f766e;">Email Address</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #334155;">
                    <a href="mailto:${data.email}" style="color: #0d9488; text-decoration: none;">✉️ ${data.email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0; background-color: #ffffff;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Specialty / Concern</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0f172a;">🩺 ${data.doctor_or_service}</td>
                </tr>
                <tr style="background-color: #f0fdfa; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #0f766e;">Preferred Date</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0d9488;">📅 ${data.appointment_date}</td>
                </tr>
                <tr style="background-color: #ffffff;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Session Slot</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0f172a;">⏰ ${data.appointment_time}</td>
                </tr>
              </table>

              <!-- Symptoms & Clinical Notes Block in Healing Teal -->
              <div style="margin-top: 20px; background-color: #f0fdfa; border-left: 4px solid #0d9488; border-radius: 8px; padding: 14px 16px;">
                <div style="font-size: 12px; font-weight: 700; color: #0f766e; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
                  📝 Reported Symptoms / Patient Query
                </div>
                <div style="font-size: 14px; line-height: 1.5; color: #134e4a; white-space: pre-wrap;">
                  ${data.symptoms_notes}
                </div>
              </div>

              <!-- Quick Staff Actions: Call Patient & WhatsApp (Preserved) -->
              <div style="margin-top: 28px; text-align: center;">
                <div style="font-size: 12px; font-weight: 700; color: #0f766e; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                  ⚡ Staff Immediate Actions
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="padding: 0 6px;">
                      <a href="tel:${cleanPhone}" style="display: inline-block; width: 88%; background-color: #0d9488; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 16px; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.3);">
                        📞 Call Patient
                      </a>
                    </td>
                    <td align="center" style="padding: 0 6px;">
                      <a href="${whatsappUrl}" target="_blank" style="display: inline-block; width: 88%; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 16px; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(37, 211, 102, 0.3);">
                        💬 Chat on WhatsApp
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #ccfbf1; padding: 24px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto 8px auto;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 8px;">
                    <img
                      src="https://shrisaiclinic1812-jaimin-projects1.vercel.app/assets/images/logo.png"
                      alt="Shri Sai Clinic"
                      width="20"
                      height="20"
                      style="width: 20px; height: 20px; object-fit: contain; display: inline-block; vertical-align: middle;"
                    />
                  </td>
                  <td style="vertical-align: middle; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 13px; color: #0f766e;">
                    Shri Sai Clinic
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.6;">
                Received on: <strong style="color: #0f766e;">${submissionTime}</strong><br>
                Automated consultation receipt generated by <strong>Shri Sai Clinic Portal</strong>.
              </p>
              <div style="margin-top: 10px; font-size: 11px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} Shri Sai Clinic &bull; Dr. Jay Bhatt (BHMS) &bull; Vansda, Gujarat
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

serve(async (req: Request) => {
  // 1. Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 2. Parse incoming JSON body
    let rawPayload: any = {};
    try {
      rawPayload = await req.json();
    } catch {
      rawPayload = {};
    }

    // Handle direct JSON payload or Supabase database webhook envelope { record: { ... } }
    const record: AppointmentPayload = rawPayload.record || rawPayload;

    // Format IST submission timestamp
    const nowIst = new Date();
    const submissionTime = nowIst.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // Default reference ID fallback formatted as DD-MM-YYYY/1 in IST if not supplied
    const istDateParts = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).formatToParts(nowIst);

    const day = istDateParts.find((p) => p.type === "day")?.value || "10";
    const month = istDateParts.find((p) => p.type === "month")?.value || "10";
    const year = istDateParts.find((p) => p.type === "year")?.value || "2026";
    const fallbackRefId = `${day}-${month}-${year}/1`;

    const data: Required<AppointmentPayload> = {
      name: record.name?.trim() || "Valued Patient",
      phone: record.phone?.trim() || "Not provided",
      email: record.email?.trim() || "appointments.shrisaiclinic@gmail.com",
      appointment_date: record.appointment_date?.trim() || "To be scheduled",
      appointment_time: record.appointment_time?.trim() || "To be confirmed",
      doctor_or_service: record.doctor_or_service?.trim() || "General Consultation",
      symptoms_notes: record.symptoms_notes?.trim() || "None specified",
      reference_id: record.reference_id?.trim() || fallbackRefId,
    };

    // 3. Configure Nodemailer transport using Environment Variables
    const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
    const smtpPort = Number(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    const smtpFrom = Deno.env.get("SMTP_FROM") || "Shri Sai Clinic <appointments.shrisaiclinic@gmail.com>";
    const receiverEmail = Deno.env.get("RECEIVER_EMAIL") || "appointments.shrisaiclinic@gmail.com";

    if (!smtpUser || !smtpPass) {
      throw new Error("SMTP credentials are not configured in environment variables.");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // SSL for Port 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 4. Build Responsive HTML email receipt in Healing Teal
    const htmlReceipt = buildHtmlReceipt(data, submissionTime);

    // 5. Send Email via Transporter
    const info = await transporter.sendMail({
      from: smtpFrom,
      to: receiverEmail,
      subject: `🏥 New Appointment Request: ${data.name} - ${data.appointment_date} (Ref: ${data.reference_id})`,
      html: htmlReceipt,
    });

    console.log("Appointment email sent successfully:", info.messageId, "Ref:", data.reference_id);

    // 6. Return Clean JSON
    return new Response(
      JSON.stringify({
        success: true,
        messageId: info.messageId,
        reference_id: data.reference_id,
        status: "completed",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error sending appointment email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to send appointment receipt",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
