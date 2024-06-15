const pointRoutes = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/userMiddlewares");

const { checkPoints, spendPoints } = require("../controllers/pointControllers");

pointRoutes.get("/check", ensureAuthenticated, checkPoints);
pointRoutes.post("/spend", ensureAuthenticated, spendPoints);

module.exports = pointRoutes;
