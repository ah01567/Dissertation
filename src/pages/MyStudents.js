import React from 'react';
import useAuth from "./CurrentUser";
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';

const MyStudents = () => {
    const { currentUser, isAdmin, firebaseInitialized } = useAuth();

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div>
                <NavBar />
            </div>  

            <div>
            <Card>
                <Card.Header as="h3">MyStudents List:</Card.Header>
                <Card.Body>
                    <Card.Text>Enter your students' Emails and add them to your MyStudents List, using the search bar below:</Card.Text>

                        <h3 class='country-search-title'>Mystudent search: </h3>                 
                        <Form.Control type="text" placeholder="Enter your student's Emaill address here" style={{width: "60%"}} /> 
                        <FaSearch /> 
                    <Button variant="success">Add student</Button>
                </Card.Body>
            </Card>
            </div> 
        </div>
    )
}
 
export default MyStudents;