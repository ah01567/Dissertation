import React from 'react';
import Form from 'react-bootstrap/Form';
import { BsSearch } from 'react-icons/bs';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/SearchEngine.css';

const BookSearch = () => {
 
    return(
        <div>
            <h1 className='mybook-search-title'>MyBook Search</h1>
            <div className='mybook-search-input'>
                <Form.Control id="book" type="text" placeholder="Search for your book here ..." style={{ width: '60%', borderRadius: '30px', height: '50px' }} />
                <BsSearch style={{ marginLeft: '-40px', fontSize:'25px' }} />
            </div>
      </div>
    )
}
 
export default BookSearch