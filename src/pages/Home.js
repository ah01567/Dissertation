import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase';
import Login from './Login';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import { ref, onValue } from 'firebase/database';

const Home = () => {

    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                const userRef = ref(db, `Admins/${auth.currentUser.uid}`);
                onValue(userRef, (snapshot) => {
                  const userData = snapshot.val();
                  if (userData && userData.admin) {
                    setIsAdmin(true);
                  }})
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
                
            <div>
                {isAdmin && <p>I am an admin</p>}
                {/* Add other content here */}
            </div>

            </nav>)}
        </div>
    )
}
 
export default Home