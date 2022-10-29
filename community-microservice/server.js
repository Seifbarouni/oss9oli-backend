const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeRouter = require("./routes/likeRoutes");
const voteRouter = require("./routes/voteRoutes");
const PORT = process.env.PORT || 5004;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/react", likeRouter);
app.use("/api/v1/votes", voteRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
