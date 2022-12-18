const mongoose = require("mongoose");

const unfinishedEpisode = new mongoose.Schema(
  {
    episode:{ 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'Episode' 
    },
    stoppedAt:{
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const unfinishedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    episodes: {
      type: [unfinishedEpisode],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("unfinished", unfinishedSchema);
