import React from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import UploadLesson from '../components/UploadLesson';
import Button from 'react-bootstrap/Button';

const Module = () => {
    const {isAdmin, firebaseInitialized } = useAuth();

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div>
                <NavBar />
            </div>    
            <div>
                <h1>Arbic:</h1> {isAdmin &&
                <React.Fragment>
                    <Button variant="danger">Delete module</Button>
                    <Button variant="success">Add content section</Button>
                </React.Fragment> }
                <UploadLesson />
            </div>
        </div>
    )
}
 
export default Module;