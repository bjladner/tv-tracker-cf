import { useState, useEffect } from 'react';
import { getAllShows } from '../requests';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowList from '../components/ShowList';
import ShowTable from '../components/ShowTable';
import SingleShow from '../components/SingleShow';

export default function AllShows({ alertProps }) {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewValue, setViewValue] = useState('card');
  const views = [
    { name: 'List View', value: 'list' },
    { name: 'Card View', value: 'card' },
    { name: 'Table View', value: 'table' },
  ];

  useEffect(() => {
    const retreiveTvShows = async () => {
      try {
        const response = await getAllShows();
        console.log(response);
        setTvShows(response);
      } catch (err) {
        setError('Failed to retreive TV Shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveTvShows();
  }, []);

  if (loading) return <div>Loading TV Shows ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <ButtonGroup>
        {views.map((view, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio-view"
            value={view.value}
            checked={viewValue === view.value}
            onChange={(e) => setViewValue(e.currentTarget.value)}
          >
            {view.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      {(viewValue === 'card') && <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>
        {tvShows.map((data, index) => (
          <Col>
            <SingleShow key={index} showData={data} alertProps={alertProps}/>
          </Col>
        ))}
      </Row>}

      {(viewValue === 'list') && <ListGroup className="bg-dark text-white">
        {tvShows.map((data, index) => (
          <ShowList key={index} showData={data} />
        ))}
      </ ListGroup>}

      {(viewValue === 'table') && <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Show Title</th>
            <th>Platform</th>
            <th>Next Episode</th>
            <th>Previous Episode</th>
          </tr>
        </thead>
        <tbody>
          {tvShows.map((data, index) => (
            <ShowTable key={index} showData={data} />
          ))}
        </tbody>
      </Table>}
    </>
  )
}
