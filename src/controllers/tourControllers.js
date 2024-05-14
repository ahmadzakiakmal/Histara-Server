const Tour = require("../models/tourModels");

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
