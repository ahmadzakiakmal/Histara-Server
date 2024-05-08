const User = require("../models/userModels");

/*
DESC        : Register a new user
PARAMS      : email, username, name, phoneNumber, password, salt
METHOD      : POST
VISIBILITY  : Public
PRE-REQ     : create hashed password and generate salt using middlewares/register.js
*/
exports.registerUser = async (req, res) => {
  const { email, username, name, phoneNumber } = req.body;
  const password = req.password;
  const salt = req.salt;

  const newUser = new User({
    email,
    username,
    name,
    phoneNumber,
    password,
    salt
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json({
        message: "User registered successfully"
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to register user",
        error: err.errorResponse.errmsg
      });
    });
};
