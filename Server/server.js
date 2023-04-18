const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

// Add middleware to parse incoming request data
app.use(bodyParser.json());

// Define route for submitting feedback
app.post('/api/submit-feedback', (req, res) => {
  const { fullName, email, userRole, feedbackText } = req.body;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'henineahmed2904@gmail.com', // your email address
      pass: 'Ah01567@Sadia', // your email password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `${email}`, // sender address
    to: 'henineahmed2904@gmail.com', // receiver address
    subject: 'Feedback from ' + fullName + '('+ `${email} + ')'`, // Subject line
    text: `User Role: ${userRole}\nFeedback: ${feedbackText}`, // plain text body
    html: `<p>User Role: ${userRole}</p><p>Feedback: ${feedbackText}</p>`, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log('Message sent: %s', info.messageId);
      res.status(200).send('OK');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
