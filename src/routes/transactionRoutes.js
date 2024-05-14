const transactionRoutes = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/userMiddlewares");

const { createTransaction } = require("../controllers/transactionControllers");

transactionRoutes.post("/create", ensureAuthenticated, createTransaction);

module.exports = transactionRoutes;
