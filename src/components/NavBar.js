import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../pages/firebase';
import useAuth from "../pages/CurrentUser";
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import '../Design/Navbar.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaBook } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";

function ColorSchemesExample() {

  const { isAdmin } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully")
    }).catch((error) => {
        console.log(error);
    });
}

  return (
      <Navbar ClassName="navbar" variant="dark" >
        <Container>
          <Navbar.Brand as={Link} to="/" className='NavLogoWithMargin' style={{fontSize: '1.5rem'}}>MyOnlyBook</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className='NavItemWithMargin'> <FaHome size={20}/> Home</Nav.Link>
                <Nav.Link as={Link} to="/course" className='NavItemWithMargin'> <FaBook/> Course</Nav.Link>
                <Nav.Link as={Link} to="/" className='NavItemWithMargin'><FaRocketchat/> ChatBox</Nav.Link>
                <Nav.Link as={Link} to="/" className='NavItemWithMargin'> <FaChartLine/> Progress</Nav.Link>
                <Nav.Link as={Link} to="/" className='NavItemWithMargin'> <FaWpforms/> Feedback</Nav.Link>
                <NavDropdown title="User" id="navbarScrollingDropdown" >
                    <NavDropdown.Item as={Link} to="/">Profile settings</NavDropdown.Item>
                    {isAdmin && <NavDropdown.Item as={Link} to="/mystudents">MyStudents List</NavDropdown.Item> }
                    <NavDropdown.Item as={Link} to="/">Privacy policy</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">Contact Us</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
      </Navbar>
  );
}

export default ColorSchemesExample;