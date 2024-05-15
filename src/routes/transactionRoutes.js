const transactionRoutes = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/userMiddlewares");

const {
  createTransaction,
  createPayment,
  checkPayment,
  finishTransaction
} = require("../controllers/transactionControllers");

transactionRoutes.post("/create", ensureAuthenticated, createTransaction);
transactionRoutes.post("/create-payment", ensureAuthenticated, createPayment);
transactionRoutes.get("/check-payment", ensureAuthenticated, checkPayment);
transactionRoutes.put("/finish", ensureAuthenticated, finishTransaction);

module.exports = transactionRoutes;
