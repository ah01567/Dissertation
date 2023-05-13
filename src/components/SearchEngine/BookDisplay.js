import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillFastForwardFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/SearchEngine.css';

const BookSearch = () => {
 
    return(
      <div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic"> Filter result </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.ItemText href="#/action-1"><b>Price</b></Dropdown.ItemText>
                <Dropdown.Item href="">High to Low</Dropdown.Item>
                <Dropdown.Item href="">Low to High</Dropdown.Item>
                <Dropdown.ItemText href="#/action-1"><b>Delivery</b></Dropdown.ItemText>
                <Dropdown.Item href="#/action-3">Deliverable books </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='result-container'>
            <div className='result-section' style={{ width: '70%', display: 'flex', flexWrap: 'wrap', borderRadius: '70px'}}>
              <Card className='book-ticket' style={{ width: '34%' }}>
                  <div style={{ maxHeight: '300px', overflow: 'hidden' }}>
                    <Card.Img variant="top" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSP0lfdphbLOAeg4eeObzv3gx2af_qFwnFW9Zxbn7fi7X4NfHzLlFxSB8XI6Q0q45BaUTjyXbxfsdlK0KZ2iCVC3YJntSotsBp8qB87Rri1sdfs2aC215aV&usqp=CAc" />
                  </div>
                  <Card.Body>
                    <Card.Title>Price: 5£</Card.Title>
                    <Card.Title>Delivery: 4 - 7 days</Card.Title>
                    <Button variant="primary" className='learn-more-btn'>Learn more <BsFillFastForwardFill/></Button>
                  </Card.Body>
              </Card>
              <Card className='book-ticket' style={{ width: '34%' }}>
                  <div style={{ maxHeight: '300px', overflow: 'hidden' }}>
                    <Card.Img variant="top" src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqb1jMHyoHrKSbmF1QaMkGqbVZtkAdGAXqHjyQhFoazWrceD7jRdnR5_3GtNZ7Ahzpw-iyjEH9wdPFD8916NX_e6GSACRMPRsSJ20SoqY7rnJxXM_-Z9NK&usqp=CAc" />
                  </div>
                  <Card.Body>
                    <Card.Title>Price: 5£</Card.Title>
                    <Card.Title>Delivery: 4 - 7 days</Card.Title>
                    <Button variant="primary" className='learn-more-btn'>Learn more <BsFillFastForwardFill/></Button>
                  </Card.Body>
              </Card>
              <Card className='book-ticket' style={{ width: '34%' }}>
                  <div style={{ maxHeight: '300px', overflow: 'hidden' }}>
                    <Card.Img variant="top" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSP0lfdphbLOAeg4eeObzv3gx2af_qFwnFW9Zxbn7fi7X4NfHzLlFxSB8XI6Q0q45BaUTjyXbxfsdlK0KZ2iCVC3YJntSotsBp8qB87Rri1sdfs2aC215aV&usqp=CAc" />
                  </div>
                  <Card.Body>
                    <Card.Title>Price: 5£</Card.Title>
                    <Card.Title>Delivery: 4 - 7 days</Card.Title>
                    <Button variant="primary" className='learn-more-btn'>Learn more <BsFillFastForwardFill/></Button>
                  </Card.Body>
              </Card>
              <Card className='book-ticket' style={{ width: '34%' }}>
                  <div style={{ maxHeight: '300px', overflow: 'hidden' }}>
                    <Card.Img variant="top" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSP0lfdphbLOAeg4eeObzv3gx2af_qFwnFW9Zxbn7fi7X4NfHzLlFxSB8XI6Q0q45BaUTjyXbxfsdlK0KZ2iCVC3YJntSotsBp8qB87Rri1sdfs2aC215aV&usqp=CAc" />
                  </div>
                  <Card.Body>
                    <Card.Title>Price: 5£</Card.Title>
                    <Card.Title>Delivery: 4 - 7 days</Card.Title>
                    <Button variant="primary" className='learn-more-btn'>Learn more <BsFillFastForwardFill/></Button>
                  </Card.Body>
              </Card>
            </div>
        </div>
       </div>
    )
}
 
export default BookSearch