const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  rewardName: {
    type: String,
    required: true
  },
  rewardPoint: {
    type: Number,
    required: true
  },
  rewardLocation: {
    type: String,
    required: true
  }
});

const Rewards = mongoose.model("Rewards", rewardSchema);

module.exports = Rewards;
