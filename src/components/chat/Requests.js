import { useState, useEffect } from "react";
import useAuth from "/Users/ahmedhenine/Desktop/myonlybook/src/pages/CurrentUser.js";
import { ref, onValue, get, set, remove } from "firebase/database";
import { db } from '/Users/ahmedhenine/Desktop/myonlybook/src/pages/firebase.js';
import { ListGroup, Button } from "react-bootstrap";

const Requests = () => {
  const { currentUser } = useAuth();
  const [userNames, setUserNames] = useState([]);
  const currentUserID = currentUser?.uid;

  useEffect(() => {
    const dbRef = ref(db, "Requests");
    onValue(dbRef, async (snapshot) => {
      if (snapshot.exists() && snapshot.child(currentUserID).exists()) {
        const userIds = Object.keys(snapshot.child(currentUserID).val());
        const userNames = await Promise.all(
          userIds.map(async (uid) => {
            const userRef = ref(db, `Users/${uid}`);
            const userSnapshot = await get(userRef);
            const userData = userSnapshot.val();
            return { id: uid, name: `${userData.fname} ${userData.lname}` };
          })
        );
        setUserNames(userNames);
      } else {
        setUserNames([]);
      }
    });
  }, [currentUserID]);

  const handleAccept = (id, name) => {
    const friendRef = ref(db, `Friends/${currentUserID}/${id}`);
    const friendRefReverse = ref(db, `Friends/${id}/${currentUserID}`); // add reverse friend reference
    set(friendRef, { name, status: "accepted" }).then(() => {
      // add reverse friend reference with same name and status
      set(friendRefReverse, { name, status: "accepted" }).then(() => {
        const requestRef = ref(db, `Requests/${currentUserID}/${id}`);
        remove(requestRef);
      });
    });
  };  

  const handleRefuse = (id) => {
    const requestRef = ref(db, `Requests/${currentUserID}/${id}`);
    remove(requestRef);
  };

  return (
    <ListGroup className="friends-requests-list">
      {userNames.map(({ id, name }) => (
        <ListGroup.Item key={id}>
          <div className="d-flex align-items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IxW0B9TzuWakKREpBVikX0Jbi4ahnAcfMdXedONE_w&s"
              alt="User profile"
              className="mr-3 rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="flex-grow-1">{name}</div>
            <Button
              variant="success"
              className="accept-btn mr-2 px-1"
              size="sm"
              onClick={() => handleAccept(id, name)}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              className="refuse-btn px-1"
              size="sm"
              onClick={() => handleRefuse(id)}
            >
              Refuse
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Requests;


