import React, { useEffect, useState } from 'react';
import { BsFillFastForwardFill } from "react-icons/bs";
import axios from 'axios';
import Filter from './Filter';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/SearchEngine.css';

const BookDisplay = ({ results }) => {

    if (!results) {
      return null; 
    }

    //Redirect users to the website to buy the book, using the ISBN code 
    const handleLearnMore = (book) => {
        const isbn = book.isbn ? book.isbn[0] : null;
        if (isbn) {
          const betterWorldBooksUrl = `https://www.betterworldbooks.com/product/detail/${isbn}`;
          window.open(betterWorldBooksUrl, '_blank');
        }
      };

    return(
      <div>
        {results && results.length !== 0 && <Filter /> }
        <div className='result-container'>
            <div className='result-section' style={{ width: '70%', display: 'flex', flexWrap: 'wrap', borderRadius: '70px'}}>
            {results.map((book) => (
              <Card key={book.key} className='book-ticket' style={{ width: '34%' }}>
                  <div style={{ maxHeight: '300px', overflow: 'hidden' }}>
                    <Card.Img variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} />
                  </div>
                  <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                    <Card.Title>Price: TBC</Card.Title>
                    <Card.Title>Delivery duration: TBC</Card.Title>
                    <Button
                      variant="primary"
                      className="learn-more-btn"
                      onClick={() => handleLearnMore(book)}
                      >
                      Learn more <BsFillFastForwardFill />
                    </Button>                  
              </Card.Body>
              </Card>
              ))}
            </div>
        </div>
      </div>
    )
}
 
export default BookDisplay;