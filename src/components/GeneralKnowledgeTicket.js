import React from 'react';
import Card from 'react-bootstrap/Card';
import '../Design/ModuleTicket.css';

const GeneralKnowledge = () => {
    return (
        <div>
            <div className='module-card'>
            <Card>
                <div className='module-title'><h2>General Knowledge</h2></div>
                <Card.Body className='module-intro'><h5>On your <b>free time</b>, expand your Knowledge by exploring the following fun tools</h5></Card.Body>
                <div className='module-intro'><h5>Learn about the world's countries using the map below:</h5></div>

                <div className='module-content'>
                <Card>
                    <Card.Body className='country-props'>
                        <lu>
                            <li><b>Country:</b> </li>
                            <li><b>Continent:</b> </li>
                            <li><b>Surface:</b> </li>
                            <li><b>Language:</b> </li>
                            <li><b>Population:</b> </li>
                        </lu>
                    </Card.Body>
                </Card>
                </div>
            </Card>
            </div>
        </div>
    );
  }
  

export default GeneralKnowledge;
