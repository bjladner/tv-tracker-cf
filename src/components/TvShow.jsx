import { Link } from 'react-router'
import ListGroup from 'react-bootstrap/ListGroup';
import { returnNextEpisode } from '../requests';

export default function TvShow({ showData }) {

  return (
    <ListGroup.Item className="bg-dark text-white">
      <Link to={`/tvshow/${showData._id}/`}>{showData.title}</Link> - {showData.platform} - {returnNextEpisode(showData)}
    </ ListGroup.Item>
  )
}


// {
//   "_id":"68b4784c4cc9224a54fab221",
//   "title":"Slow Horses",
//   "tvMazeID":45039,
//   "scheduleDay":["Wednesday"],
//   "platform":"Apple TV+",
//   "imageLink":"https://static.tvmaze.com/uploads/images/medium_portrait/531/1328385.jpg",
//   "nextEpisode":"2025-09-24T00:00:00.000Z",
//   "__v":0
// }