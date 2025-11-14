import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import TvMazeData from './tvmaze'
import * as dbFunctions from './dbFunctions'

const tvMazeAPI = 'https://api.tvmaze.com';

const app = new Hono();
app.get('/', (c) => c.text('Pretty Blog API'))
app.use(prettyJSON())
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

const api = new Hono();

// Return all tvshows - tvShows.readTvShows
api.get('/tvshows', async (c) => {
  try {
    let returnValue = await dbFunctions.returnAllShows(c.env.tv_tracker_db);
    if (!returnValue.success) {
      throw new Error(`No shows in the DB`);
    }
    console.log(returnValue)
    return c.json(returnValue.results);
  } catch (e) {
    console.log(e);
    return c.json({ status: "error", err: e.message }, 500);
  }
})

// Return a specific tvshow by ID - tvShows.readTvShow
api.get('/tvshow/:id', async (c) => {
  const showId = c.req.param("id");
  try {
    let returnValue = await dbFunctions.returnOneShowId(c.env.tv_tracker_db, showId);
    if (!returnValue.success || !returnValue.results[0].TvMazeId) {
      throw new Error(`The show with ShowId=${showId} has not been found in the DB`);
    }
    console.log(returnValue)
    return c.json(returnValue.results[0]);
  } catch (e) {
    console.log(e);
    return c.json({ status: "error", err: e.message }, 500);
  }
})

// Add a new tvshow - tvShows.addTvShow
api.post('/tvshow/:id', async (c) => {
  const tvMazeId = c.req.param("id");
  try {
    let returnValue1 = await dbFunctions.returnOneTvMazeId(c.env.tv_tracker_db, tvMazeId);
    if (returnValue1.success) {
      return c.json({ status: "exists" });
    }
    const response = await fetch(`${tvMazeAPI}/shows/${tvMazeId}`);
    if (!response.ok) {
      throw new Error(`tvMaze Response status: ${response.status}`);
    }
    const showDataJson = await response.json();
    const showData = new TvMazeData(showDataJson);
    await showData.updateEpisodes();
    console.log(showData);
    let returnValue2 = await dbFunctions.addOneShow(c.env.tv_tracker_db, showData);
    if (!returnValue2.success) {
      throw new Error(`Could not add show with TvMazeId=${tvMazeId}`);
    }
    return c.json({ status: "added" });
  } catch (e) {
    console.log(e);
    return c.json({ status: "error", err: e.message }, 500);
  }
})

// Add a new tvshow - tvShows.addTvShowJson
api.post('/tvshow', async (c) => {
  const body = await c.req.json()
  const tvMazeId = body.id;
  try {
    let returnValue1 = await dbFunctions.returnOneTvMazeId(c.env.tv_tracker_db, tvMazeId);
    if (returnValue1.results !== undefined && returnValue1.results.length != 0) {
      return c.json({ status: "exists" });
    }
    const showData = new TvMazeData(body);
    await showData.updateEpisodes();
    console.log(showData);
    let returnValue2 = await dbFunctions.addOneShow(c.env.tv_tracker_db, showData);
    if (!returnValue2.success) {
      throw new Error(`Could not add show with TvMazeId=${tvMazeId}`);
    }
    return c.json({ status: "added" });
  } catch (e) {
    console.log(e);
    return c.json({ status: "error", err: e.message }, 500);
  }
})

// Update a tvshow by ID - tvShows.updateTvShow
api.patch('/tvshow/:id', async (c) => {
  const showId = c.req.param("id");
  try {
    let returnValue1 = await dbFunctions.returnOneShowId(c.env.tv_tracker_db, showId);
    if (!returnValue1.success || !returnValue1.results[0].TvMazeId) {
      throw new Error(`The show with ShowId=${showId} has not been found in the DB`);
    }
    const response = await fetch(`${tvMazeAPI}/shows/${returnValue1.results[0].TvMazeId}`);
    if (!response.ok) {
      throw new Error(`tvMaze Response status: ${response.status}`);
    }
    const showDataJson = await response.json();
    const showData = new TvMazeData(showDataJson);
    await showData.updateEpisodes();
    console.log(showData);
    let returnValue2 = await dbFunctions.updateOneShow(c.env.tv_tracker_db, showData);
    if (!returnValue2.success) {
      throw new Error(`Could not update show with ShowId=${showId}`);
    }
    return c.json({ status: "updated" });
  } catch (e) {
    console.log(e);
    return c.json({ status: "error", err: e.message }, 500);
  }
})

// Delete a tvshow by ID - tvShows.deleteTvShow
api.delete('/tvshow/:id', async (c) => {
  const showId = c.req.param("id");
  try {
    let returnValue = await dbFunctions.deleteOneShowId(c.env.tv_tracker_db, showId);
    if (!returnValue.success) {
      throw new Error(`Could not delete show with ShowId=${showId}`);
    }
    return c.json({ status: "deleted" });
  } catch (e) {
    console.log(e);
    return c.json({ status: "error", err: e.message }, 500);
  }
})

app.route('/api', api)

export default app
