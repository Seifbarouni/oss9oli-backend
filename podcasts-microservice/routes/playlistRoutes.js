const express = require("express");
const playlistRouter = express.Router();

const { verifyToken, decodeToken } = require("../middleware/auth");

const { 
    checkEpisode,
    createPlaylists,
    getPlaylistLater,
    getPlaylistLiked,
    laterEpisode,
    likeEpisode
 } = require("../controllers/playlistController");

 playlistRouter.get("/check", [verifyToken, decodeToken], checkEpisode);
 playlistRouter.post("/", createPlaylists);
 playlistRouter.get("/later", [verifyToken, decodeToken], getPlaylistLater);
 playlistRouter.get("/liked", [verifyToken, decodeToken], getPlaylistLiked);
 playlistRouter.put("/like", [verifyToken, decodeToken], likeEpisode);
 playlistRouter.put("/later", [verifyToken, decodeToken], laterEpisode);

module.exports = playlistRouter;
