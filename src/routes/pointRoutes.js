const pointRoutes = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/userMiddlewares");

const { checkPoints } = require("../controllers/pointControllers");

pointRoutes.get("/check", ensureAuthenticated, checkPoints);

module.exports = pointRoutes;
