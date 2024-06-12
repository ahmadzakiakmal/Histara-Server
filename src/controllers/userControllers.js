const User = require("../models/userModels");
const Points = require("../models/pointModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/*
  DESC        : Register a new user
  PARAMS      : email, name, phoneNumber, birthday, gender, work, password, salt
  METHOD      : POST
  VISIBILITY  : Public
  PRE-REQ     : create hashed password and generate salt using middlewares/register.js
  RESPONSE    : -
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
    .then((newUserData) => {
      const newPoints = new Points({
        userId: newUserData._id
      });

      newPoints
        .save()
        .then(() => {
          res.status(201).json({
            message: "User registered successfully"
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Failed to register user!",
            err: err
          });
        });
    })
    .catch((err) => {
      if (err.errorResponse && err.errorResponse.code === 11000) {
        return res.status(400).json({
          message: "Error! Email or phone number already exists!"
        });
      } else if (err.message && err._message == "User validation failed") {
        return res.status(409).json({
          message: "Error! Enum validation failed!"
        });
      } else {
        return res.status(500).json({
          message: "Failed to register user",
          err: err
        });
      }
    });
};

/*
  DESC        : Login user
  PARAMS      : email and password
  METHOD      : POST
  VISIBILITY  : Public
  PRE-REQ     : -
  RESPONSE    : JWT token
*/
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password + user.salt)
        .digest("hex");

      if (hashedPassword !== user.password) {
        return res.status(400).json({
          message: "Invalid credentials!"
        });
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        Points.findOne({ userId: user._id })
          .select("points -_id")
          .then((points) => {
            if (!points) {
              return res.status(404).json({
                message: "User points not found!"
              });
            }

            const userResponse = { ...user._doc };
            delete userResponse.password;
            delete userResponse.salt;
            delete userResponse._id;

            res.status(200).cookie("AuthToken", token).json({
              message: "Login successful",
              user: userResponse,
              points: points.points
            });
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Failed to fetch user points",
              err: err
            });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to login user",
        err: err
      });
    });
};

/*
  DESC        : Edit user details
  PARAMS      : email, name, phoneNumber, birthday, gender, work
  METHOD      : PUT
  VISIBILITY  : Private
  PRE-REQ     : ensureAuthenticated middleware
  RESPONSE    : -
*/
exports.editUser = (req, res) => {
  const updates = req.body;

  if (
    "password" in updates ||
    "salt" in updates ||
    "profilePicture" in updates
  ) {
    return res.status(400).json({
      message: "Field cannot be updated!"
    });
  }

  User.findOneAndUpdate({ _id: req._id }, updates, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User updated successfully"
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error
      });
    });
};
