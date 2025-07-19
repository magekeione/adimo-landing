import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

export async function POST(request: NextRequest) {
  try {
    const emailData: EmailData = await request.json();

    const transporter = nodemailer.createTransport({
      host: "mail.trs-software.ro",
      port: 465,
      secure: true,
      auth: {
        user: "teste@trs-software.ro",
        pass: "TesteTRS123!@#",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const notificationEmailOptions = {
      from: "teste@trs-software.ro",
      to: "teste@trs-software.ro",
      subject: `[ADIMO Contact] ${emailData.type.toUpperCase()}: ${
        emailData.subject
      }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Mesaj nou de pe site-ul ADIMO</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #2563eb; margin-top: 0;">Detalii contact:</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 120px;">Nume:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${
                    emailData.name
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${
                      emailData.email
                    }" style="color: #2563eb;">${emailData.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Tip mesaj:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
                    <span style="background: #2563eb; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
                      ${emailData.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subiect:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${
                    emailData.subject
                  }</td>
                </tr>
              </table>
              
              <h3 style="color: #2563eb; margin-top: 20px;">Mesaj:</h3>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
                ${emailData.message.replace(/\n/g, "<br>")}
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 6px; border: 1px solid #d1fae5;">
                <p style="margin: 0; color: #065f46;">
                  <strong>💡 Sfat:</strong> Poți răspunde direct la acest email pentru a contacta persoana.
                </p>
              </div>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} ADIMO - Mesaj generat automat de pe site
            </p>
          </div>
        </div>
      `,
    };

    const confirmationEmailOptions = {
      from: "teste@trs-software.ro",
      to: emailData.email,
      subject: "Confirmăm primirea mesajului tău - ADIMO",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Mulțumim pentru mesaj!</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p>Bună <strong>${emailData.name}</strong>,</p>
              
              <p>Am primit mesajul tău cu subiectul "<strong>${
                emailData.subject
              }</strong>" și îți confirmăm că acesta a ajuns în siguranță la echipa noastră.</p>
              
              <div style="background: #eff6ff; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
                <h3 style="margin-top: 0; color: #2563eb;">Ce urmează?</h3>
                <ul style="margin-bottom: 0; color: #1e40af;">
                  <li>Echipa noastră va analiza mesajul tău în maximum 2 ore lucrătoare</li>
                  <li>Îți vom răspunde la adresa <strong>${
                    emailData.email
                  }</strong></li>
                  <li>Dacă ai solicitat o demonstrație, te vom contacta pentru programare</li>
                </ul>
              </div>
              
              <p>Între timp, te invităm să:</p>
              <ul>
                <li><a href="https://adimo.ro/platforma" style="color: #2563eb;">Explorezi funcționalitățile ADIMO</a></li>
                <li><a href="https://adimo.ro/despre-noi" style="color: #2563eb;">Citești mai multe despre echipa noastră</a></li>
                <li><a href="https://www.google.com" style="color: #2563eb;">Testezi platforma direct</a></li>
              </ul>
              
              <p>Cu stimă,<br><strong>Echipa ADIMO</strong></p>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} ADIMO - contact@adimo.ro
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(notificationEmailOptions);

    await transporter.sendMail(confirmationEmailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Email-urile au fost trimise cu succes",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Eroare SMTP:", error);
  }
}
