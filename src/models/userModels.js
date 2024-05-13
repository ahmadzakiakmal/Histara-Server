const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  /* 
    https://stackoverflow.com/questions/6764821/what-is-the-best-way-to-store-dates-in-mongodb
    Using string because we dont need the time part of the date
    Format: DD-MM-YYYY
  */
  birthday: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["LAKI-LAKI", "PEREMPUAN"],
    required: true
  },
  work: {
    type: String,
    enum: ["MAHASISWA", "SMA", "SMP", "SD", "PENGAJAR", "WIRASWASTA", "KARYAWAN", "LAINNYA"],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
