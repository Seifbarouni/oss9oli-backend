const express = require("express");
const playlistRouter = express.Router();

const { verifyToken, decodeToken } = require("../middleware/auth");

const { 
    checkEpisode,
    createPlaylists,
    getPlaylistLater,
    getPlaylistLiked,
    laterEpisode,
    likeEpisode,
    getPlaylistUnfinished,
    unfinishedEpisode,
    getPlaylisPodcasts,    
    managePodcasts,
    checkPodcast
} = require("../controllers/playlistController");

playlistRouter.get("/checkEpisode", [verifyToken, decodeToken], checkEpisode);
playlistRouter.get("/checkPodcast", [verifyToken, decodeToken], checkPodcast);
playlistRouter.post("/", createPlaylists);
 playlistRouter.get("/later", [verifyToken, decodeToken], getPlaylistLater);
 playlistRouter.get("/unfinished", [verifyToken, decodeToken], getPlaylistUnfinished);
 playlistRouter.get("/liked", [verifyToken, decodeToken], getPlaylistLiked);
 playlistRouter.get("/podcast", [verifyToken, decodeToken], getPlaylisPodcasts);
 playlistRouter.put("/like", [verifyToken, decodeToken], likeEpisode);
 playlistRouter.put("/later", [verifyToken, decodeToken], laterEpisode);
 playlistRouter.put("/unfinished", [verifyToken, decodeToken], unfinishedEpisode);
 playlistRouter.put("/podcast", [verifyToken, decodeToken], managePodcasts);

module.exports = playlistRouter;