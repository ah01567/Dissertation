import React, { useEffect, useState } from "react";
import useAuth from "/Users/ahmedhenine/Desktop/myonlybook/src/pages/CurrentUser.js";
import { db } from '/Users/ahmedhenine/Desktop/myonlybook/src/pages/firebase.js';
import { onValue, off, get, ref, set } from 'firebase/database';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { FaPaperPlane } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/Chatbox.css';

const ChatBox = () => {

  const { currentUser } = useAuth();
  const [previousMessages, setPreviousMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  // Fetch all previous messages
  const loadChat = () => {
    const currentUserID = currentUser?.uid;
    const receiverID = "receiverUserID"; // replace with the actual receiver's user ID
    const chatRef = ref(db, `Chat/${currentUserID}/${receiverID}`);
    
    onValue(chatRef, snapshot => {
      const messages = [];
      snapshot.forEach(childSnapshot => {
        const message = childSnapshot.val().message;
        messages.push(message);
      });
      setPreviousMessages(messages);
    });
  };

  // Push messages into DB
  const sendMessage = () => {
    const senderID = currentUser?.uid;
    const receiverID = "receiverUserID"; // replace with the actual receiver's user ID
    const timestamp = new Date().getTime();

      const chatDB = ref(db, `Chat/${senderID}/${receiverID}/${timestamp}`) 
        const messageDetails = {
          sender: senderID,
          message: message,
      };
      set(chatDB, messageDetails);
      setMessage('');
    }
  

  return (
    <div>
      <MDBRow className="d-flex">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard className="chat-card" id="chat2" style={{width: "calc(100% - 30%)", height:'100%', position:'fixed', right:'0', top:'4%', borderRadius:'20px'}}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IxW0B9TzuWakKREpBVikX0Jbi4ahnAcfMdXedONE_w&s"
            alt="User profile"
            className="mr-3 rounded-circle"
            style={{ width: '40px', height: '40px' }}
          />
            <h5 className="flex-grow-1">Emma Greenwood</h5>
          </div>
          <FaVideo size={32}/>
            </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex p-3" style={{display: 'flex', justifyContent: 'center'}}>
                  <h3>Welcome to MyOnlyBook ChatBox <BsChatDots/></h3>
                </div>
                <div className="d-flex flex-row justify-content-end p-2 ms-3 mb-1">
                  <div>
                  {previousMessages.map((message, index) => (
                    <p
                      key={index}
                      className=" p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7"}}
                    >
                      {message}
                    </p>
                  ))}
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

              </MDBCardBody>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3" style={{position:'fixed', bottom:'0', width:'100%', width: "calc(100% - 30%)"}}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                alt="avatar 3"
                style={{ width: "45px", height: "100%", marginRight:'10px' }}
              />
              <input
                type="text"
                class="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Type message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></input>
                <button className="btn ml-3" disabled={!message} onClick={sendMessage}>
                  <FaPaperPlane />
                </button>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default ChatBox; 