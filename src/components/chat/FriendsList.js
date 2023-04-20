import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/Chatbox.css';

const FriendsList = () => {
  return (
    <ListGroup className="friends-list" style={{marginBottom:'20px'}}>
      <ListGroup.Item>Friend 1</ListGroup.Item>
      <ListGroup.Item>Friend 2</ListGroup.Item>
      <ListGroup.Item>Friend 3</ListGroup.Item>
    </ListGroup>
  );
};

export default FriendsList;
