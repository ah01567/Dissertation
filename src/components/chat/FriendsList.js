import React, { useState, useEffect } from 'react';
import useAuth from "/Users/ahmedhenine/Desktop/myonlybook/src/pages/CurrentUser.js";
import { ListGroup } from 'react-bootstrap';
import { db } from '/Users/ahmedhenine/Desktop/myonlybook/src/pages/firebase.js';
import { ref, onValue, get } from 'firebase/database';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useAuth();

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

  return (
    <ListGroup className="friends-list" style={{ marginBottom: '20px' }}>
      {friends.map(({ id, fname, lname, status }) => (
        <ListGroup.Item key={id}>
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
      ))}
    </ListGroup>
  );
};

export default FriendsList;

