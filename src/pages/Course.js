import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import GeneralKnowledgeTicket from '../components/GeneralKnowledgeTicket';
import { FaPlus } from 'react-icons/fa';
import '../Design/Course.css';
import Modal from 'react-modal';
import '../Design/Course.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from './firebase';
import { onValue, off, get, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';


const Course = () => {

    const { currentUser, isAdmin, firebaseInitialized } = useAuth();
    const [showNewModuleSection, setShowNewModuleSection] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [moduleTitles, setModuleTitles] = useState([]);
    const [displayedModules, setDisplayedModules] = useState([]);
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    
    //When Teacher adds a module, check if it exists already. If so, raise an Error
    // Otherwise, add it to 'TeacherModules' DB
    // Then add that module to my students in 'StudentModules' db
    const addModule = (title, imagePath) => {
        const teacherID = currentUser.uid;
        const modulesRef = ref(db, `TeacherModules/${teacherID}/${title}`);
        const moduleData = {
          title: title,
          image: imagePath,
        };

        const myStudentsRef = ref(db, `MyStudents`);
        let isMyStudentsEmpty = true;

        const StudentmodulesStudents = ref(db, `StudentModules`); 

        // Check if the module already exists
        const existingModule = moduleTitles.find((module) => module.toLowerCase() === title.toLowerCase());
        if (existingModule) {
          // If the module already exists, set the error message state variable
          setError('Module already exists');
          setShowNewModuleSection(true);
        } else {
          // If the module does not exist, add it to the database
          set(modulesRef, moduleData);
          // Check if 'StudentModules' db exists. If yes, add this modules to each student there
          const studentModulesRef = ref(db, 'StudentModules');
          get(studentModulesRef).then((snapshot) => {
            if (snapshot.exists()) {
              // If the database exists, add the module to each student in the database
              const student = snapshot.val();
              for (const studentID in student) {
                const studentRef = ref(db, `StudentModules/${studentID}/${title}`);
                set(studentRef, moduleData);
              }
            }
          });

          setShowNewModuleSection(false);
          setError(false);
        }
      };

      // Listen to 'eacherModule' DB changes, when a module is added ...
      // Add them to moduleTitles to display them later on the Course page
      useEffect(() => {
          // Listen for changes to the Modules collection in the realtime database
          const modulesRef = ref(db, 'TeacherModules');
          if (modulesRef) {
            onValue(modulesRef, (snapshot) => {
              const modulesData = snapshot.val();
              if (modulesData) {
                // Convert the modules data to an array of objects with title and id properties
                const modulesList = Object.keys(modulesData).map((teacherID) => {
                  const teacherModules = modulesData[teacherID];
                  return Object.keys(teacherModules).map((title) => {
                    return {
                      id: `${teacherID}-${title}`,
                      title,
                    };
                  });
                }).flat();
                setModuleTitles(modulesList.map(module => module.title));
              }
            });
          }
          // Cleanup function to remove the listener when the component unmounts
          return () => {
            if (modulesRef) {
              off(modulesRef);
            }
          };
        }, []);

        // useEffect(() => {
        //   // Set the reference to the correct database based on whether the user is an admin or not
        //   const userID = currentUser?.uid;
        //   const modulesRef = isAdmin
        //     ? ref(db, `TeacherModules/${userID}`)
        //     : ref(db, `StudentModules/${userID}`);
      
        //   // Attach a listener to the database reference to retrieve the module titles
        //   onValue(modulesRef, (snapshot) => {
        //     if (snapshot.exists()) {
        //       // If the data exists, retrieve the module titles and set them in state
        //       const moduleTitlesObject = snapshot.val();
        //       const moduleTitlesArray = Object.keys(moduleTitlesObject);
        //       setDisplayedModules(moduleTitlesArray);
        //     } else {
        //       // If the data doesn't exist, clear the module titles from state
        //       setDisplayedModules([]);
        //     }
        //   });
      
        //   // Detach the listener when the component unmounts
        //   return () => {
        //     off(modulesRef);
        //   };
        // }, []);
        useEffect(() => {
          const userID = currentUser?.uid;
          const modulesRef = isAdmin ? ref(db, `TeacherModules/${userID}`)
                                     : ref(db, `StudentModules/${userID}`);
          
          onValue(modulesRef, (snapshot) => {
            if (snapshot.exists()) {
               const moduleTitlesObject = snapshot.val();
               const moduleTitlesArray = Object.keys(moduleTitlesObject);
               setDisplayedModules(moduleTitlesArray);
            } else {
              // If the data doesn't exist, clear the module titles from state
                setDisplayedModules([]);
              }
          })
        })

        if (!firebaseInitialized) {
            return <Spinner />;
          }
      
    return(       
        <div>
            <div><NavBar/></div>    

            <div className='modules-container'>
                {isAdmin && <button className="module-btn"  onClick={() => setShowNewModuleSection(true)}><FaPlus className="plus-icon" /></button>}
                {displayedModules.map(title => (
                    <button className="module-btn" key={title} onClick={() => navigate(`/course/${title}`, { state: { title } })} ><b>{title}</b></button>
                ))}
            </div>  

            <Modal isOpen={showNewModuleSection} onRequestClose={() => setShowNewModuleSection(false)} className="modal-container" overlayClassName="modal-overlay">
                <h2>Create New Module</h2>
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.elements.title.value;
                    addModule(title, imagePath);
                }}>
                    <label>
                        <h5>Module title:</h5> <Form.Control type="text" name="title" placeholder="Module name .." required/>
                    </label> <br/>
                    <label className="upload-img">
                        <h5>Module Image:</h5> <input type="file" name="image" accept="image/*" onChange={(e) => setImagePath(e.target.value)}/>
                    </label>
                    <div className="button-group">
                        <Button className='cancel-btn' variant="danger" onClick={() => {setShowNewModuleSection(false); setError();}}>Cancel</Button>
                        <Button className='add-btn' variant="success" type="submit">Add Module</Button>
                    </div>
                </Form>
            </Modal>

            <div>
                <GeneralKnowledgeTicket/>
            </div>
        </div>
    )
}
 
export default Course;