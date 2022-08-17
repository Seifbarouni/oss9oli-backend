const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const PORT = process.env.PORT || 5003;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", userRouter);
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
