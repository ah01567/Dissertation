import React, { useState } from 'react';
import useAuth from "/Users/ahmedhenine/Desktop/myonlybook/src/pages/CurrentUser.js";
import { Form, InputGroup, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { db } from '/Users/ahmedhenine/Desktop/myonlybook/src/pages/firebase.js';
import { onValue, ref, set } from 'firebase/database';
import { ListGroup } from 'react-bootstrap';
import { BsPersonFillAdd } from "react-icons/bs";
import { BsFillForwardFill } from "react-icons/bs";
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/Chatbox.css';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [userFname, setUserFname] = useState('');
  const [userLname, setUserLname] = useState('');

  const { currentUser } = useAuth();
  const [addedUserID, setAddedUserID] = useState('');
  const [isrequestSent, setIsRequestSent] = useState(false);

  // Search for User by Email, then display for 'Add'
  const handleSubmit = async (event) => {
    event.preventDefault();

    const dbRef = ref(db, 'Users');
    onValue(dbRef, async (snapshot) => {
      if(snapshot.exists()) {
        await Promise.all(snapshot.forEach((uidSnapshot) => {
          const uid = uidSnapshot.key;
          const childData = uidSnapshot.val();
          if(childData.email === searchText) {
            setAddedUserID(uid);
            setUserFname(childData.fname);
            setUserLname(childData.lname);
          }
        }));
      }
    });
  }

  //Send current user to the added user 'Requests' section
  const sendToRequests = async (event) => {
    event.preventDefault();
    const currenntUserID = currentUser.uid; 

    const requestsDB = ref(db, `Requests/${addedUserID}/${currenntUserID}`);
    const currentUserinfoDB = ref(db, `Users/${currenntUserID}`);
    onValue(currentUserinfoDB, async (snapshot) => {
      const userData = snapshot.val();
      const currentUserInfo = {
        fname: userData.fname,
        lname: userData.lname,
      };
      set(requestsDB, currentUserInfo);
      setIsRequestSent(true);
    });
  }

  return (
    <div>
      <Form className='friends-search-bar'>
        <InputGroup>
          <Form.Control type="email" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by Email ..." />
          <Button variant="outline-secondary" onClick={handleSubmit}>
            <BsSearch />
          </Button>
        </InputGroup>
      </Form>

      {userFname &&
        <ListGroup className="friends-list" style={{marginBottom:'20px'}}>
          <ListGroup.Item style={{backgroundColor:'beige'}}>
            <div className="d-flex align-items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IxW0B9TzuWakKREpBVikX0Jbi4ahnAcfMdXedONE_w&s"
                alt="User profile"
                className="mr-3 rounded-circle"
                style={{ width: '40px', height: '40px' }}
              />
                <div className="flex-grow-1"><b>{userFname} {userLname}</b></div>

                <button  onClick={sendToRequests} style={{ border: 'none', backgroundColor: 'transparent' }}>
                  <div style={{ fontSize: '25px' }}>
                    {!isrequestSent ? ( <BsPersonFillAdd /> ) : (<BsFillForwardFill className="request-sent-icon"/> )} 
                  </div>
                </button>
              </div>
          </ListGroup.Item>
      </ListGroup>
      }
    </div>
  );
};

export default SearchBar;
