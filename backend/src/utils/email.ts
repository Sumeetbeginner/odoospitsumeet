import nodemailer from 'nodemailer';
import { config } from '../config';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: config.email.user && config.email.pass ? {
    user: config.email.user,
    pass: config.email.pass,
  } : undefined,
});

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  try {
    // For development without email config, just log the OTP
    if (!config.email.user || !config.email.pass) {
      console.log(`\n📧 OTP for ${email}: ${otp}\n`);
      return;
    }

    await transporter.sendMail({
      from: config.email.from,
      to: email,
      subject: 'StockMaster - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>You have requested to reset your password. Use the following OTP code:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #1f2937; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">StockMaster - Inventory Management System</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    // Log OTP in console as fallback
    console.log(`\n📧 OTP for ${email}: ${otp}\n`);
  }
};

