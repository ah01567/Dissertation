import React, { useState, useEffect } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import useAuth from "./CurrentUser";
import Spinner from '../components/Spinner';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import '../Design/UserDetails.css';
import { MDBContainer } from "mdb-react-ui-kit";
import { getDatabase, onValue, ref, set } from 'firebase/database';

const UserProfileForm = () => {

  const { currentUser, firebaseInitialized } = useAuth();
  const [inputsEnabled, setInputsEnabled] = useState(false); 
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [role, setRole] = useState();
  const [dob, setDob] = useState('');
  const [schoolName, setSchoolName] = useState();
  const [email, setEmail] = useState();

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Select profile picture from files
  const handleFileSelect = (event) => {
      setSelectedProfilePicture(event.target.files[0]);
  };
  const profilePicture = selectedProfilePicture
  ? URL.createObjectURL(selectedProfilePicture)
  : "data:image/png;base64,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";
  

  //Fetch User's credentials from Database for display 
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

  //Set modal to TRUE
  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setPassword('');
    setError('');
  };

  // Edit the inputs
  const handleEdit = () => {
    handleOpenModal();
  };

  // Reauthenticate with Password for security purposes
  const handlePasswordValidation = () => {
    const credential = EmailAuthProvider.credential(currentUser.email, password);
  
    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        // Password is valid, perform further actions (e.g., enable inputs)
        setInputsEnabled(true);
        setPassword('');
        setError('');
        handleCloseModal();
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again");
        } 
      });
  };  

  // Save the changes and push to Database
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

  // Fingerprint authentication
  const handleFingerprintAuthentication = async () => {
    try {
      const credentials = await navigator.credentials.get({
        publicKey: {
          // Specify the options for fingerprint authentication
          // Here you can set the appropriate options based on the Web Authentication API specification
          // For example, you can set `publicKey` to use `fido2` or `direct` to enable fingerprint authentication
        },
      });

      if (credentials) {
        // Authentication successful, perform further actions
        setInputsEnabled(true);
        handleCloseModal();
      }
    } catch (error) {
      // Error occurred during fingerprint authentication
      console.error(error);
    }
  };
  // Upload the spinner when initializing
  if (!firebaseInitialized) {
    return <Spinner />;
  }

  return (
    <div>
        <div className='profile' >
        {showModal && (
          <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Reauthentication:</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>
                    Please re-enter your <b>password</b> or use fingerprint for security purposes
                  </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <Button className='fingerprint-btn' variant='primary' onClick={handleFingerprintAuthentication}>
                    Use Fingerprint
                  </Button>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='danger' onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant='success' onClick={handlePasswordValidation}>
                  Confirm
                </Button>
              </Modal.Footer> 
          </Modal>
        )}
            <Container className="mt-5" >
                <Row className="justify-content-center">
                    <Col md={9}>
                    <div className="border p-3">
                        <MDBContainer className="my-5 d-flex justify-content-center">
                            <img
                                src= {profilePicture}
                                className="rounded-circle"
                                alt="Avatar"
                                style={{ width: "200px", height: "200px", borderRadius: "50%", marginTop:'-20px' }}
                            />
                        </MDBContainer>

                        <div className='picture-btn'>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            id="file-input"
                          />
                          <label htmlFor="file-input" style={{ backgroundColor: '#B565A7', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                            Upload profile picture
                          </label>
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