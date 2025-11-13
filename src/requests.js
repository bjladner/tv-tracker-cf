import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL|| 'http://localhost:3000';
const tvMazeAPI = 'https://api.tvmaze.com';

export async function addNewShow(showID) {
  try {
    const response = await axios.post(`${baseUrl}/api/tvshow/${showID}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addNewShowJson(showData) {
  try {
    console.log(showData);
    const response = await axios.post(`${baseUrl}/api/tvshow`, showData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllShows() {
  try {
    console.log(baseUrl)
    const response = await axios.get(`${baseUrl}/api/tvshows`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOneShow(showID) {
  try {
    const response = await axios.get(`${baseUrl}/api/tvshow/${showID}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateShow(showID) {
  try {
    const response = await axios.patch(`${baseUrl}/api/tvshow/${showID}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteShow(showID) {
  try {
    const response = await axios.delete(`${baseUrl}/api/tvshow/${showID}`);
    console.log(`Deleting finished.`)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function returnSearchResults(showName) {
  try {
    const response = await axios.get(`${baseUrl}/api/search/${showName}`);
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
    if (showData.nextEpisode) {
      return new Date(showData.nextEpisode).toDateString();
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