const Tour = require("../models/tourModels");

/*
  DESC        : Get all tours
  PARAMS      : -
  METHOD      : GET
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : All tours details
*/
exports.getAllTours = async (req, res) => {
  Tour.find()
    .then((tours) => {
      res.status(200).json({
        message: "Success get all tours",
        data: tours
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch tours",
        err: err
      });
    });
};
