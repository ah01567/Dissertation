import React from 'react';
import useAuth from "./CurrentUser";
import '../Design/MyStudents.css';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const MyStudents = () => {
  const {firebaseInitialized } = useAuth();

  if (!firebaseInitialized) {
    return <Spinner />;
  }
  
  return (
    <div>
      <NavBar />
      <div>
        <Card className='card'>
          <Card.Header as="h3">MyStudents results:</Card.Header>
          <Card.Body>
            <Card.Text>Enter your students' <b>Emails</b> to add, edit and save their modules results, using the search bar below:</Card.Text>
            <h3 className='mystudents-search-title'>MyStudent search: </h3>
            <div className='mystudents-search-title'>
              <Form.Control id="student-email" type="email" placeholder="Enter your student's Email address here" style={{width: '60%'}}/>
            </div> <br/>
            <div className='add-btn'><Button  variant="success">display student results</Button></div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MyStudents;