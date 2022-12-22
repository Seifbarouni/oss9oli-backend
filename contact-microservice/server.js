const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const contactRouter = require("./routes/contactRoutes");
const openmicRouter = require("./routes/openmicRoutes");
const PORT = process.env.PORT || 5005;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/openmic", openmicRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
