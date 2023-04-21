import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FaPaperPlane } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/Chatbox.css';

export default function App() {
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
                  <h3>Welcome to MyOnlyBook ChatBox <FaRocketchat/></h3>
                </div>
                <div className="d-flex flex-row justify-content-start">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      Hi
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      How are you ...???
                    </p>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      What are you doing tomorrow? Can we come up a bar?
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                      23:58
                    </p>
                  </div>
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
              ></input>
                <button className="btn ml-3">
                  <FaPaperPlane />
                </button>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

