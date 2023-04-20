import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/Chatbox.css';

const Requests = () => {
  return (
    <ListGroup className="friends-requests-list">
      <ListGroup.Item>
        <div className="d-flex align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IxW0B9TzuWakKREpBVikX0Jbi4ahnAcfMdXedONE_w&s"
            alt="User profile"
            className="mr-3 rounded-circle"
            style={{ width: '40px', height: '40px' }}
          />
            <div className="flex-grow-1">Emma Greenwood</div>
              <Button variant="success" className="accept-btn mr-2 px-1">Accept</Button>
              <Button variant="danger" className="refuse-btn px-1">Refuse</Button>
          </div>
        </ListGroup.Item>
    </ListGroup>
  );
};

export default Requests;
