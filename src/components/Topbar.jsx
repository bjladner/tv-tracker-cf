import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router'

export default function Topbar() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  
  const startSearch = (event) => {
    event.preventDefault();
    console.log(userInput);
    navigate(`/search/${userInput}/`)
  }

  const onChange = (event) => {
    setUserInput(event.target.value);
  }

  return (
    <Navbar sticky="top">
      <Container>
        <Row>
          <Col>
            <Navbar.Brand className='text-white' href="/">TV Show Tracker</Navbar.Brand>
          </Col>
          <Col>
            <Form className="d-flex" onSubmit={startSearch}>
              <Form.Control
                type="text"
                name="search"
                placeholder="Search TV Shows"
                className="me-2"
                value={userInput}
                onChange={onChange}
              />
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Navbar>
  )
}
