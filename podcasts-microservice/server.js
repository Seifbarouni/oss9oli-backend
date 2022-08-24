const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const podcastRouter = require("./routes/podcastsRoutes");
const episodesRoutes = require("./routes/episodesRoutes");
const channelRouter = require("./routes/channelsRoutes");
const PORT = process.env.PORT || 5002;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/podcasts", podcastRouter);
app.use("/api/v1/episodes", episodesRoutes);
app.use("/api/v1/channels", channelRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
