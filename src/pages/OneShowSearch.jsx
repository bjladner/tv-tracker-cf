import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import { AlertContext, TvShowContext } from '../contexts/Contexts.js';
import { getAllShows, addNewShowJson, returnSearchShow, returnNextEpisodeSearch, returnPlatform } from '../requests';

export default function OneShowSearch() {
  const { showID } = useParams();
  const alertProps = useContext(AlertContext);
  const dataProps = useContext(TvShowContext);
  const [tvShow, setTvShow] = useState([]);
  const [nextEpisode, setNextEpisode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const searchTvShow = async (showID) => {
      try {
        // throw new Error("This is a forced error");
        console.log(showID);
        const show = await returnSearchShow(showID);
        setTvShow(show);
        const nextEp = await returnNextEpisodeSearch(show);
        setNextEpisode(nextEp);
      } catch (err) {
        alertProps.setAlertVariant("danger");
        alertProps.setAlertMessage('Failed to retreive TV Show results');
        alertProps.showAlert();
        setError('Failed to retreive TV Show results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    searchTvShow(showID);
  }, [alertProps, showID]);
  
  const addTvShow = async () => {
    try {
      const response1 = await addNewShowJson(tvShow);
      console.log(response1);
      if (response1.status === "exists") {
        alertProps.setAlertVariant("warning");
        alertProps.setAlertMessage(`${tvShow.name} already exists!`);
        alertProps.showAlert();
      } else {
        alertProps.setAlertVariant("success");
        alertProps.setAlertMessage(`${tvShow.name} successfully added!`);
        alertProps.showAlert();
      }
      const response2 = await getAllShows();
      console.log(response2);
      dataProps.setTvShows(response2);
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
