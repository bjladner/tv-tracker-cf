import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router';
import { addNewShowJson, returnNextEpisodeSearch, returnPlatform } from '../requests'

export default function Result({ showData, alertProps }) {
  const [nextEpisode, setNextEpisode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNextEpisode = async (show) => {
      try {
        const response = await returnNextEpisodeSearch(show);
        console.log(response);
        setNextEpisode(response);
      } catch (err) {
        setError('Failed to get next episode');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getNextEpisode(showData.show);
  }, [showData.show]);
  
  const addTvShow = async () => {
    try {
      const response = await addNewShowJson(showData.show);
      console.log(response);
      if (response.status === "exists") {
        alertProps.setAlertVariant("warning");
        alertProps.setAlertMessage(`${showData.show.name} already exists!`);
        alertProps.showAlert();
      } else {
        alertProps.setAlertVariant("success");
        alertProps.setAlertMessage(`${showData.show.name} successfully added!`);
        alertProps.showAlert();
      }
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to add ${showData.show.name}!`);
      alertProps.showAlert();
      // setError(`Failed to update ${showData.name}`);
      console.error(err);
    } finally {
      setLoading(false);
    }  
  }

  if (loading) return <div>Loading next episodes ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ListGroup.Item className="bg-dark text-white">
      <Link to={`/search/show/${showData.show.id}/`}>{showData.show.name}</Link> - {returnPlatform(showData.show)} - {nextEpisode}
      <Button variant="primary" onClick={addTvShow}>
        Add Show
      </Button>
    </ ListGroup.Item>
  )
}

// show: {
//     "id": 32158,
//     "url": "https://www.tvmaze.com/shows/32158/fbi",
//     "name": "FBI",
//     "type": "Scripted",
//     "language": "English",
//     "genres": [
//         "Drama",
//         "Crime"
//     ],
//     "status": "Running",
//     "runtime": 60,
//     "averageRuntime": 60,
//     "premiered": "2018-09-25",
//     "ended": null,
//     "officialSite": "https://www.cbs.com/shows/fbi/",
//     "schedule": {
//         "time": "21:00",
//         "days": [
//             "Monday"
//         ]
//     },
//     "rating": {
//         "average": 7.1
//     },
//     "weight": 100,
//     "network": {
//         "id": 2,
//         "name": "CBS",
//         "country": {
//             "name": "United States",
//             "code": "US",
//             "timezone": "America/New_York"
//         },
//         "officialSite": "https://www.cbs.com/"
//     },
//     "webChannel": null,
//     "dvdCountry": null,
//     "externals": {
//         "tvrage": null,
//         "thetvdb": 350071,
//         "imdb": "tt7491982"
//     },
//     "image": {
//         "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/538/1345374.jpg",
//         "original": "https://static.tvmaze.com/uploads/images/original_untouched/538/1345374.jpg"
//     },
//     "summary": "<p><b>FBI</b> is a fast-paced drama about the inner workings of the New York Field Office of the Federal Bureau of Investigation. These first-class agents, including Special Agent Maggie Bell and her partner, Special Agent Omar Adom 'OA' Zidan, bring all their talents, intellect and technical expertise on major cases in order to keep New York and the country safe.</p>",
//     "updated": 1756170790,
//     "_links": {
//         "self": {
//             "href": "https://api.tvmaze.com/shows/32158"
//         },
//         "previousepisode": {
//             "href": "https://api.tvmaze.com/episodes/3181015",
//             "name": "A New Day"
//         },
//         "nextepisode": {
//             "href": "https://api.tvmaze.com/episodes/3301104",
//             "name": "Takeover"
//         }
//     }
// }