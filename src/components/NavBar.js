import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function ColorSchemesExample() {
  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MyOnlyBook</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">Course</Nav.Link>
                <Nav.Link href="/">ChatBox</Nav.Link>
                <Nav.Link href="/">Progress</Nav.Link>
                <Nav.Link href="/">Feedback</Nav.Link>
                <NavDropdown title="User" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/">Profile settings</NavDropdown.Item>
                    <NavDropdown.Item href="/">Privacy policy</NavDropdown.Item>
                    <NavDropdown.Item href="/">Contact Us</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/">
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
      </Navbar>
  );
}

export default ColorSchemesExample;