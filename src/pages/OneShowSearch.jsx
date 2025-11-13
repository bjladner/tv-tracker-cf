import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import { addNewShowJson, returnNextEpisodeSearch, returnPlatform } from '../requests';


export default function OneShowSearch({ tvShow, alertProps }) {
  const { showID } = useParams();
  const [nextEpisode, setNextEpisode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const getNextEpisode = async (show) => {
      try {
        const response = await returnNextEpisodeSearch(show);
        console.log(response);
        setNextEpisode(response);
      } catch (err) {
        setError('Failed to retreive TV Shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getNextEpisode(tvShow.show);
  }, [tvShow.show]);
  
  const addTvShow = async () => {
    try {
      const response = await addNewShowJson(tvShow.show);
      console.log(response);
      if (response.status === "exists") {
        alertProps.setAlertVariant("warning");
        alertProps.setAlertMessage(`${tvShow.show.name} already exists!`);
        alertProps.showAlert();
      } else {
        alertProps.setAlertVariant("success");
        alertProps.setAlertMessage(`${tvShow.show.name} successfully added!`);
        alertProps.showAlert();
      }
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to add ${tvShow.show.name}!`);
      alertProps.showAlert();
      // setError(`Failed to update ${tvShow.name}`);
      console.error(err);
    } finally {
      setLoading(false);
    }  
  }

  const returnToMenu = () => {
    navigate(`/`)
  }

  if (loading) return <div>Loading next episodes ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="text-white">
      <Container>
        <Row>
          <Col>
            <h3>{tvShow.show.name} - {returnPlatform(tvShow.show)}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {(tvShow.show.image.medium) && <Image src={tvShow.show.image.medium} rounded />}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Next Episode: {nextEpisode}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={addTvShow}>
              Add Show
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={returnToMenu}>
              Home
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
