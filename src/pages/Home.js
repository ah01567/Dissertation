import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Login from './Login';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';

const Home = () => {

    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(false);
            }
            setFirebaseInitialized(true);
          });
         
    }, [])

    if (!firebaseInitialized) {
        return <Spinner />;
      }

    return(
        <div>
            {!currentUser ? (
            <Login />
            ) : (            
            <nav>
                <div>
                    <NavBar />
                </div>
                
                <p>
                    Welcome Home {currentUser.email}
                </p>

                {currentUser && currentUser.customClaims && currentUser.customClaims.admin && ( // Conditional rendering based on custom claims
                <div>
                    <p>Iam an ADMIN !!!!</p>
                </div>
                )}
            </nav>)}
        </div>
    )
}
 
export default Home