import React, {useState, useEffect} from 'react';
import { db } from './firebase';
import { ref, remove} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import UploadLesson from '../components/course/UploadLesson';
import Button from 'react-bootstrap/Button';

const Module = () => {
    const { isAdmin, currentUser, firebaseInitialized } = useAuth();
    const [moduleName, setModuleName] = useState('');
    const [contentSections, setContentSections] = useState(1);
    const navigate = useNavigate();
  
    //Set the module title based on the moduleID in the URL path
    useEffect(() => {
      const path = window.location.pathname;
      const moduleName = decodeURI(path.split('/').pop());
      setModuleName(moduleName);
    }, []);
  
    // Delete the module from database and redirect users back to Course page when 'Deleted' button is clicked
    const handleDeleteModule = () => {
        const teacherID = currentUser.uid;
        const moduleRef = ref(db, `TeacherModules/${teacherID}/${moduleName}`);         
        remove(moduleRef)
          .then(() => {
            navigate('/course');
          })
          .catch((error) => {
            // Handle error, if any
            console.log('Error deleting module:', error);
        });
    };

    //Add a new lesson section when ' Add content section' button is clicked
    const handleAddSection = () => {
      setContentSections(contentSections + 1);
    };
  
    if (!firebaseInitialized) {
      return <Spinner />;
    }
  
    return (
      <div>
        <div>
          <h1>{moduleName}:</h1>
          {isAdmin && (
            <React.Fragment>
              <Button variant="danger" style={{marginRight:'5px'}} onClick={handleDeleteModule}>
                Delete module
              </Button>
              <Button variant="success" style={{marginLeft:'5px'}} onClick={handleAddSection}>
                Add content section
              </Button>
            </React.Fragment>
          )}
          {Array.from({ length: contentSections }, (_, index) => (
            <UploadLesson key={index} />
          ))}
        </div>
      </div>
    );
  };
 
export default Module;