import React, { useState, useEffect } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import useAuth from "./CurrentUser";
import NavBar from '../components/NavBar';
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
  : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
  

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
        <div> <NavBar/> </div>
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