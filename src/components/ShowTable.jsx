import { Link } from 'react-router'

export default function ShowTable({ showData }) {
  return (
    <tr>
      <td><Link to={`/tvshow/${showData.ShowId}/`}>{showData.ShowTitle}</Link> </td>
      <td>{showData.Platform}</td>
      <td>{showData.NextEpisode}</td>
      <td>{showData.PrevEpisode}</td>
    </tr>
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
