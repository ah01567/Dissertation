import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/SearchEngine.css';

const Filter = () => {
 
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
       </div>
    )
}
 
export default Filter;