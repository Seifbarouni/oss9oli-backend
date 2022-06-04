const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/commentRoutes");
const PORT = process.env.PORT || 5004;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/comments", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
