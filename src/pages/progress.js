import React, { useState, useEffect } from 'react';
import useAuth from "./CurrentUser";
import { getDatabase, onValue, ref } from 'firebase/database';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { LineChart, Line, XAxis, YAxis, Legend, ReferenceLine } from 'recharts';
import '../Design/progress.css';


const MyStudents = () => {
  const { currentUser, isAdmin, firebaseInitialized } = useAuth();
  const [myModules, setMyModules] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [test1Semester1, setTest1Semester1] = useState('0');
  const [test1Semester2, setTest1Semester2] = useState('0');
  const [test1Semester3, setTest1Semester3] = useState('0');
  const [test2Semester1, setTest2Semester1] = useState('0');
  const [test2Semester2, setTest2Semester2] = useState('0');
  const [test2Semester3, setTest2Semester3] = useState('0');
  const [examSemester1, setExamSemester1] = useState('0');
  const [examSemester2, setExamSemester2] = useState('0');
  const [examSemester3, setExamSemester3] = useState('0');

  const data = [
    { name: 'Semester 01', test1: test1Semester1, test2: test2Semester1, exam: examSemester1 },
    { name: 'Semester 02', test1: test1Semester2, test2: test2Semester2, exam: examSemester2 },
    { name: 'Semester 03', test1: test1Semester3, test2: test2Semester3, exam: examSemester3 }
    ];
    
    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleSaveClick = () => {
      setIsEditing(false);
    };

    //Display a Result table/Chart for each module
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
        {isAdmin &&
        <Card className='search-card'>
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
        }

        {myModules.map((module) => (
          <Card className='table' key={module.id}>
            <Card.Header as="h3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{module.title}</Card.Header>
            <Card.Body className='body'>
            <Table className='result-table' bordered style={{ maxWidth: "50%"}}>
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
                  <td><input type="number" value={test1Semester1} onChange={(e) => setTest1Semester1(e.target.value)} disabled={!isEditing} /></td>
                  <td><input type="number" value={test1Semester2} onChange={(e) => setTest1Semester2(e.target.value)} disabled={!isEditing} /></td>
                  <td><input type="number" value={test1Semester3} onChange={(e) => setTest1Semester3(e.target.value)} disabled={!isEditing} /></td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'lightgrey' }}>Test 02</td>
                  <td><input type="number" value={test2Semester1} onChange={(e) => setTest2Semester1(e.target.value)} disabled={!isEditing} /></td>
                  <td><input type="number" value={test2Semester2} onChange={(e) => setTest2Semester2(e.target.value)} disabled={!isEditing} /></td>
                  <td><input type="number" value={test2Semester3} onChange={(e) => setTest2Semester3(e.target.value)} disabled={!isEditing} /></td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'lightgrey' }}>Exam</td>
                  <td><input type="number" value={examSemester1} onChange={(e) => setExamSemester1(e.target.value)} disabled={!isEditing} /></td>
                  <td><input type="number" value={examSemester2} onChange={(e) => setExamSemester2(e.target.value)} disabled={!isEditing} /></td>
                  <td><input type="number" value={examSemester3} onChange={(e) => setExamSemester3(e.target.value)} disabled={!isEditing} /></td>
                </tr>
              </tbody>
              <div className='buttons'>
                  <Button className='btn-edit' variant="primary" onClick={handleEditClick}>Edit </Button>
                  <Button className='btn-save' variant="success" onClick={handleSaveClick}>Save</Button>
              </div>
            </Table>
            <LineChart width={500} height={300} data={data}>
              <Line dataKey="test1" stroke="#8884d8" />
              <Line dataKey="test2" stroke="#82ca9d" />
              <Line dataKey="exam" stroke="#ffc658" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Grades', angle: -90, position: 'insideLeft' }}/>
              <Legend/>
            </LineChart>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyStudents;
