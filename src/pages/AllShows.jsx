import { useState, useEffect } from 'react';
import { getAllShows } from '../requests';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import TvShow from '../components/TvShow';
import SingleShow from '../components/SingleShow';

export default function AllShows({ alertProps }) {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewValue, setViewValue] = useState('card');

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
        <ToggleButton
          key={1}
          id="radio-1"
          type="radio"
          name="radio-view"
          value='list'
          checked={viewValue === 'list'}
          onChange={() => setViewValue('list')}
        >
          List View
        </ToggleButton>
        <ToggleButton
          key={1}
          id="radio-2"
          type="radio"
          name="radio-view"
          value='card'
          checked={viewValue === 'card'}
          onChange={() => setViewValue('card')}
        >
          Card View
        </ToggleButton>
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
          <TvShow key={index} showData={data} />
        ))}
      </ ListGroup>}
    </>
  )
}
