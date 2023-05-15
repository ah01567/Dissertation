import React, { useState } from 'react';
import axios from 'axios';
import BookDisplay from './BookDisplay';
import Spinner from '../Spinner';
import Form from 'react-bootstrap/Form';
import { BsSearch } from 'react-icons/bs';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/SearchEngine.css';

const BookSearch = () => {
 
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
          setLoading(true); // Set loading to true before making the request
          const response = await axios.get(
            `http://openlibrary.org/search.json?q=${searchTerm}&limit=20`
          );
          const filteredResults = response.data.docs.filter((book) => book.cover_i);
          setResults(filteredResults);
          console.log('Book search request successfully sent for', { searchTerm });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Set loading back to false after the request completes
        }
      };

    return(
        <div>
            <h1 className='mybook-search-title'>MyBook Search</h1>
            <div className='mybook-search-input'>
                <Form.Control id="book" type="text" placeholder="Search for your book here ..." style={{ width: '60%', borderRadius: '30px', height: '50px' }} onChange={(e) => setSearchTerm(e.target.value)}/>
                <BsSearch style={{ marginLeft: '-40px', fontSize:'25px' }} onClick={handleSearch}/>  
            </div>
            {loading ? (
                <Spinner animation='border' role='status' />
            ) : (
                <BookDisplay results={results} />
            )}
      </div>
    )
}
 
export default BookSearch