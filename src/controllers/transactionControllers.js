const Transaction = require("../models/transactionModels");
const Tour = require("../models/tourModels");

exports.createTransaction = async (req, res) => {
  const { tourId } = req.body;

  Tour.findById(tourId).then((tour) => {
    if (!tour) {
      return res.status(404).json({
        message: "Tour not found"
      });
    }

    const newTransaction = new Transaction({
      orderId: `ORDER-${Date.now()}`,
      userId: req._id,
      tourId: tourId,
      grossAmount: tour.tourPrice
    });

    newTransaction
      .save()
      .then(() => {
        res.status(201).json({
          message: "Transaction created successfully"
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Failed to create transaction",
          err: err
        });
      });
  });
};
