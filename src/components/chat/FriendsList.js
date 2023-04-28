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
        <NavLink key={id} activeClassName="active">
        <ListGroup.Item key={id} onClick={() => {handleFriendClick(id, fname, lname);}}>
          <div className="d-flex align-items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IxW0B9TzuWakKREpBVikX0Jbi4ahnAcfMdXedONE_w&s"
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

