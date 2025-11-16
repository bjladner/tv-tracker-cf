import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import { addNewShowJson, returnSearchShow, returnNextEpisodeSearch, returnPlatform } from '../requests';


export default function OneShowSearch({ alertProps }) {
  const { showID } = useParams();
  const [tvShow, setTvShow] = useState([]);
  const [nextEpisode, setNextEpisode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const retreiveTvShow = async (showID) => {
      try {
        console.log(showID);
        const show = await returnSearchShow(showID);
        setTvShow(show);
        const nextEp = await returnNextEpisodeSearch(show);
        setNextEpisode(nextEp);
      } catch (err) {
        setError('Failed to retreive TV Show results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveTvShow(showID);
  }, [showID]);
  
  const addTvShow = async () => {
    try {
      const response = await addNewShowJson(tvShow);
      console.log(response);
      if (response.status === "exists") {
        alertProps.setAlertVariant("warning");
        alertProps.setAlertMessage(`${tvShow.name} already exists!`);
        alertProps.showAlert();
      } else {
        alertProps.setAlertVariant("success");
        alertProps.setAlertMessage(`${tvShow.name} successfully added!`);
        alertProps.showAlert();
      }
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to add ${tvShow.name}!`);
      alertProps.showAlert();
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
            <h3>{tvShow.name} - {returnPlatform(tvShow)}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {(tvShow.image.medium) && <Image src={tvShow.image.medium} rounded />}
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
