import React, { useState } from "react";
import axios from "axios";
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import { Form, Button } from "react-bootstrap";
import '../Design/Feedback.css';

const ContactUs = () => {
    const { firebaseInitialized } = useAuth();

        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [issue, setIssue] = useState("");
        const [feedbackText, setFeedbackText] = useState("");
      
        const handleSubmit = async (event) => {
            event.preventDefault();
          
            try {
            const response = await axios.post(
                "http://localhost:5000/api/submit-feedback",
                { fullName, email, issue, feedbackText }
            );
          
            //   const data = await response.text();
            //   console.log(data);
          
              // Clear the form fields on successful submission
              setFullName("");
              setEmail("");
              setIssue("");
              setFeedbackText("");
            } catch (error) {
              console.log(error);
            }
          };

          
    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div> <NavBar /> </div>    
            <div className="all">
                <div className="feedback-container">
                    <div className="feedback-title"><h1>Contact Us:</h1></div>
                    <div className="feedback-intro"><h5>Please fill in and submit the following form if you are facing any sorts of technical issue with the application. Your concern is our priority !</h5></div>
                    <div className="inputs">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFullName">
                                <Form.Label><b>Full Name:*</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                    style={{marginBottom:'15px'}}
                                 required/>
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Label><b>Email address:*</b></Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    style={{marginBottom:'15px'}}
                                 required/>
                            </Form.Group>

                            <Form.Group controlId="formTitle">
                                <Form.Label><b>Issue title:*</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the reason for contacting us"
                                    value={issue}
                                    onChange={(event) => setIssue(event.target.value)}
                                    style={{marginBottom:'15px'}}
                                 required/>
                            </Form.Group>

                            <Form.Group controlId="formFeedbackText">
                                <Form.Label><b>Issue description:*</b></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Provide further details about your issue ..."
                                    value={feedbackText}
                                    onChange={(event) => setFeedbackText(event.target.value)}
                                required/>
                            </Form.Group>

                            <div className="btn-submit"><Button  variant="success" type="submit"> Submit </Button></div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default ContactUs;