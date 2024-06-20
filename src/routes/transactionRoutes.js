const transactionRoutes = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/userMiddlewares");

const {
  getAllTransactions,
  createTransaction,
  createPayment,
  checkPayment,
  finishTransaction,
  cancelTransaction
} = require("../controllers/transactionControllers");

transactionRoutes.get("/all", ensureAuthenticated, getAllTransactions);
transactionRoutes.post("/create", ensureAuthenticated, createTransaction);
transactionRoutes.post("/create-payment", ensureAuthenticated, createPayment);
transactionRoutes.get("/check-payment", ensureAuthenticated, checkPayment);
transactionRoutes.put("/finish", ensureAuthenticated, finishTransaction);
transactionRoutes.put("/cancel", ensureAuthenticated, cancelTransaction);

module.exports = transactionRoutes;
