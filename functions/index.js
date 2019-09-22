const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password
  }
});

exports.sendMail = functions.https.onCall((data, context) => {
  const { to, subject, body } = data;

  const mailOptions = {
    from: `Scorecard Admin <${functions.config().gmail.email}>`,
    to,
    subject,
    html: body
  };

  // returning result
  return transporter.sendMail(mailOptions);
});

exports.returnHi = functions.https.onCall((data, context) => {
  return 'hi';
})