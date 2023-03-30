import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../pages/firebase';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import '../design/Navbar.css';
import { FaHome } from 'react-icons/fa';
import { FaBook } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";

function ColorSchemesExample() {

  const navigate = useNavigate(); 

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

  return (
      <Navbar ClassName="navbar" variant="dark" >
        <Container>
          <Navbar.Brand href="/" className='NavLogoWithMargin' style={{fontSize: '1.5rem'}}>MyOnlyBook</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/" className='NavItemWithMargin'> <FaHome size={20}/> Home</Nav.Link>
                <Nav.Link href="/" className='NavItemWithMargin'> <FaBook/> Course</Nav.Link>
                <Nav.Link href="/" className='NavItemWithMargin'><FaRocketchat/> ChatBox</Nav.Link>
                <Nav.Link href="/" className='NavItemWithMargin'> <FaChartLine/> Progress</Nav.Link>
                <Nav.Link href="/" className='NavItemWithMargin'> <FaWpforms/> Feedback</Nav.Link>
                <NavDropdown title="User" id="navbarScrollingDropdown" >
                    <NavDropdown.Item href="/">Profile settings</NavDropdown.Item>
                    <NavDropdown.Item href="/">Privacy policy</NavDropdown.Item>
                    <NavDropdown.Item href="/">Contact Us</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={handleLogout}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
      </Navbar>
  );
}

export default ColorSchemesExample;