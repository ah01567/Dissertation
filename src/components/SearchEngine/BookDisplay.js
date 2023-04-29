import React from 'react';
import '/Users/ahmedhenine/Desktop/myonlybook/src/Design/SearchEngine.css';

const BookSearch = () => {
 
    return(
      <div className='result-container'>
        <div className='result-section' style={{ width: '70%', borderRadius: '30px' }} >
          <h5>Results</h5>
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <i className='fa fa-cog'></i>
        </div>
        </div>
      </div>
    )
}
 
export default BookSearch