const mongoose = require("mongoose");

const pointsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  points: {
    type: Number,
    default: 0,
    required: true
  }
});

const Points = mongoose.model("Points", pointsSchema);

module.exports = Points;
