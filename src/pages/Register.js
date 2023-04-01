import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { FormGroup, FormCheck } from 'react-bootstrap';
import { auth } from './firebase';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Design/authForms.css';
 
const Register = () => {
    //Constants and Variables
    const navigate = useNavigate();

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    //Methods
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/")
        })
        .catch((error) => {
            if(error.code === "auth/email-already-in-use") {
                 setError("This email is already registered. Please Log in");
            } else if (error.code === "auth/invalid-email") {
                 setError("This email address is not valid.");
             } else if (error.code === "auth/operation-not-allowed") {
                 setError("Operation not allowed.");
             } else if (error.code === "auth/weak-password") {
                 setError("Your password is too weak.");
             }
         }
        );
      }
 
  return (
            <div className='form-container'>   
            {error && <Alert style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999}} key='danger' variant='danger'>{error}</Alert> }                     <Form className="forms">
                    <h1 className='form-title'> <b>MyOnlyBook </b></h1>    
                            <div className='form-description'>Welcome to MyOnlyBook. Please <b>register</b> your account here</div><br/> 

                    <Form.Group className="mb-3" controlId="fname">
                        <Form.Control type="text"
                                      label="First name"
                                      value={fname}
                                      onChange={(e) => setFname(e.target.value)}  
                                      required                                    
                                      placeholder="First name:*" />
                    </Form.Group> 

                    <Form.Group className="mb-3" controlId="lname">
                        <Form.Control type="text"
                                      label="Last name"
                                      value={lname}
                                      onChange={(e) => setLname(e.target.value)}  
                                      required                                    
                                      placeholder="Last name:*" />
                    </Form.Group> 

                    <FormGroup className='radio'>
                        
                        <FormCheck inline label="Student" value="STUDENT" checked={role === "STUDENT"} onChange={(e) => setRole(e.target.value)}  type="radio" name="userType" id="studentRadio" />
                        <FormCheck inline label="Teacher" value="TEACHER" checked={role === "TEACHER"} onChange={(e) => setRole(e.target.value)}  type="radio" name="userType" id="teacherRadio" />
                        <FormCheck inline label="Parent" value="PARENT"   checked={role === "PARENT"} onChange={(e) => setRole(e.target.value)}  type="radio" name="userType" id="parentRadio" />
                    </FormGroup>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email"
                                      label="Email address"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}  
                                      required                                    
                                      placeholder="Email address:*"  />
                    </Form.Group> 

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password"
                                      label="Create password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)} 
                                      required                                 
                                      placeholder="Password:*"  />
                     </Form.Group>                                           
                        <Button className="button-auth" variant="success" type="submit" onClick={onSubmit} > Register account </Button>    

                        <Button className="button-back-to-login" variant="danger" as={Link} to="/login" > Back to Login </Button>                                    
                    </Form>               
            </div>
  )
}
 
export default Register