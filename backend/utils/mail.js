const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

const sendGridMail = async (email, subject, text, html) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || `SG4425`);
    const details = {
      to: email,
      from: process.env.SENDGRID_VERIFY_SENDER || '',
      subject: subject,
      text: text,
      html: html,
    };
    const response = await sgMail.send(details);
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};

const sendCustomMail = async (from, email, subject, text, html) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_USER_HOST,
      port: process.env.SMTP_USER_PORT || 587,
      auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_USER_PASSWORD,
      },
    });

    console.log(`sending email: ${process.env.SMTP_USER_HOST}, ${process.env.SMTP_USER_PORT}, ${process.env.SMTP_USER_EMAIL}, ${process.env.SMTP_USER_PASSWORD}`);

    let info = await transporter.sendMail({
      from: from,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
    return { success: true, info };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

const sendMail = async (email, subject, text, html) => {
  const SMTP_VERIFY_SENDER_NAME = process.env.SMTP_VERIFY_SENDER_NAME || '';
  const SMTP_VERIFY_SENDER_EMAIL = process.env.SMTP_VERIFY_SENDER_EMAIL || '';
  let result;
  if (process.env.APP_ENVIRONMENT === 'development') {
    result = await sendGridMail(email, subject, text, html);
  } else {

    const from = SMTP_VERIFY_SENDER_NAME && SMTP_VERIFY_SENDER_EMAIL ? {
      name: SMTP_VERIFY_SENDER_NAME,
      address: SMTP_VERIFY_SENDER_EMAIL
    } : SMTP_VERIFY_SENDER_EMAIL;

    if (!from) {
      console.error(`No SMTP_VERIFY_SENDER_EMAIL variable set. Email not sent.`);
    }

    result = await sendCustomMail(from, email, subject, text, html);
  }
  return result;
};

module.exports = sendMail;
