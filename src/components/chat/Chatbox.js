import React, { useState } from "react";
import CryptoJS from 'crypto-js';
import useAuth from "/Users/ahmedhenine/Desktop/myonlybook/src/pages/CurrentUser.js";
import { db } from '/Users/ahmedhenine/Desktop/myonlybook/src/pages/firebase.js';
import { ref, set } from 'firebase/database';
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


const ChatBox = ({ receiverID, receiverName, previousMessages }) => {

  const { currentUser } = useAuth();
  const currentUserUID = currentUser?.uid;
  const [message, setMessage] = useState('');

  // Encrypt messages using CryptoJS AES method
  // Push messages into DB
  const sendMessage = () => {
      const senderID = currentUser?.uid;
      const timestamp = new Date().getTime();
    
      const chatDB1 = ref(db, `Chat/${senderID}/${receiverID}/${timestamp}`) 
      const chatDB2 = ref(db, `Chat/${receiverID}/${senderID}/${timestamp}`) 
    
      var key = CryptoJS.enc.Utf8.parse('1234567887654321');
      var iv = CryptoJS.enc.Utf8.parse('1234567887654321');
    
      var encryptedMessage = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), key, 
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      const messageDetails = {
        sender: senderID,
        message: encryptedMessage.toString(), // Store the encrypted message
      };
    
      if(message !== '') {
        set(chatDB1, messageDetails);
        set(chatDB2, messageDetails);
        setMessage('');
      }
  }

  return receiverID && receiverName ? (
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
            <h5 className="flex-grow-1">{receiverName}</h5>
          </div>
          <FaVideo size={32}/>
            </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex p-3" style={{display: 'flex', justifyContent: 'center'}}>
                  <h3>Welcome to MyOnlyBook ChatBox <BsChatDots/></h3>
                </div>
                <div>
                  <div>
                  {previousMessages.map((messageObj, index) => (
                    <div
                      key={index}
                      className={messageObj.senderID === currentUserUID ? 'd-flex flex-row justify-content-end p-2 ms-3 mb-1 rounded-3' : 'd-flex flex-row justify-content-start p-2 ms-3 mb-1 rounded-3'}
                    >
                      <div
                        className="rounded-3"
                        style={{
                          backgroundColor: messageObj.senderID === currentUserUID ? "#f5f6f7" : "greenyellow",
                          padding: '7px'
                        }}
                      >
                        {messageObj.message}
                      </div>
                    </div>
                  ))}
                  </div>
                  {/* <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  /> */}
                </div>

              </MDBCardBody>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3" style={{position:'fixed', bottom:'0',width: "calc(100% - 30%)"}}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                alt="avatar 3"
                style={{ width: "45px", height: "100%", marginRight:'10px' }}
              />
              <input
                type="text"
                class="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Type your message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></input>
                <button className="btn ml-3" onClick={sendMessage}>
                  <FaPaperPlane />
                </button>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  ) : null;
}

export default ChatBox; 