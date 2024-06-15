const Points = require("../models/pointModel");
const Rewards = require("../models/rewardModel");

/*
  DESC        : Get user points
  PARAMS      : -
  METHOD      : GET
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : User points
*/
exports.checkPoints = async (req, res) => {
  const userId = req._id;

  Points.findOne({ userId: userId })
    .select("points -_id")
    .then((points) => {
      if (!points) {
        return res.status(404).json({
          message: "User points not found!"
        });
      }

      res.status(200).json({
        message: "Success get user points",
        points: points.points
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch user points",
        err: err
      });
    });
};

/*
  DESC        : Spend user points
  PARAMS      : -
  METHOD      : POST
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : User points
*/
exports.spendPoints = async (req, res) => {
  const userId = req._id;
  const { rewardId } = req.body;

  Points.findOne({ userId: userId })
    .then((points) => {
      if (!points) {
        return res.status(404).json({
          message: "User points not found!"
        });
      }

      Rewards.findById(rewardId)
        .then((reward) => {
          if (!reward) {
            return res.status(404).json({
              message: "Reward not found"
            });
          }

          if (points.points < reward.rewardPoint) {
            return res.status(400).json({
              message: "Insufficient points!"
            });
          }

          points.points -= reward.rewardPoint;
          points.save();

          res.status(200).json({
            message: "Success spend points",
            points: points.points
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Failed to fetch reward",
            err: err
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch user points",
        err: err
      });
    });
};
