import React, { useState } from 'react';
import useAuth from "./CurrentUser";
import '../Design/MyStudents.css';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { getDatabase, ref, onValue } from 'firebase/database';

const MyStudents = () => {
  const { currentUser, isAdmin, firebaseInitialized } = useAuth();
  const [students, setStudents] = useState([]);

  if (!firebaseInitialized) {
    return <Spinner />;
  }

  const handleAddStudent = () => {
    const email = document.getElementById('student-email').value;
    const dbRef = ref(getDatabase(), 'Users');
    onValue(dbRef, (snapshot) => {
      const users = snapshot.val();
      const matchingUser = Object.values(users).find(user => user.email === email);
      if (matchingUser) {
        setStudents(prevStudents => [...prevStudents, matchingUser]);
      }
    });
  }

  return (
    <div>
      <NavBar />
      <div>
        <Card className='card'>
          <Card.Header as="h3">MyStudents List:</Card.Header>
          <Card.Body>
            <Card.Text>Enter your students' <b>Emails</b> and add them to your MyStudents List, using the search bar below:</Card.Text>
            <h3 className='mystudents-search-title'>MyStudent search: </h3>
            <div className='mystudents-search-title'>
              <Form.Control id="student-email" type="text" placeholder="Enter your student's Email address here" style={{width: '60%'}}/>
            </div> <br/>
            <div className='all'>
            {students.length > 0 && (
            <div className="my-students-list">
                <ul>
                {students.map(student => (
                    <p className='mystudents-list-item' key={student.uid}>{student.email}</p>
                ))}
                </ul>
            </div>
            )}</div>
            <div className='add-btn'><Button  variant="success" onClick={handleAddStudent}>Add student</Button></div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MyStudents;