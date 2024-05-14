const tourRoutes = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/userMiddlewares");

const { getAllTours } = require("../controllers/tourControllers");

tourRoutes.get("/all-tours", ensureAuthenticated, getAllTours);

module.exports = tourRoutes;
