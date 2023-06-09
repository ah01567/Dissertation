import React, { useState, useEffect } from 'react';
import useAuth from "./CurrentUser";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import Spinner from '../components/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { LineChart, Line, XAxis, YAxis, Legend } from 'recharts';
import '../Design/progress.css';


const Progress = () => {
  const { currentUser, isAdmin, firebaseInitialized } = useAuth();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [studentID, setStudentID] = useState('');
  const [studentDisplayedName, setStudentDisplayedName] = useState('');

  const [test1Semester1, setTest1Semester1] = useState('0');
  const [test1Semester2, setTest1Semester2] = useState('0');
  const [test1Semester3, setTest1Semester3] = useState('0');
  const [test2Semester1, setTest2Semester1] = useState('0');
  const [test2Semester2, setTest2Semester2] = useState('0');
  const [test2Semester3, setTest2Semester3] = useState('0');
  const [examSemester1, setExamSemester1] = useState('0');
  const [examSemester2, setExamSemester2] = useState('0');
  const [examSemester3, setExamSemester3] = useState('0');

  const [myModules, setMyModules] = useState([]);
  const [currentModule, setCurrentModule] = useState('');
  const [allowResultTicket, setAllowResultTicket] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const data = [
    { name: 'Semester 01', test1: test1Semester1, test2: test2Semester1, exam: examSemester1 },
    { name: 'Semester 02', test1: test1Semester2, test2: test2Semester2, exam: examSemester2 },
    { name: 'Semester 03', test1: test1Semester3, test2: test2Semester3, exam: examSemester3 }
    ];

    //Display a Result table/Chart for each module
    useEffect(() => {
      if (!currentUser) {
        return;
      }
      if (isAdmin) {
        const teacherModulesRef = ref(getDatabase(), `TeacherModules/${currentUser.uid}`);
        onValue(teacherModulesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const modules = Object.keys(data).map((key) => data[key]);
            setMyModules(modules);
          }
        });
      } else {
        const studentModulesRef = ref(getDatabase(), `StudentModules/${currentUser.uid}`);
        onValue(studentModulesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const modules = Object.keys(data).map((key) => data[key]);
            setMyModules(modules);
          }
        });
      }
    }, [currentUser, isAdmin]);
    

    // Search if user exists on MyStudents list. Only give fetch results permission to authorized teachers
    const searchForStudent = () => {
      const teacherID = currentUser.uid;
      const mystudentsDB = ref(getDatabase(), `MyStudents/${teacherID}`);
      onValue(mystudentsDB, async (snapshot) => {
        if (snapshot.exists()) {
          let matchFound = false;
          await Promise.all(snapshot.forEach((uidSnapshot) => {
            const uid = uidSnapshot.key;
            const childData = uidSnapshot.val();
            if (childData.fname === fname && childData.lname === lname) {
              setStudentID(uid);
              setStudentDisplayedName(`${fname} ${lname} 's results:`);
              setAllowResultTicket(true);
            }
          }))
          if (!matchFound) {
            alert('Sorry! You are not authorized to access this student\'s result');
            setStudentID('');
          }
        }
    });
  }

    useEffect(() => {
      fetchResult();
    }, [currentModule]);

    const fetchResult = () => {
      if (isAdmin) {
      const resultsDB = ref(getDatabase(), `Results/${studentID}/${currentModule}`);
      onValue(resultsDB, (snapshot) => {
        if (snapshot.exists()) {
          const marks = snapshot.val(); 
          //Fetch student marks and display them in the table
          setTest1Semester1(marks.t1s1);setTest2Semester1(marks.t2s1);setExamSemester1(marks.es1);
          setTest1Semester2(marks.t1s2);setTest2Semester2(marks.t2s2);setExamSemester2(marks.es2);
          setTest1Semester3(marks.t1s3);setTest2Semester3(marks.t2s3);setExamSemester3(marks.es3);
        } else {
          setStudentDisplayedName(`${fname} ${lname} 's results:`);
        }
      })
    } else {
        const studentViewID = currentUser?.uid;
        const resultsDB = ref(getDatabase(), `Results/${studentViewID}/${currentModule}`);
        onValue(resultsDB, (snapshot) => {
          if (snapshot.exists()) {
            const marks = snapshot.val(); 
            //Fetch student marks and display them in the table
            setTest1Semester1(marks.t1s1);setTest2Semester1(marks.t2s1);setExamSemester1(marks.es1);
            setTest1Semester2(marks.t1s2);setTest2Semester2(marks.t2s2);setExamSemester2(marks.es2);
            setTest1Semester3(marks.t1s3);setTest2Semester3(marks.t2s3);setExamSemester3(marks.es3);
          }})
    } }

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleSaveClick = () => {
      const resultsDB = ref(getDatabase(), `Results/${studentID}/${currentModule}`);
      const userResults = {
        t1s1: test1Semester1,t2s1: test2Semester1,es1: examSemester1,
        t1s2: test1Semester2,t2s2: test2Semester2,es2: examSemester2,
        t1s3: test1Semester3,t2s3: test2Semester3,es3: examSemester3,
      }
      set(resultsDB, userResults);
      setIsEditing(false);
    };

  if (!firebaseInitialized) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        {isAdmin &&
          <Card className='search-card'>
            <Card.Header as="h3">MyStudents results:</Card.Header>
            <Card.Body>
              <Card.Text>Enter your students' <b>First </b>and<b> Last name</b> to add, edit and save their modules results, using the search bar below:</Card.Text>
              <h3 className='mystudents-search-title'>MyStudent result search: </h3>
              <div className='mystudents-search-title'>
                <Form.Control type="text" placeholder="First name" style={{width: '30%', marginRight: '4px'}} value={fname} onChange={(e) => setFname(e.target.value)}/>
                <Form.Control type="text" placeholder="Last name" style={{width: '30%', marginLeft: '4px'}} value={lname} onChange={(e) => setLname(e.target.value)}/>
              </div> <br/>
              <div className='add-btn'><Button  variant="success" onClick={searchForStudent}>display student results</Button></div>
            </Card.Body>
          </Card> 
         }
        </div>
        
        <h4 className='student_name_result'> {studentDisplayedName} </h4>
        
        { allowResultTicket && (
        <div>
            <div className='dropdown'>
              <Dropdown onSelect={(value) => setCurrentModule(value)}>
                  <Dropdown.Toggle style={{ width: "200px", height: "50px", fontSize: "16px" }} variant="outline-primary" id="dropdown-basic">
                    Select a module
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "200px", fontSize: "16px" }}>
                    {myModules.map((module) => (
                      <Dropdown.Item key={module.id} eventKey={module.title}>{module.title}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
              </Dropdown>
            </div>

            {myModules.map((module) => (
              <div key={module.id}>
                {currentModule === module.title && (
                <Card className='table-graph-card' key={module.id}>
                  <Card.Header as="h3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{module.title}</Card.Header>
                  <Card.Body className='body' >
                    <div className='result-table'>
                      <Table bordered>
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
                      </Table>
                      <div className='buttons'>
                          {isAdmin && (<Button className='btn-edit' variant="primary" onClick={handleEditClick} disabled={isEditing}>Edit </Button>)}
                          {isAdmin && (<Button className='btn-save' variant="success" onClick={handleSaveClick} disabled={!isEditing}>Save</Button>)}
                      </div>
                  </div>
                  <div className='graph'>
                      <LineChart width={500} height={300} data={data}>
                        <Line dataKey="test1" stroke="#8884d8" />
                        <Line dataKey="test2" stroke="#82ca9d" />
                        <Line dataKey="exam" stroke="#ffc658" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Grades', angle: -90, position: 'insideLeft' }}/>
                        <Legend/>
                      </LineChart>
                  </div>
                  </Card.Body>
                </Card>
                )}
            </div>
            ))}
        </div>
          )}



        { !isAdmin && (
                <div>
                  <h3 className='student_name_result'> Welcome to your progress page</h3>
                  <h5 className='student_name_result_paragraph'> Please select the module you would like to view your progress on, using the dropdown below:</h5>
                    <div className='dropdown'>
                      <Dropdown onSelect={(value) => setCurrentModule(value)}>
                          <Dropdown.Toggle style={{ width: "200px", height: "50px", fontSize: "16px" }} variant="outline-primary" id="dropdown-basic">
                            Select a module
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ width: "200px", fontSize: "16px" }}>
                            {myModules.map((module) => (
                              <Dropdown.Item key={module.id} eventKey={module.title}>{module.title}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    {myModules.map((module) => (
                      <div key={module.id}>
                        {currentModule === module.title && (
                        <Card className='table-graph-card' key={module.id}>
                          <Card.Header as="h3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{module.title}</Card.Header>
                          <Card.Body className='body' >
                            <div className='result-table'>
                              <Table bordered>
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
                              </Table>
                              <div className='buttons'>
                                  {isAdmin && (<Button className='btn-edit' variant="primary" onClick={handleEditClick} disabled={isEditing}>Edit </Button>)}
                                  {isAdmin && (<Button className='btn-save' variant="success" onClick={handleSaveClick} disabled={!isEditing}>Save</Button>)}
                              </div>
                          </div>
                          <div className='graph'>
                              <LineChart width={500} height={300} data={data}>
                                <Line dataKey="test1" stroke="#8884d8" />
                                <Line dataKey="test2" stroke="#82ca9d" />
                                <Line dataKey="exam" stroke="#ffc658" />
                                <XAxis dataKey="name" />
                                <YAxis label={{ value: 'Grades', angle: -90, position: 'insideLeft' }}/>
                                <Legend/>
                              </LineChart>
                          </div>
                          </Card.Body>
                        </Card>
                        )}
                    </div>
                    ))}
                </div>
                  )}
    </div>
  );
}

export default Progress;
