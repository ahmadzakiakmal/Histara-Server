const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true
  },
  grossAmount: {
    type: Number,
    required: true
  },
  /*
    Match with response from Midtrans API
  */
  transactionTime: {
    type: String,
    default: "0000-00-00 00:00:00",
    required: true
  },
  paymentType: {
    type: String,
    default: "qris",
    required: true
  },
  transactionStatus: {
    type: String,
    default: "pending",
    required: true
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
