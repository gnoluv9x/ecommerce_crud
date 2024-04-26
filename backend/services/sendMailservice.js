import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendMailService(toEmail, html, subject = "Example subject") {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Nguyễn Văn An - LaptopAZ" <nguyenvanan.webdev@gmail.com>',
    to: toEmail,
    subject: subject,
    html,
  });

  return info;
}
