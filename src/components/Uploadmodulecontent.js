import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import useAuth from "../pages/CurrentUser";
import '../Design/Course.css';

const NavTabsExample = () => {

        const { isAdmin } = useAuth();
        const [fileUrl, setFileUrl] = useState('');
      
        const handleFileUpload = (event) => {
          const file = event.target.files[0];
          const fileUrl = URL.createObjectURL(file);
          setFileUrl(fileUrl);
        };

  return (
    <Card className='content-holder'>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Lesson</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">Class exercise</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="##" >Home work</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
      {isAdmin && <div>
        <Card.Title>Upload the file you wish to display for your students:</Card.Title>
        <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>You can upload your file by clicking the 'choose file' button below. Please note myOnlyBook accepts <b>PDF files</b> only</Form.Label>
            <Form.Control type="file" accept="application/pdf"  onChange={handleFileUpload} />
        </Form.Group> </div>
        }
        {fileUrl && (
        <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />
      )}
      </Card.Body>
    </Card>
  );
}

export default NavTabsExample;