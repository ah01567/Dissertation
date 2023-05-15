import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import UploadLesson from '../components/course/UploadLesson';
import Button from 'react-bootstrap/Button';

const Module = () => {
    const { isAdmin, firebaseInitialized } = useAuth();
    const [moduleName, setModuleName] = useState('');
    const [contentSections, setContentSections] = useState(1);
  
    useEffect(() => {
      const path = window.location.pathname;
      const moduleName = decodeURI(path.split('/').pop());
      setModuleName(moduleName);
    }, []);
  
    const handleAddSection = () => {
      setContentSections(contentSections + 1);
    };
  
    if (!firebaseInitialized) {
      return <Spinner />;
    }
  
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div>
          <h1>{moduleName}:</h1>
          {isAdmin && (
            <React.Fragment>
              <Button variant="danger">Delete module</Button>
              <Button variant="success" onClick={handleAddSection}>
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