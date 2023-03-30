import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Login from './Login';
import NavBar from '../components/NavBar';
 
const Home = () => {

    const [currentUser, setCurrentUser] = useState(null);
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(false);
            }
          });
         
    }, [])

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
            </nav>)}
        </div>
    )
}
 
export default Home