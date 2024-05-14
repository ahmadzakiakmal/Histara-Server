const userRoutes = require("express").Router();

const {
  hashPassword,
  ensureAuthenticated
} = require("../middlewares/userMiddlewares");

const {
  registerUser,
  loginUser,
  editUser
} = require("../controllers/userControllers");

userRoutes.post("/register", hashPassword, registerUser);
userRoutes.post("/login", loginUser);
userRoutes.put("/edit", ensureAuthenticated, editUser);

module.exports = userRoutes;
