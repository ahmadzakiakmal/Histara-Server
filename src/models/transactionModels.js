const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
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
  transactionTime: {
    type: Date,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  transactionStatus: {
    type: String,
    required: true
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
