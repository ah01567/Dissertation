import React from 'react';
import Login from './Login';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import BookSearch from '../components/SearchEngine/BookSearch';
import BookDisplay from '../components/SearchEngine/BookDisplay';

const Home = () => {
    const { currentUser, firebaseInitialized } = useAuth();

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            {!currentUser ? (<div><Login /></div>) : (            
            <div> 
                <NavBar />
                <BookSearch /> 
                <BookDisplay />
            </div>
            )}
        </div>
    )
}
 
export default Home