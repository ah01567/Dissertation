import React from 'react';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import useAuth from "./CurrentUser";
import Uploadmodulecontent from '../components/Uploadmodulecontent';

const Module = () => {
    const {firebaseInitialized } = useAuth();

    if (!firebaseInitialized) {
        return <Spinner />;
      }
 
    return(
        <div>
            <div>
                <NavBar />
            </div>    
            <div>
                <h1>Arbic:</h1>
                <Uploadmodulecontent />
            </div>
        </div>
    )
}
 
export default Module;