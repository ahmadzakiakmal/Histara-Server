const userRoutes = require("express").Router();

const { hashPassword } = require("../middlewares/userMiddlewares");

const { registerUser } = require("../controllers/userControllers");

userRoutes.post("/register", hashPassword, registerUser);

module.exports = userRoutes;