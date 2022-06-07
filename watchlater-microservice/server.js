const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("../casting-microservice/routes/watchlaterRoutes");
const PORT = process.env.PORT || 5006;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/watchlater", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
