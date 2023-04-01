import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Design/authForms.css';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
       
    const LoginFunction = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
           if (error.code === "auth/user-not-found") {
                setError("This email address is not valid. please register first");
             } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Try again");
            } 
         })
        };
       
    
 
    return(
            <div className='form-container'>   
            {error && <Alert style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999}} key='danger' variant='danger'>{error}</Alert> }                                                                         
                    <Form className="forms">  
                            <h1 className='form-title'> <b>MyOnlyBook </b></h1>    
                            <div className='form-description'>Welcome to MyOnlyBook. Please <b>log in</b> into your account here</div>                                         
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address:*</Form.Label>
                                <Form.Control
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </Form.Group>
   
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password:*</Form.Label>
                                <Form.Control
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div>{error}</div> 

                            <Button className="button-auth" variant="success" type="submit" onClick={LoginFunction} >
                                Login
                            </Button>  

                            <div>
                                <Form.Text className="text-muted">
                                    New user ?{' '}
                                    <NavLink to="/register" >
                                        Register account
                                    </NavLink>
                                </Form.Text>   
                            </div>     

                            <div>
                                <Form.Text className="text-muted">
                                    Forgot your password ?{' '}
                                    <NavLink to="/login" >
                                        Reset password
                                    </NavLink>
                                </Form.Text>   
                            </div>                        
                    </Form>   

                                 
            </div>
    )
}
 
export default Login