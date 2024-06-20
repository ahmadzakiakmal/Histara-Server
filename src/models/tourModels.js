const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  tourName: {
    type: String,
    unique: true
  },
  toursId: {
    type: String,
    required: true
  },
  tourDescription: {
    type: String,
    required: true
  },
  tourAddress: {
    type: String,
    required: true
  },
  tourPrice: {
    type: Number,
    required: true
  },
  tourPoints: {
    type: Number,
    required: true
  },
  tourDuration: {
    type: Number,
    required: true
  },
  tourStops: {
    type: Number,
    required: true
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;