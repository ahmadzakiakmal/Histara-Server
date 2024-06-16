const userRoutes = require("express").Router();

const {
  hashPassword,
  ensureAuthenticated
} = require("../middlewares/userMiddlewares");

const {
  registerUser,
  loginUser,
  editUser,
  getUserDetails
} = require("../controllers/userControllers");

userRoutes.post("/register", hashPassword, registerUser);
userRoutes.post("/login", loginUser);
userRoutes.put("/edit", ensureAuthenticated, editUser);
userRoutes.get("/details", ensureAuthenticated, getUserDetails);

module.exports = userRoutes;
