import React, { useState, useEffect } from 'react';
import useAuth from "./CurrentUser";
import Spinner from '../components/Spinner';
import NavBar from '../components/NavBar';
import { db } from './firebase';
import { onValue, off, get, ref, set } from 'firebase/database';
import { Form, Button, FormControl } from 'react-bootstrap';


function Chat() {
    
  const { currentUser, firebaseInitialized } = useAuth();

  if (!firebaseInitialized) {
    return <Spinner />;
  }
  return (
    <div>
        <div><NavBar/></div>  
        <div>
        </div>
    </div>
  );
}

export default Chat; 
