import React from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import ModuleTicket from '../components/ModuleTicket';

const Home = () => {
    const { firebaseInitialized } = useAuth();
    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div><NavBar/></div>      
            <div className='module-tickets'>
                <ModuleTicket/>
            </div>
        </div>
    )
}
 
export default Home