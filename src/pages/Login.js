import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Design/authForms.css';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
            <div className='form-container'>                                                                                     
                    <Form className="forms">  
                            <h1> <u>Login form: </u></h1>    
                            <h5>Welcome to MyOnlyBook. Please login into your account here</h5>                                         
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
                                                
                            <Button className="button" variant="success" type="submit" onClick={LoginFunction} >
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