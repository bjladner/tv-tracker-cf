import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteShow, getOneShow, updateShow } from '../requests';


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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={tvShow.ImageLink} />
      <Card.Body>
        <Card.Title>{tvShow.ShowTitle} on {tvShow.Platform}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
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
