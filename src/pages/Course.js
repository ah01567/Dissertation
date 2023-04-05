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


const Home = () => {

    const { firebaseInitialized } = useAuth();
    const [showNewModuleSection, setShowNewModuleSection] = useState(false);

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div><NavBar/></div>    

            <div className='module'>
                <button className="upload-btn" onClick={() => setShowNewModuleSection(true)}><FaPlus className="plus-icon" /></button>
                <button className="upload-btn"> <b>General Knowledge</b></button> 
            </div>  

            <Modal isOpen={showNewModuleSection} onRequestClose={() => setShowNewModuleSection(false)} className="modal-container" overlayClassName="modal-overlay">
                <h2>Create New Module</h2>
                <Form>
                    <label>
                        <h5>Module title:</h5> <Form.Control type="text" placeholder="Module name .."/>
                    </label> <br/>
                    <label className="upload-img">
                        <h5>Module Image:</h5> <input type="file" accept="image/*" />
                    </label>
                    <div className="button-group">
                        <Button className='cancel-btn' variant="danger" onClick={() => setShowNewModuleSection(false)}>Cancel</Button>
                        <Button className='add-btn' variant="success">Add Module</Button>
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