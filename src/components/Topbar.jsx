import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router'
import { TvShowContext } from '../Contexts.js';

export default function Topbar({ viewProps }) {
  const dataProps = useContext(TvShowContext);
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

      <ButtonGroup>
        {viewProps.views.map((view, idx) => (
          <ToggleButton
            key={idx}
            id={`view-${idx}`}
            type="radio"
            name="radio-view"
            value={view.value}
            checked={viewProps.viewValue === view.value}
            onChange={(e) => viewProps.setViewValue(e.currentTarget.value)}
          >
            {view.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <ButtonGroup>
        {dataProps.columns.map((column, idx) => (
          <Button
            key={idx}
            id={`sort-${idx}`}
            type="button"
            name="btn-sort"
            onClick={() => dataProps.sortFunction(column.value)}
          >
            Sort by {column.name}
          </Button>
        ))}
      </ButtonGroup>

    </Navbar>
  )
}
