const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");
const app = express();

// DOTENV CONFIG
dotenv.config();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS
app.use(cors());

// MONGODB CONNECTION
if (!process.env.MONGO_URI) {
  throw Error("Database connection string not found");
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Succesfully connected to MongoDB");
  }).catch((err) => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  });

// ROUTES
app.get("/", (req, res) => {
  res.send("Histara Server");
});
app.get("/version", (req, res)  => {
  res.send("1.0.0");
});
app.use("/v1/user", require("./src/routes/userRoutes"));
app.use("/v1/transaction", require("./src/routes/transactionRoutes"));
app.use("/v1/tour", require("./src/routes/tourRoutes"));
app.use("/v1/point", require("./src/routes/pointRoutes"));

// APP START
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
