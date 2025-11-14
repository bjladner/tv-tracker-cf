DROP TABLE IF EXISTS tv_shows;
CREATE TABLE IF NOT EXISTS tv_shows (ShowId INTEGER PRIMARY KEY, ShowTitle TEXT, TvMazeId INTEGER, Platform TEXT, ScheduleDay TEXT, ScheduleTime TEXT, PrevEpisode TEXT, NextEpisode TEXT, ImageLink TEXT);
