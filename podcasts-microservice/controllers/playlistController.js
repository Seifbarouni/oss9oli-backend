const asyncHandler = require("express-async-handler");
const WatchLater = require("../models/watchLaterModel");
const LikedEps = require("../models/likedPlaylistModel");
const Unfinished = require("../models/unfinishedPlaylistModel");
const PodcastPlaylist = require("../models/PodcastPlaylistModel");

const getPlaylistLiked = asyncHandler(async (req, res) => {
    try{
        let liked = await LikedEps.findOne({userId: req.body.payload.userId}).populate({
            path: 'episodes',
            model: 'Episode',
            populate: [{
                path: 'podcastId',
                model: 'Podcast'
            }]
        })
        return res.status(200).json({
            success: true,
            data: liked.episodes
        })
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: e,
        });
    }

})

const getPlaylistLater = asyncHandler(async (req, res) => {
    try{
        let later = await WatchLater.findOne({userId: req.body.payload.userId}).populate({
            path: 'episodes',
            model: 'Episode',
            populate: [{
                path: 'podcastId',
                model: 'Podcast'
            }]
        })
        return res.status(200).json({
            success: true,
            data: later.episodes
        })
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: e,
        });
    }

})

const getPlaylisPodcasts = asyncHandler(async (req, res) => {
    try{
        let podcasts = await PodcastPlaylist.findOne({userId: req.body.payload.userId}).populate({
            path: 'podcasts',
            model: 'Podcast',
        })
        return res.status(200).json({
            success: true,
            data: podcasts.podcasts
        })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            error: e,
        });
    }

})

const getPlaylistUnfinished = asyncHandler(async (req, res) => {
    try{
        let unfinished = await Unfinished.findOne({userId: req.body.payload.userId}).populate({
            path: 'episodes',
            model: 'Episode',
            populate: [{
                path: 'episode',
                model: 'Episode',
                populate:[
                    {
                        path: 'podcastId',
                        model: 'Podcast'
                    }
                ]
            }]
        })
        return res.status(200).json({
            success: true,
            data: unfinished.episodes.map(eps=>eps.episode)
        })
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: e,
        });
    }

})

const createPlaylists = asyncHandler(async (req, res) => {
    try{
        await WatchLater.create({userId: req.body.userId})
        await LikedEps.create({userId: req.body.userId})
        await Unfinished.create({userId: req.body.userId})
        await PodcastPlaylist.create({userId: req.body.userId})
        return res.status(200).json({
            success: true,
        });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: e,
        });
    }
})

const checkEpisode = asyncHandler(async (req, res) => {
    try{
        let later = await WatchLater.findOne({userId: req.body.payload.userId, episodes: req.query.episodeId})
        let liked = await LikedEps.findOne({userId: req.body.payload.userId, episodes: req.query.episodeId})
        let unfinished = await Unfinished.findOne({userId: req.body.payload.userId})
        //check if episode is unfinished
        let stoppedAt = null
        for(let eps of unfinished.episodes ){
            if(eps.episode._id == req.query.episodeId){
                stoppedAt = eps.stoppedAt
                break;
            }
        }
        return res.status(200).json({
            success: true,
            liked: liked != null,
            later: later != null,
            unfinished: stoppedAt == null? false : {stoppedAt: stoppedAt}  
        });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            error: e,
        });
    }

})
const checkPodcast = asyncHandler(async (req, res) => {
    try{
        let podcastPlaylist = await PodcastPlaylist.findOne({userId: req.body.payload.userId, podcasts: req.query.podcastId})
        return res.status(200).json({
            success: true,
            liked: podcastPlaylist != null,
        });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            error: e,
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
            error: e,
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
            error: e,
        });
    }

})

const unfinishedEpisode = asyncHandler(async (req, res) => {
    try{
        let unfinished = await Unfinished.findOne({userId: req.body.payload.userId})
        for(let episode of unfinished.episodes){
            if(episode.episode._id+"" == req.body.episodeId){
                episode.stoppedAt = req.body.stoppedAt;
                await unfinished.save()
                return res.status(200).json({
                    success: true,
                    message: "saved",
                });
            }
        }
        unfinished.episodes.push({episode: req.body.episodeId, stoppedAt: req.body.stoppedAt});
        await unfinished.save()
        return res.status(200).json({
            success: true,
            message: "saved",
        });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            error: e,
        });
    }

})

const managePodcasts = asyncHandler(async (req, res) => {
    try{
        let podcastPlaylist = await PodcastPlaylist.findOne({userId: req.body.payload.userId})
        for(let podcast of podcastPlaylist.podcasts){
            if(podcast._id+"" == req.body.podcastId){
                podcastPlaylist.podcasts.splice(podcastPlaylist.podcasts.indexOf(podcast), 1)
                await podcastPlaylist.save()
                return res.status(200).json({
                    success: true,
                    exist: false,
                });
            }
        }
        podcastPlaylist.podcasts.push(req.body.podcastId);
        await podcastPlaylist.save()
        return res.status(200).json({
            success: true,
            exist: true,
        });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            error: e,
        });
    }

})
module.exports = {
    checkEpisode,
    createPlaylists,
    getPlaylistLater,
    getPlaylistLiked,
    likeEpisode,
    laterEpisode,
    unfinishedEpisode,
    getPlaylistUnfinished,
    getPlaylisPodcasts,
    managePodcasts,
    checkPodcast
  };