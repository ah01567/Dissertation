import React, { useState } from "react";
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import { Form, Button } from "react-bootstrap";
import '../Design/Feedback.css';

const Feedback = () => {
    const { firebaseInitialized } = useAuth();

        const [fullName, setFullName] = useState("");
        const [userRole, setUserRole] = useState("");
        const [feedbackText, setFeedbackText] = useState("");
      
        const handleSubmit = (event) => {
          event.preventDefault();
          // TODO: handle form submission
        };
          
    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div> <NavBar /> </div>    
            <div className="all">
                <div className="feedback-container">
                    <div className="feedback-title"><h1>Feedback form:</h1></div>
                    <div className="feedback-intro"><h5>Your feedback is essential in helping us improve our services and provide you with the best possible experience. </h5></div>
                    <div className="inputs">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFullName">
                                <Form.Label><b>Full Name:</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                    style={{marginBottom:'15px'}}
                                 required/>
                            </Form.Group>

                            <Form.Group controlId="formUserRole">
                                <Form.Label> <b>Role:</b></Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue="Choose..."
                                    value={userRole}
                                    onChange={(event) => setUserRole(event.target.value)}
                                    style={{marginBottom:'15px'}}
                                    required>

                                    <option disabled selected value="">Select role </option>
                                    <option>Teacher</option>
                                    <option>Student</option>
                                    <option>Parent</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formFeedbackText">
                                <Form.Label><b>Feedback/Suggestion:</b></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Please type your feedback description ..."
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
 
export default Feedback;