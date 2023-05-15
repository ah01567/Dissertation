import React from 'react';
import useAuth from "./CurrentUser";
import Spinner from '../components/Spinner';
import NavBar from '../components/NavBar';
import Sidebar from '../components/chat/Sidebar';
import Chatbox from '../components/chat/Chatbox';

function Chat() {
    
  const { currentUser, firebaseInitialized } = useAuth();

  if (!firebaseInitialized) {
    return <Spinner />;
  }
  return (
    <div>
        <div><NavBar/></div>
        <div><Sidebar /></div>
        <div><Chatbox /></div>
    </div>
  );
}

export default Chat; 
