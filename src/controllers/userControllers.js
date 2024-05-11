const User = require("../models/userModels");

/*
DESC        : Register a new user
PARAMS      : email, name, phoneNumber, birthday, gender, work, password, salt
METHOD      : POST
VISIBILITY  : Public
PRE-REQ     : create hashed password and generate salt using middlewares/register.js
*/
exports.registerUser = async (req, res) => {
  const { email, name, phoneNumber, birthday, gender, work } = req.body;
  const password = req.password;
  const salt = req.salt;

  const newUser = new User({
    email,
    name,
    phoneNumber,
    birthday,
    gender,
    work,
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
      if (err.errorResponse && err.errorResponse.code === 11000) {
        return res.status(400).json({
          message: "Error! Email or phone number already exists!",
        });
      } else if (err.message && err._message == "User validation failed") {
        return res.status(409).json({
          message: "Error! Enum validation failed!",
        });
      } else {
        return res.status(500).json({
          message: "Failed to register user",
          err: err 
        });
      }
    });
};
