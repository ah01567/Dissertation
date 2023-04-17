import React, { useState, useEffect } from 'react';
import useAuth from "./CurrentUser";
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../Design/UserDetails.css';
import { MDBContainer } from "mdb-react-ui-kit";
import { getDatabase, onValue, ref, set } from 'firebase/database';

const UserProfileForm = () => {
    const { currentUser, isAdmin, firebaseInitialized } = useAuth();

  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [role, setRole] = useState();
  const [dob, setDob] = useState('');
  const [schoolName, setSchoolName] = useState();
  const [email, setEmail] = useState();

  const [inputsEnabled, setInputsEnabled] = useState(false); 

  const handleProfilePictureChange = (event) => {
      setSelectedProfilePicture(event.target.files[0]);
  };
  const profilePicture = selectedProfilePicture
  ? URL.createObjectURL(selectedProfilePicture)
  : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
  
  useEffect(() => {
    const currentUserID = currentUser?.uid;
    if (!currentUserID) {
      return;
    }
    const dbRef = ref(getDatabase(), `Users/${currentUserID}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) { // check if data is not null or undefined
        setFirstName(data.fname); // set to empty string if null or undefined
        setLastName(data.lname);
        setRole(data.role);
        setDob(data.dob);
        setSchoolName(data.school);
        setEmail(data.email);
      }
    });
  }, [currentUser?.uid]);


  const handleSave = (event) => {
    event.preventDefault();
    setInputsEnabled(false);
    const currentUserID = currentUser?.uid;
    const userRef = ref(getDatabase(), `Users/${currentUserID}`);
    const newData = {
        fname: firstName,
        lname: lastName, 
        role: role, 
        dob: dob || '',
        school: schoolName || '',
        email: email,
      };
      set(userRef, newData);
};

  const handleEdit = () => {
    setInputsEnabled(true);
  };

  if (!firebaseInitialized) {
    return <Spinner />;
  }

  return (
    <div>
        <div> <NavBar/> </div>
        <div className='profile' >
            <Container className="mt-5" >
                <Row className="justify-content-center">
                    <Col md={9}>
                    <div className="border p-3">
                        <MDBContainer className="my-5 d-flex justify-content-center">
                            <img
                                src= {profilePicture}
                                className="rounded-circle"
                                alt="Avatar"
                                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                            />
                        </MDBContainer>

                        <div className='picture-btn'>
                            <input variant="outline-primary" type="file" onChange={handleProfilePictureChange} />
                        </div>

                        <Form className="my-form-group">
                        <Form.Group>
                            <Form.Label><b>First Name</b></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={!inputsEnabled} />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label><b>Last Name</b></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={!inputsEnabled} />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label><b>Role</b></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Enter role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label><b>Date of Birth</b></Form.Label>
                            <Form.Control
                            type="date"
                            placeholder="Enter your date of birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            disabled={!inputsEnabled} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label><b>School/Institution Name</b></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Enter your school name"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            disabled={!inputsEnabled} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label><b>Email</b></Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!inputsEnabled} />
                        </Form.Group>

                        <div className='buttons'>
                                <Button className='edit-btn' variant="primary" onClick={handleEdit} disabled={inputsEnabled}> Edit </Button>
                                <Button className='save-btn' variant="success" onClick={handleSave} disabled={!inputsEnabled}> Save </Button>
                        </div>
                        </Form>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  );
};

export default UserProfileForm;