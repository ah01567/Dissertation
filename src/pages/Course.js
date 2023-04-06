import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import GeneralKnowledgeTicket from '../components/GeneralKnowledgeTicket';
import { FaPlus } from 'react-icons/fa';
import '../Design/ModuleTicket.css';
import Modal from 'react-modal';
import '../Design/Modal.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from './firebase';
import { useEffect } from 'react';
import { onValue, off, ref, set } from 'firebase/database';


const Home = () => {

    const { currentUser, isAdmin, firebaseInitialized } = useAuth();
    const [showNewModuleSection, setShowNewModuleSection] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [moduleTitles, setModuleTitles] = useState([]);


    
    const addModule = (title, imagePath) => {
        const teacherID = currentUser.uid;
        const modulesRef = ref(db, `Modules/${teacherID}/${title}`);
        const moduleData = {
          title: title,
          image: imagePath,
        };
        set(modulesRef, moduleData);
    };

    useEffect(() => {
        // Listen for changes to the Modules collection in the realtime database
        const modulesRef = ref(db, 'Modules');
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

      
    if (!firebaseInitialized) {
        return <Spinner />;
      }
      
    return(       
        <div>
            <div><NavBar/></div>    

            <div className='modules-container'>
                {isAdmin && <button className="module-btn"  onClick={() => setShowNewModuleSection(true)}><FaPlus className="plus-icon" /></button>}
                <button className="module-btn" > <b>General Knowledge</b></button> 
                {moduleTitles.map(title => (
                    <button className="module-btn" key={title}><b>{title}</b></button>
                ))}
            </div>  

            <Modal isOpen={showNewModuleSection} onRequestClose={() => setShowNewModuleSection(false)} className="modal-container" overlayClassName="modal-overlay">
                <h2>Create New Module</h2>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.elements.title.value;
                    addModule(title, imagePath);
                    setShowNewModuleSection(false);
                }}>
                    <label>
                        <h5>Module title:</h5> <Form.Control type="text" name="title" placeholder="Module name .."/>
                    </label> <br/>
                    <label className="upload-img">
                        <h5>Module Image:</h5> <input type="file" name="image" accept="image/*" onChange={(e) => setImagePath(e.target.value)}/>
                    </label>
                    <div className="button-group">
                        <Button className='cancel-btn' variant="danger" onClick={() => setShowNewModuleSection(false)}>Cancel</Button>
                        <Button className='add-btn' variant="success" type="submit">Add Module</Button>
                    </div>
                </Form>
            </Modal>

            <div className='module-tickets'>
                <GeneralKnowledgeTicket/>
            </div>
        </div>
    )
}
 
export default Home