import React from 'react';
import Login from './Login';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";

const Home = () => {
    const { currentUser, isAdmin, firebaseInitialized } = useAuth();

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            {!currentUser ? (
                <div><Login /></div>
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