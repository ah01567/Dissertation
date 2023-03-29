import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
 
const Register = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
            <div>
                <div>                  
                    <h1> Register form </h1>                                                                            
                    <Form>   
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                                      label="Email address"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}  
                                      required                                    
                                      placeholder="Email address"  />
                        </Form.Group> 

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      label="Create password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)} 
                                      required                                 
                                      placeholder="Password"  />
                        </Form.Group>                                           

                        <Button variant="primary" type="submit" onClick={onSubmit} >
                            Register account
                        </Button>                                       
                    </Form>
                   
                    <Form.Text className="text-muted">
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                        </Form.Text>                   
                </div>
            </div>
  )
}
 
export default Register