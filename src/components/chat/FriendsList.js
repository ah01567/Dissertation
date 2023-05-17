import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import useAuth from "/Users/ahmedhenine/Desktop/myonlybook/src/pages/CurrentUser.js";
import { ListGroup } from 'react-bootstrap';
import { db } from '/Users/ahmedhenine/Desktop/myonlybook/src/pages/firebase.js';
import { ref, onValue, get } from 'firebase/database';
import { NavLink } from 'react-router-dom';
import ChatBox from './Chatbox';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useAuth();

  const [receiverName, setReceiverName] = useState('');
  const [receiverID, setReceiverID] = useState(''); 
  const [previousMessages, setPreviousMessages] = useState([]);

  // Fetch users from 'Friends' DB and display them 
  useEffect(() => {
    const currentUserID = currentUser?.uid;
    const dbRef = ref(db, `Friends/${currentUserID}`);
    onValue(dbRef, async (snapshot) => {
      if (snapshot.exists()) {
        const friendIds = Object.keys(snapshot.val());
        const friendData = await Promise.all(
          friendIds.map(async (uid) => {
            const userRef = ref(db, `Users/${uid}`);
            const userSnapshot = await get(userRef);
            const userData = userSnapshot.val();
            return {
              id: uid,
              fname: userData.fname,
              lname: userData.lname,
            };
          })
        );
        setFriends(friendData);
      }
    });
  }, [currentUser]);

  // When clicking on a Friend ticket ...
  function handleFriendClick(id, fname, lname) {
    setReceiverID(id);
    setReceiverName(`${fname} ${lname}`);
  }

  // Decrypt, using Cryptojs AES and Fetch all previous messages
    useEffect(() => {
      if (receiverID) {
        setPreviousMessages([]);
        const currentUserID = currentUser?.uid;
        const chatRef = ref(db, `Chat`);

        onValue(chatRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.key === currentUserID) {
              const senderChatRef = ref(db, `Chat/${currentUserID}`);
              onValue(senderChatRef, (senderSnapshot) => {
                senderSnapshot.forEach((receiverSnapshot) => {
                  if (receiverSnapshot.key === receiverID) {
                    const messages = [];
                    receiverSnapshot.forEach((messageSnapshot) => {
                      const message = messageSnapshot.val().message;
                      const whosSender = messageSnapshot.val().sender;

                      var key = CryptoJS.enc.Utf8.parse('1234567887654321');
                      var iv = CryptoJS.enc.Utf8.parse('1234567887654321');
                    
                      var decryptedMessage = CryptoJS.AES.decrypt(message, key, 
                      {
                        keySize: 128 / 8,
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                      });

                      const messageObj = {
                        message: CryptoJS.enc.Utf8.stringify(decryptedMessage),
                        senderID: whosSender
                      };
                      messages.push(messageObj);
                    });
                    setPreviousMessages(messages);
                  }
                });
              });
             }
          })
        });
      }
    }, [currentUser?.uid, receiverID]);
  
  

  return (
    <div>
    <ListGroup className="friends-list" style={{ marginBottom: '20px' }}>
      {friends.map(({ id, fname, lname }) => (
        <NavLink key={id} activeclassname="active">
        <ListGroup.Item key={id} onClick={() => {handleFriendClick(id, fname, lname);}}>
          <div className="d-flex align-items-center">
            <img
              src="data:image/png;base64,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"
              alt="User profile"
              className="mr-3 rounded-circle"
              style={{ width: '40px', height: '40px' }}
            />
            <div className="flex-grow-1">
              {fname} {lname}
            </div>
          </div>
        </ListGroup.Item>
        </NavLink>
      ))}
    </ListGroup>
    {receiverID && receiverName && <ChatBox receiverID={receiverID} receiverName={receiverName} previousMessages={previousMessages}/>}
  </div>
  );
};

export default FriendsList;

