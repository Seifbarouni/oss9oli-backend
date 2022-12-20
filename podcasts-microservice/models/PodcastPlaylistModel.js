const mongoose = require("mongoose");

const podcastPlaylistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    podcasts: {
      type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Podcast' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PodcastPlaylist", podcastPlaylistSchema);

