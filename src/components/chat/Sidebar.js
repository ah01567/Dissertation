import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './Searchbar';
import FriendsList from './FriendsList';
import Requests from './Requests';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/Chatbox.css';

const Sidebar = () => {
  return (
    <Container className="sidebar" style={{width:'30%'}}>
      <Row>
        <Col>
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Friends</h4> {/* Add the Friends title here */}
          <FriendsList />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Invitations & Requests</h4>
          <Requests />
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
