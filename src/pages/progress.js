import React, { useState, useEffect } from 'react';
import useAuth from "./CurrentUser";
import { getDatabase, onValue, ref } from 'firebase/database';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import '../Design/progress.css';

const MyStudents = () => {
  const { currentUser, firebaseInitialized } = useAuth();
  const [myModules, setMyModules] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const teacherModulesRef = ref(getDatabase(), `TeacherModules/${currentUser.uid}`);
      onValue(teacherModulesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const modules = Object.keys(data).map((key) => data[key]);
          setMyModules(modules);
        }
      });
    }
  }, [currentUser]);

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

        {myModules.map((module) => (
          <Card className='card' key={module.id}>
            <Card.Header as="h3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{module.title}</Card.Header>
            <Card.Body>
            <Table bordered style={{ maxWidth: "60%"}}>
              <thead>
                <tr style={{ maxWidth: "30%", backgroundColor: 'lightgrey' }}>
                  <th style={{ backgroundColor: 'white' }}></th>
                  <th>Semester 01</th>
                  <th>Semester 02</th>
                  <th>Semester 03</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ backgroundColor: 'lightgrey' }}>Test 01</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'lightgrey' }}>Test 02</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'lightgrey' }}>Exam</td>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyStudents;
