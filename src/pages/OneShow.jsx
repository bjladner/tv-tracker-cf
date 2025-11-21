import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import * as Api from '../apis/requests'
import { AlertContext, TvShowContext } from '../contexts/Contexts.js';

export default function OneShow() {
  const { showID } = useParams();
  const alertProps = useContext(AlertContext);
  const dataProps = useContext(TvShowContext);
  const [tvShow, setTvShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const retreiveTvShow = async () => {
      try {
        // throw new Error("This is a forced error");
        const response = await Api.getOneShow(showID);
        console.log(response);
        setTvShow(response);
      } catch (err) {
        setError('Failed to retreive TV Show');
        alertProps.setAlertVariant("danger");
        alertProps.setAlertMessage(`Failed to retrieve TV Show!`);
        alertProps.showAlert();
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveTvShow();
  }, [alertProps, showID]);
  
  const refreshData = async () => {
    try {
      await Api.updateShow(showID);
      const response = await Api.getAllShows();
      console.log(response);
      dataProps.setTvShows(response);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${tvShow.ShowTitle} successfully updated!`);
      alertProps.showAlert();
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to update ${tvShow.ShowTitle}!`);
      alertProps.showAlert();
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOneShow = async () => {
    try {
      console.log(`Deleting ${tvShow.ShowTitle}`)
      await Api.deleteShow(tvShow.ShowId);
      const response = await Api.getAllShows();
      console.log(response);
      dataProps.setTvShows(response);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${tvShow.ShowTitle} successfully deleted!`);
      alertProps.showAlert();
      navigate(`/`)
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to delete ${tvShow.ShowTitle}!`);
      alertProps.showAlert();
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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tvShow.ImageLink} />
      <Card.Body>
        <Card.Title>{tvShow.ShowTitle} on {tvShow.Platform}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Next Episode: {tvShow.NextEpisode}</ListGroup.Item>
        <ListGroup.Item>Previous Episode: {tvShow.PrevEpisode}</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" onClick={refreshData}>
        Refresh Data
      </Button>
      <Button variant="danger" onClick={deleteOneShow}>
        Delete Show
      </Button>
      <Button variant="primary" onClick={returnToMenu}>
        All Shows
      </Button>
    </Card>
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
