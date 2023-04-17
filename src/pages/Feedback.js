import React from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";

const Feedback = () => {
    const { currentUser, isAdmin, firebaseInitialized } = useAuth();

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div> <NavBar /> </div>      
                
            <div> <p>Feedback form here...</p> </div>
        </div>
    )
}
 
export default Feedback;