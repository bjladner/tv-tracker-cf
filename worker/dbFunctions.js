// tv_shows (
//   ShowId INTEGER PRIMARY KEY, 
//   ShowTitle TEXT, 
//   TvMazeId INTEGER, 
//   Platform TEXT, 
//   ScheduleDay TEXT, 
//   ScheduleTime TEXT, 
//   PrevEpisode TEXT, 
//   NextEpisode TEXT, 
//   ImageLink TEXT
// );

export async function returnAllShows(db) {
  console.log("Inside returnAllShows dbFunction");
  try {
    return await db
      .prepare("SELECT * FROM tv_shows",)
      .run();
  } catch (e) {
    console.log(e);
  }
}

export async function returnOneShowId(db, showId) {
  console.log("Inside returnOneShowId dbFunction");
  try {
    return await db
      .prepare("SELECT * FROM tv_shows WHERE ShowId = ?",)
      .bind(showId)
      .run();
  } catch (e) {
    console.log(e);
  }
}

export async function deleteOneShowId(db, showId) {
  console.log("Inside deleteOneShowId dbFunction");
  try {
    return await db
      .prepare("DELETE FROM tv_shows WHERE ShowId = ?",)
      .bind(showId)
      .run();
  } catch (e) {
    console.log(e);
  }
}

export async function returnOneTvMazeId(db, tvMazeId) {
  console.log("Inside returnOneTvMazeId dbFunction");
  try {
    return await db
      .prepare("SELECT * FROM tv_shows WHERE TvMazeId = ?",)
      .bind(tvMazeId)
      .run();
  } catch (e) {
    console.log(e);
  }
}

export async function addOneShow(db, showData) {
  console.log("Inside addOneShow dbFunction");
  try {
    return await db
    .prepare("INSERT INTO tv_shows (ShowTitle, TvMazeId, Platform, ScheduleDay, ScheduleTime, PrevEpisode, NextEpisode, ImageLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",)
    .bind(
      showData.title,
      showData.tvMazeId,
      showData.platform,
      showData.scheduleDays,
      showData.scheduleTime,
      showData.prevEpisode,
      showData.nextEpisode,
      showData.imageLink,
    )
    .run();
  } catch (e) {
    console.log(e);
  }
}

export async function updateOneShow(db, showData) {
  console.log("Inside updateOneShow dbFunction");
  try {
    return await db
      .prepare("UPDATE tv_shows SET ShowTitle = ?, Platform = ?, ScheduleDay = ?, ScheduleTime = ?, PrevEpisode = ?, NextEpisode = ?, ImageLink = ? WHERE TvMazeId = ?",)
      .bind(
        showData.title,
        showData.platform,
        showData.scheduleDays,
        showData.scheduleTime,
        showData.prevEpisode,
        showData.nextEpisode,
        showData.imageLink,
        showData.tvMazeId,
      )
      .run();
  } catch (e) {
    console.log(e);
  }
}

// showData:
//   title
//   tvMazeId
//   platform
//   scheduleDays
//   scheduleTime
//   nextEpisodeLink
//   nextEpisode
//   prevEpisodeLink
//   prevEpisode
//   imageLink
