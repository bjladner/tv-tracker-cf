import { useContext } from 'react';
import { AlertContext, TvShowContext } from '../contexts/Contexts.js';
import axios from 'axios'

const tvMazeAPI = 'https://api.tvmaze.com';

export default function ApiInterface({ setLoading, setError }) {
  const dataProps = useContext(TvShowContext);
  const alertProps = useContext(AlertContext);

    const searchTvShows = async (searchShowName) => {
    try {
      // throw new Error("This is a forced error");
      console.log(`Searching for ${searchShowName}`);
      const response = await axios.get(`${tvMazeAPI}/search/shows?q=${searchShowName}`)
      console.log(`Found ${response.data.length} shows about ${searchShowName}`);
      setSearchResults(response.data);
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

  const searchTvShow = async (searchShowID) => {
    try {
      // throw new Error("This is a forced error");
      console.log(`Searching for Show with ID = ${searchShowID}`);
      const response = await axios.get(`${tvMazeAPI}/shows/${searchShowID}`)
      setTvShow(response.data);
      await getNextEpisode(response.data);
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

  const getNextEpisode = async (singleSearchShow) => {
    try {
      let nextEpisodeDate = "No Scheduled Episode";
      console.log(`Getting next episode for ${singleSearchShow.name}`);
      if (singleSearchShow._links.nextepisode) {
        const response = await axios.get(singleSearchShow._links.nextepisode.href);
        nextEpisodeDate =  new Date(response.data.airdate).toDateString();
      }
      console.log(`Next air date is "${nextEpisodeDate}"`)
      console.log(nextEpisodeDate);
      setNextEpisode(nextEpisodeDate);
    } catch (err) {
      setError('Failed to get next episode');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTvShow = async (singleSearchShow) => {
    try {
      console.log(`Adding show ${singleSearchShow.name}`);
      const response1 = await axios.post(`/api/tvshow`, singleSearchShow);
      console.log(response1.data);
      if (response1.data.status === "exists") {
        alertProps.setAlertVariant("warning");
        alertProps.setAlertMessage(`${singleSearchShow.name} already exists!`);
        alertProps.showAlert();
      } else {
        alertProps.setAlertVariant("success");
        alertProps.setAlertMessage(`${singleSearchShow.name} successfully added!`);
        alertProps.showAlert();
      }
      const response2 = await getAllShows();
      dataProps.setTvShows(response2);
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to add ${singleSearchShow.name}!`);
      alertProps.showAlert();
      setError(`Failed to update ${singleSearchShow.name}`);
      console.error(err);
    } finally {
      setLoading(false);
    }  
  }

  const retreiveExistingTvShow = async (existingShowId) => {
    try {
      // throw new Error("This is a forced error");
      const response = await axios.get(`/api/tvshow/${existingShowId}`);
      console.log(response.data);
      dataProps.setTvShow(response.data);
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to retrieve TV Show!`);
      alertProps.showAlert();
      setError('Failed to retreive TV Show');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async (singleShow) => {
    try {
      const response1 = await axios.patch(`/api/tvshow/${singleShow}`);
      if (response1.status !== "updated") {
        throw new Error(`Update status: ${response1}`);
      }      
      const response2 = await getAllShows();
      console.log(response2);
      dataProps.setTvShows(response2);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${singleShow.ShowTitle} successfully updated!`);
      alertProps.showAlert();
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to update ${singleShow.ShowTitle}!`);
      alertProps.showAlert();
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOneShow = async (singleShow) => {
    try {
      console.log(`Deleting ${singleShow.ShowTitle}`)
      const response1 = await axios.delete(`/api/tvshow/${singleShow.ShowId}`);
      if (response1.status !== "deleted") {
        throw new Error(`Delete status: ${response1}`);
      }      
      const response2 = await getAllShows();
      console.log(response2);
      dataProps.setTvShows(response2);
      alertProps.setAlertVariant("success");
      alertProps.setAlertMessage(`${singleShow.ShowTitle} successfully deleted!`);
      alertProps.showAlert();
    } catch (err) {
      alertProps.setAlertVariant("danger");
      alertProps.setAlertMessage(`Failed to delete ${singleShow.ShowTitle}!`);
      alertProps.showAlert();
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
}

export async function getAllShows() {
  try {
    const response = await axios.get(`/api/tvshows`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export function returnPlatform(searchData) {
  if (searchData.network) {
    return searchData.network.name;
  } else if (searchData.webChannel) {
    return searchData.webChannel.name;
  } else {
    return "Not Available";
  }
}

export function returnNextEpisode(showData) {
  if (showData.NextEpisode) {
    return new Date(showData.NextEpisode).toDateString();
  } else {
    return "No Scheduled Episode";
  }
}

export function returnPrevEpisode(showData) {
  if (showData.PrevEpisode) {
    return new Date(showData.PrevEpisode).toDateString();
  } else {
    return "No Scheduled Episode";
  }
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
