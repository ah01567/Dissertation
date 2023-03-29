import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
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

    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
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

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>)}
        </div>
    )
}
 
export default Home