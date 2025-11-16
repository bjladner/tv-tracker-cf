import { useState } from 'react';
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteShow, updateShow } from '../requests';

export default function SingleShow({ showData, alertProps }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const refreshData = async () => {
    try {
      await updateShow(showData.ShowID);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${showData.ShowTitle} successfully updated!`);
      alertProps.showAlert();
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to update ${showData.ShowTitle}!`);
      alertProps.showAlert();
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOneShow = async () => {
    try {
      console.log(`Deleting ${showData.ShowTitle}`)
      await deleteShow(showData.ShowId);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${showData.ShowTitle} successfully deleted!`);
      alertProps.showAlert();
      navigate(`/`)
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to delete ${showData.ShowTitle}!`);
      alertProps.showAlert();
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading TV Show ...</div>;

  return (
    <Card>
      <Card.Img variant="top" src={showData.ImageLink} />
      <Card.Body>
        <Card.Title>{showData.ShowTitle} on {showData.Platform}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Next Episode: {showData.NextEpisode}</ListGroup.Item>
        <ListGroup.Item>Previous Episode: {showData.PrevEpisode}</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" onClick={refreshData}>
        Refresh Data
      </Button>
      <Button variant="danger" onClick={deleteOneShow}>
        Delete Show
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
