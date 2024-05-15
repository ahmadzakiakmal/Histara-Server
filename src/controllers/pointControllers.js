const Points = require("../models/pointModel");

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
