const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");

dotenv.config();

const app = express();

app.use(morgan("dev"));

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

app.get("/", (req, res) => {
  res.send("Histara Server");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
