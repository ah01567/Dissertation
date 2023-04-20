import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/Chatbox.css';

const SearchBar = () => {
  return (
    <Form className='friends-search-bar'>
      <InputGroup>
        <Form.Control type="text" placeholder="Add new friends ..." />
        <Button variant="outline-secondary">
          <BsSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
