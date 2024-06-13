const Transaction = require("../models/transactionModels");
const Tour = require("../models/tourModels");
const Points = require("../models/pointModel");
const { midtransCoreApi } = require("../config/midtrans");

/*
  DESC        : Get all transactions
  PARAMS      : -
  METHOD      : GET
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : -
*/
exports.getAllTransactions = async (req, res) => {
  Transaction.find({ userId: req._id })
    .select(
      "_id tourId grossAmount transactionTime transactionStatus isTransactionFinished"
    )
    .populate("tourId", "tourName tourAddress tourDuration tourStops tourPoints")
    .then((transactions) => {
      const formattedTransactions = transactions.map((transaction) => {
        const { tourId, ...rest } = transaction.toObject();
        return {
          ...rest,
          tourId: tourId._id,
          tourName: tourId.tourName,
          tourPoints: tourId.tourPoints,
          tourDuration: tourId.tourDuration,
          tourStops: tourId.tourStops,
          tourAddress: tourId.tourAddress
        };
      });

      res.status(200).json({
        message: "Success get all transactions",
        transactions: formattedTransactions
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch transactions",
        err: err
      });
    });
};

/*
  DESC        : Create transaction with empty payment
  PARAMS      : tourId
  METHOD      : POST
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : -
*/
exports.createTransaction = async (req, res) => {
  const { tourId } = req.body;

  Tour.findById(tourId).then((tour) => {
    if (!tour) {
      return res.status(404).json({
        message: "Tour not found"
      });
    }

    const newTransaction = new Transaction({
      userId: req._id,
      tourId: tourId,
      grossAmount: tour.tourPrice
    });

    newTransaction
      .save()
      .then((transaction) => {
        res.status(201).json({
          message: "Transaction created successfully",
          orderId: transaction._id
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

/*
  DESC        : Create payment for transaction
  PARAMS      : orderId
  METHOD      : POST
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : Payment details such as QRIS code
*/
exports.createPayment = async (req, res) => {
  const { orderId } = req.body;

  Transaction.findOne({ _id: orderId }).then((transaction) => {
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    if(transaction.transactionQr !== " ") {
      return res.status(202).json({
        message: "Payment already created",
        qrLink: transaction.transactionQr
      });
    }

    const parameter = {
      payment_type: "qris",
      transaction_details: {
        order_id: transaction._id,
        gross_amount: transaction.grossAmount
      }
    };

    midtransCoreApi
      .charge(parameter)
      .then((response) => {
        transaction.transactionTime = response.transaction_time;
        transaction.transactionStatus = response.transaction_status;
        transaction.transactionQr = response.actions[0].url;
        transaction.save().then(() => {
          return res.status(200).json({
            message: "Payment created successfully",
            response: response,
            qrLink: response.actions[0].url
          });
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Failed to create payment",
          err: err.message
        });
      });
  });
};

/*
  DESC        : Check payment status
  PARAMS      : orderId
  METHOD      : GET
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : Payment status
*/
exports.checkPayment = async (req, res) => {
  const { orderId } = req.query;

  Transaction.findOne({ _id: orderId }).then((transaction) => {
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    midtransCoreApi.transaction
      .status(orderId)
      .then((response) => {
        transaction.transactionStatus = response.transaction_status;
        transaction.transactionTime = response.settlement_time;
        transaction.save().then(() => {
          if (
            response.transaction_status === "settlement" ||
            response.transaction_status === "capture"
          ) {
            return res.status(200).json({
              message: "Payment success!",
              response: response
            });
          } else {
            return res.status(202).json({
              message: "Payment pending! Please complete payment!",
              response: response
            });
          }
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Failed to check payment",
          err: err.message
        });
      });
  });
};

/*
  DESC        : Finish transaction
  PARAMS      : orderId
  METHOD      : PUT
  VISIBILITY  : Private
  PRE-REQ     : -
  RESPONSE    : -
*/
exports.finishTransaction = async (req, res) => {
  const { orderId } = req.query;

  Transaction.findOne({ _id: orderId })
    .populate("tourId", "tourPoints")
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({
          message: "Transaction not found"
        });
      } else if (transaction.isTransactionFinished === true) {
        return res.status(406).json({
          message: "Transaction already finished"
        });
      }

      Points.findOne({ userId: req._id })
        .then((points) => {
          if (!points) {
            return res.status(404).json({
              message: "User points not found!"
            });
          }

          points.points += transaction.tourId.tourPoints;
          points
            .save()
            .then(() => {
              transaction.isTransactionFinished = true;
              transaction
                .save()
                .then(() => {
                  return res.status(200).json({
                    message: "Transaction finished successfully"
                  });
                })
                .catch((err) => {
                  return res.status(500).json({
                    message: "Failed to finish transaction",
                    err: err
                  });
                });
            })
            .catch((err) => {
              return res.status(500).json({
                message: "Failed to finish transaction",
                err: err
              });
            });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Failed to finish transaction",
            err: err
          });
        });
    });
};
