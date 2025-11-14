import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import { deleteShow, getOneShow, returnNextEpisode, updateShow } from '../requests';


export default function OneShow({ alertProps }) {
  const { showID } = useParams();
  const [tvShow, setTvShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const retreiveTvShow = async () => {
      try {
        const response = await getOneShow(showID);
        console.log(response);
        setTvShow(response);
      } catch (err) {
        setError('Failed to retreive TV Show');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveTvShow();
  }, [showID]);
  
  const refreshData = async () => {
    try {
      await updateShow(showID);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${tvShow.ShowTitle} successfully updated!`);
      alertProps.showAlert();
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to update ${tvShow.ShowTitle}!`);
      alertProps.showAlert();
      // setError(`Failed to update ${tvShow.ShowTitle}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOneShow = async () => {
    try {
      console.log(`Deleting ${tvShow.ShowTitle}`)
      await deleteShow(tvShow.ShowId);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${tvShow.ShowTitle} successfully deleted!`);
      alertProps.showAlert();
      navigate(`/`)
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to delete ${tvShow.ShowTitle}!`);
      alertProps.showAlert();
      // setError(`Failed to delete ${tvShow.title}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const returnToMenu = () => {
    navigate(`/`)
  }

  if (loading) return <div>Loading TV Show ...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className="text-white">
      <Container>
        <Row>
          <Col>
            <h3>{tvShow.ShowTitle} - {tvShow.Platform}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image src={tvShow.ImageLink} rounded />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Next Episode: {returnNextEpisode(tvShow)}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={refreshData}>
              Refresh Data
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={deleteOneShow}>
              Delete Show
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={returnToMenu}>
              All Shows
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


// {
//     "ShowId": 1,
//     "ShowTitle": "Doc",
//     "TvMazeId": 67884,
//     "Platform": "FOX",
//     "ScheduleDay": "Tuesday",
//     "ScheduleTime": "21:00",
//     "PrevEpisode": "2025-11-11",
//     "NextEpisode": "2025-11-18",
//     "ImageLink": "https://static.tvmaze.com/uploads/images/medium_portrait/587/1468845.jpg"
// }
