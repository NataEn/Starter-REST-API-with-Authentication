const mongoose = require("mongoose");

const model = mongoose.Schema({
  email: {
    type: String,
    required: [true, "email field is required!"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password field is required!"],
    trim: true,
    minlength: [5, "longer password is required!"],
  },
});

module.exports = new mongoose.model("User", model);
