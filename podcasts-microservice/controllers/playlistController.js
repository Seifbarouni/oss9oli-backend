const asyncHandler = require("express-async-handler");
const WatchLater = require("../models/watchLaterModel");
const LikedEps = require("../models/likedPlaylistModel");

const getPlaylistLiked = asyncHandler(async (req, res) => {
    try{
        let liked = await LikedEps.findOne({userId: req.body.payload.userId}).populate("episodes")
        return res.status(200).json({
            success: true,
            data: liked.episodes
        })
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: err,
        });
    }

})

const getPlaylistLater = asyncHandler(async (req, res) => {
    try{
        let later = await WatchLater.find({userId: req.body.payload.userId}).populate("episodes")
        return res.status(200).json({
            success: true,
            data: later.episodes
        })
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: err,
        });
    }

})

const createPlaylists = asyncHandler(async (req, res) => {
    try{
        await WatchLater.create({userId: req.body.userId})
        await LikedEps.create({userId: req.body.userId})
        return res.status(200).json({
            success: true,
        });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: err,
        });
    }
})

const checkEpisode = asyncHandler(async (req, res) => {
    try{
        let later = await WatchLater.findOne({userId: req.body.payload.userId, episodes: req.query.episodeId})
        let liked = await LikedEps.findOne({userId: req.body.payload.userId, episodes: req.query.episodeId})
        return res.status(200).json({
            success: true,
            liked: liked != null,
            later: later != null
        });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: err,
        });
    }

})

const likeEpisode = asyncHandler(async (req, res) => {
    try{
        let liked = await LikedEps.findOne({userId: req.body.payload.userId});
        for(let eps of liked.episodes){
            if(eps+"" == req.body.episodeId){
                liked.episodes.splice(liked.episodes.indexOf(eps), 1)
                await liked.save();
                return res.status(200).json({
                    success: true,
                    exist: false,
                });
            }
        }
        liked.episodes.push(req.body.episodeId);
        await liked.save();
        return res.status(200).json({
            success: true,
            exist: true,
        });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: err,
        });
    }

})

const laterEpisode = asyncHandler(async (req, res) => {
    try{
        let later = await WatchLater.findOne({userId: req.body.payload.userId});
        for(let eps of later.episodes){
            if(eps+"" == req.body.episodeId){
                later.episodes.splice(later.episodes.indexOf(eps), 1)
                await later.save();
                return res.status(200).json({
                    success: true,
                    exist: false,
                });
            }
        }
        later.episodes.push(req.body.episodeId);
        await later.save();
        return res.status(200).json({
            success: true,
            exist: true,
        });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: err,
        });
    }

})
module.exports = {
    checkEpisode,
    createPlaylists,
    getPlaylistLater,
    getPlaylistLiked,
    likeEpisode,
    laterEpisode
  };