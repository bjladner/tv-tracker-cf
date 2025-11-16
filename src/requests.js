import axios from 'axios'

const tvMazeAPI = 'https://api.tvmaze.com';

export async function addNewShowJson(showData) {
  try {
    console.log(showData);
    const response = await axios.post(`/api/tvshow`, showData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllShows() {
  try {
    const response = await axios.get(`/api/tvshows`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOneShow(showID) {
  try {
    const response = await axios.get(`/api/tvshow/${showID}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateShow(showID) {
  try {
    const response = await axios.patch(`/api/tvshow/${showID}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteShow(showID) {
  try {
    const response = await axios.delete(`/api/tvshow/${showID}`);
    console.log(`Deleting finished.`)
    console.log(response.data);
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

export async function returnNextEpisodeSearch(searchData) {
  if (searchData._links.nextepisode) {
    const nextEpisodeData = await axios.get(searchData._links.nextepisode.href);
    return new Date(nextEpisodeData.data.airdate).toDateString();
  } else {
    return "No Scheduled Episode";
  }
}

export async function tvShowResults(showName) {
  try {
    const response = await axios.get(`${tvMazeAPI}/search/shows?q=${showName}`)
    console.log(response.data);
    console.log(`Found ${response.data.length} shows about ${showName}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

export async function returnSearchShow(showId) {
  try {
    console.log(`URL: ${tvMazeAPI}/shows/${showId}`)
    const response = await axios.get(`${tvMazeAPI}/shows/${showId}`)
    console.log(response.data);
    return response.data;
  } catch(error) {
    console.log(error);
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
