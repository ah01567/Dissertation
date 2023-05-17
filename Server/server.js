const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const port = 4000;

// Add middleware to parse incoming request data
app.use(bodyParser.json());
app.use(cors());

//Feedback Backend function:

// Define route for submitting feedback
app.post('/api/submit-feedback', (req, res) => {
  const { fullName, email, userRole, feedbackText } = req.body;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.FEEDBACK_EMAIL_ADDRESS, // your email address
      pass: process.env.FEEDBACK_EMAIL_PASSWORD, // your email password
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


//Contact-Us Backend function:

// Define route for submitting feedback
app.post('/api/contact-us', (req, res) => {
  const { fullName, email, userRole, issue, issueText } = req.body;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.CONTACT_EMAIL_ADDRESS, // your email address
      pass: process.env.CONTACT_EMAIL_PASSWORD, // your email password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `${email}`, // sender address
    to: 'steam70999@gmail.com', // receiver address
    subject: 'MyOnlyBook Feedback from a ' + userRole, // Subject line
    text: `User name: ${fullName}\n
            User email: ${email}\n
            Issue: ${issue}\n
            Issue description: ${issueText}`, // plain text body
    html: ` <p>Hello MyonlyBook support team, </p>
            <p>A new app issue has been raised by the following MyOnlybook user. Please solve the issue as soon as possible:</p>
            <p><b>User name:</b> ${fullName}</p>
            <p><b>User email address:</b> ${email}</p>
            <p><b>User Issue:</b> ${issue}</p>
            <p><b>Description:</b> ${issueText}</p>`, // html body
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
