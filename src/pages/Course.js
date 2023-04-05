import React from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import GeneralKnowledgeTicket from '../components/GeneralKnowledgeTicket';
import { FaPlus } from 'react-icons/fa';
import '../Design/ModuleTicket.css';
const Home = () => {
    const { firebaseInitialized } = useAuth();
    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div><NavBar/></div>    
            <div className='module'>
                <button className="upload-btn"><FaPlus className="plus-icon" /></button>
                <button className="upload-btn"> <b>General Knowledge</b></button> 
                <button className="upload-btn"> <b>Maths</b></button> 
            </div>  
            <div className='module-tickets'>
                <GeneralKnowledgeTicket/>
            </div>
        </div>
    )
}
 
export default Home