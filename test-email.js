const nodemailer = require('nodemailer');


async function test() {
  console.log("Host:", process.env.SMTP_HOST);
  console.log("Port:", process.env.SMTP_PORT);
  console.log("User:", process.env.SMTP_USER);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465' || process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    logger: true
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER, // send to self
      subject: 'Test Email',
      text: 'This is a test email'
    });
    console.log("Success:", info.messageId);
  } catch (error) {
    console.error("Failed:", error);
  }
}

test();
