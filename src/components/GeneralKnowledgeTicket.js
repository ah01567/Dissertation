import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import '../Design/Course.css';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import axios from 'axios';


const GeneralKnowledge = () => {

    const algeriaLocation = { lat: 31.0339, lng: 1.6596 };
    const [searchTerm, setSearchTerm] = useState('');
    const [countryInfo, setCountryInfo] = useState(null);
    const [resultAvailable, setResultAvailable] = useState(false);

    useEffect(() => {
        if (resultAvailable) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [resultAvailable]);

    return (
        <div>
            <div className='module-card'>
            <Card>
                <div className='module-title'><h2>General Knowledge</h2></div>
                <Card.Body className='module-intro'><h5>On your <b>free time</b>, expand your Knowledge by exploring the following fun tools:</h5></Card.Body>
                <div className='module-intro'><h5>Learn about the world's countries using the map and the search bar below:</h5></div>

                <div className='module-content'>
                <Card>
                    <Card.Body className='country-props'>
                        <div >
                            <LoadScript
                            googleMapsApiKey="AIzaSyA5FmLP2cYqNQH8hEtmp3-r6_U7hjFHTI4"
                            >
                            <GoogleMap 
                                mapContainerStyle={{ height: "400px", width: "100%" }}
                                center={{ lat: 30.397, lng: 30.144 }}
                                zoom={3.2}
                            >
                            <Marker position={algeriaLocation} />
                            </GoogleMap>
                            </LoadScript>
                        </div>
                            <h3 class='country-search-title'>Country search: </h3> 
                            <div className='country-search-bar'><Form.Control type="text" placeholder="Search for any country of your choice ..." style={{width: "60%"}}   value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/> 
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                                onClick={async () => {
                                    try {
                                    const response = await axios.get(`https://restcountries.com/v2/name/${searchTerm}`);
                                    setCountryInfo(response.data[0]);
                                    setResultAvailable(true);
                                    } catch (error) {
                                    console.error(error);
                                    }
                                }}
                            >
                                <FaSearch />
                            </Button>
                            </div>
                            {resultAvailable && (
                                <div className='country-search-result'>    
                                    <lu>
                                    <img src={countryInfo?.flag} alt="Flag" style={{marginBottom: '10px', width: "200px", height: "100px", display: 'flex', aliz: 'center'}} />
                                    <li><b>Country:</b> {countryInfo?.name}</li>
                                    <li><b>Capital:</b> {countryInfo?.capital}</li>
                                    <li><b>Continent:</b> {countryInfo?.region}</li>
                                    <li><b>Surface:</b> {countryInfo?.area} km²</li>
                                    <li><b>Language:</b> {countryInfo?.languages[0].name}</li>
                                    <li><b>Population:</b> {countryInfo?.population}</li>
                                    </lu> 
                                </div>   
                            )}                 
                    </Card.Body>
                </Card>
                </div>
            </Card>
            </div>
        </div>
    );
  }

export default GeneralKnowledge;
