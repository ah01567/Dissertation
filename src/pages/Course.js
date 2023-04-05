import React from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import GeneralKnowledgeTicket from '../components/GeneralKnowledgeTicket';

const Home = () => {
    const { firebaseInitialized } = useAuth();
    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div><NavBar/></div>      
            <div className='module-tickets'>
                <GeneralKnowledgeTicket/>
            </div>
        </div>
    )
}
 
export default Home