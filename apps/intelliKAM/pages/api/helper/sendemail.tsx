const nodemailer = require('nodemailer');

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    }
  }
  );
  const from = process.env.EMAIL_FROM
  await transporter.sendMail({ from, to, subject, html });
}

