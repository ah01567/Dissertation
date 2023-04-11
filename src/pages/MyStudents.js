import React, { useState, useEffect } from 'react';
import useAuth from "./CurrentUser";
import '../Design/MyStudents.css';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { getDatabase, ref, set, onValue} from 'firebase/database';

const MyStudents = () => {
  const { currentUser, isAdmin, firebaseInitialized } = useAuth();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (firebaseInitialized) {
      const teacherId = currentUser.uid;
      const dbRef = ref(getDatabase(), `MyStudents/${teacherId}`);
      onValue(dbRef, (snapshot) => {
        const studentsData = snapshot.val() || {};
        const studentsList = Object.values(studentsData).map((student) => ({
          id: student.id,
          fname: student.fname,
          lname: student.lname,
        }));
        setStudents(studentsList);
      });
    }
  }, [currentUser, firebaseInitialized]);

  const handleAddStudent = () => {
    //const [studentId, setstudentId] = useState('');
    const email = document.getElementById('student-email').value;
    const dbRef = ref(getDatabase(), 'Users');
    onValue(dbRef, (snapshot) => {
      const users = snapshot.val();
      const matchingUser = Object.values(users).find(user => user.email === email && user.role === 'STUDENT');
      if (!matchingUser) {
        alert('This student is not registered.');
        return;
      }
      const studentId = Object.keys(users).find(key => users[key] === matchingUser);
      const teacherId = currentUser.uid; 
      const MystudentsDB = ref(getDatabase(), `MyStudents/${teacherId}/${studentId}`);
      const studentData = {fname:matchingUser.fname, lname:matchingUser.lname};
      if (matchingUser) {
        {isAdmin && 
        set(MystudentsDB,studentData );
        }
      }
      const teacherModulesRef = ref(getDatabase(), `TeacherModules/${currentUser.uid}`);
      onValue(teacherModulesRef, (snapshot) => {
        const modules = snapshot.val();
        if (modules) {         
          for (const [title, moduleData] of Object.entries(modules)) {
            const studentModulesRef = ref(getDatabase(), `StudentModules/${studentId}/${title}`);
            set(studentModulesRef, {
              ...moduleData,
              title,
            });
          }
        }
      });
    });
    setStudents("");
  }

  if (!firebaseInitialized) {
    return <Spinner />;
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
              <Form.Control id="student-email" type="email" placeholder="Enter your student's Email address here" style={{width: '60%'}}/>
            </div> <br/>
            <div className='all'>
            {students.length > 0 && (
            <div className="my-students-list">
                <ul>
                {students.map(student => (
                    <p className='mystudents-list-item' key={student.uid}>{student.fname} {student.lname}</p>
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
