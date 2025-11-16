import { Link } from 'react-router'
import ListGroup from 'react-bootstrap/ListGroup';

export default function ShowList({ showData }) {
  return (
    <ListGroup.Item className="bg-dark text-white">
      <Link to={`/tvshow/${showData.ShowId}/`}>{showData.ShowTitle}</Link> - {showData.Platform} - {showData.NextEpisode}
    </ ListGroup.Item>
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
