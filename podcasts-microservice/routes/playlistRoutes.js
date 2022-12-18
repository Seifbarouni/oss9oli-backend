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
    unfinishedEpisode
 } = require("../controllers/playlistController");

 playlistRouter.get("/check", [verifyToken, decodeToken], checkEpisode);
 playlistRouter.post("/", createPlaylists);
 playlistRouter.get("/later", [verifyToken, decodeToken], getPlaylistLater);
 playlistRouter.get("/unfinished", [verifyToken, decodeToken], getPlaylistUnfinished);
 playlistRouter.get("/liked", [verifyToken, decodeToken], getPlaylistLiked);
 playlistRouter.put("/like", [verifyToken, decodeToken], likeEpisode);
 playlistRouter.put("/later", [verifyToken, decodeToken], laterEpisode);
 playlistRouter.put("/unfinished", [verifyToken, decodeToken], unfinishedEpisode);

module.exports = playlistRouter;
