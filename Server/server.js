const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

// Add middleware to parse incoming request data
app.use(bodyParser.json());
app.use(cors());


// Define route for submitting feedback
app.post('/api/submit-feedback', (req, res) => {
  const { fullName, email, userRole, feedbackText } = req.body;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `${email}`, // sender address
    to: 'school4302@gmail.com', // receiver address
    subject: 'MyOnlyBook Feedback from a ' + userRole, // Subject line
    text: `User name: ${fullName}\n
            User email: ${email}\n
            User Role: ${userRole}\n
            Feedback: ${feedbackText}`, // plain text body
    html: ` <p>Hello administration staff, </p>
            <p>A new feedback/suggestion has been sent by the following MyOnlybook user. Please do take into consideration.</p>
            <p><b>User name:</b> ${fullName}</p>
            <p><b>User email address:</b> ${email}</p>
            <p><b>User Role:</b> ${userRole}</p>
            <p><b>Feedback:</b> ${feedbackText}</p>`, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log('Email successfully ');
      res.status(200).send('OK');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
