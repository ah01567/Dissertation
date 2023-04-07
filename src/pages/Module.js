import React from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import ModuleTicket from '../components/ModuleTicket';
import Button from 'react-bootstrap/Button';

const Module = () => {
    const {firebaseInitialized } = useAuth();

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div>
                <NavBar />
            </div>    
            <div>
                <h1>Arbic:</h1>
                <Button variant="danger">Delete module</Button> {''}
                <Button variant="success">Add content section</Button>
                <ModuleTicket />
            </div>
        </div>
    )
}
 
export default Module;